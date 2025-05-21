// components/UserRegistrationForm.tsx

import React, { useState } from "react";

interface RegistrationFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormState: RegistrationFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const UserRegistrationForm: React.FC = () => {
  const [form, setForm] = useState<RegistrationFormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = (): string | null => {
    if (!form.username || form.username.length < 3 || form.username.length > 20)
      return "Username must be between 3 and 20 characters.";
    if (!form.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      return "Please enter a valid email address.";
    if (!form.password || form.password.length < 6 || form.password.length > 40)
      return "Password must be between 6 and 40 characters.";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess("Registration successful! You can now log in.");
        setForm(initialFormState);
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
      <div className="mb-3">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          maxLength={40}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
          maxLength={40}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default UserRegistrationForm;
