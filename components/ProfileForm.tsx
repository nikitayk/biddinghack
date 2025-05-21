// components/ProfileForm.tsx

import React, { useEffect, useState } from "react";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
}

interface ProfileFormProps {
  jwtToken?: string; // Optionally pass JWT as a prop, or fetch from localStorage/context
}

const ProfileForm: React.FC<ProfileFormProps> = ({ jwtToken }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [form, setForm] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Get token from props or localStorage
  const token =
    jwtToken ||
    (typeof window !== "undefined"
      ? localStorage.getItem("jwt_token") || ""
      : "");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ""}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok && data.success && data.user) {
          setProfile(data.user);
          setForm({ username: data.user.username, email: data.user.email });
        } else {
          setError(data.error || "Failed to fetch profile.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
    else setError("You must be logged in to view your profile.");
    // eslint-disable-next-line
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.username || !form.email) {
      setError("Username and email are required.");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
          }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success && data.user) {
        setProfile(data.user);
        setSuccess("Profile updated successfully!");
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <div className="mb-3">
        <label htmlFor="username" className="block mb-1 font-medium">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={form.username}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={20}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      {profile?.createdAt && (
        <div className="mb-3 text-gray-500 text-sm">
          Joined: {new Date(profile.createdAt).toLocaleDateString()}
        </div>
      )}
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}
      <button
        type="submit"
        disabled={updating}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
