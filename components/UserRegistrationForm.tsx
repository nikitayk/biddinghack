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

interface UserRegistrationFormProps {
  onSuccess?: () => void;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({ onSuccess }) => {
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
        if (onSuccess) onSuccess();
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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-[#181830] border-2 border-[#00fff7] rounded-xl shadow-lg font-mono cyberpunk-panel"
    >
      <h2 className="text-2xl font-bold mb-6 text-[#ff00ff] text-center tracking-widest cyberpunk-glow">
        REGISTER
      </h2>
      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 font-semibold text-[#00fff7]">
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
          className="w-full px-4 py-2 bg-[#0a0a23] border-2 border-[#00fff7] rounded-lg text-[#fff] focus:outline-none focus:border-[#ff00ff] cyberpunk-input"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-semibold text-[#00fff7]">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-[#0a0a23] border-2 border-[#00fff7] rounded-lg text-[#fff] focus:outline-none focus:border-[#ff00ff] cyberpunk-input"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 font-semibold text-[#00fff7]">
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
          className="w-full px-4 py-2 bg-[#0a0a23] border-2 border-[#00fff7] rounded-lg text-[#fff] focus:outline-none focus:border-[#ff00ff] cyberpunk-input"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-[#00fff7]">
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
          className="w-full px-4 py-2 bg-[#0a0a23] border-2 border-[#00fff7] rounded-lg text-[#fff] focus:outline-none focus:border-[#ff00ff] cyberpunk-input"
        />
      </div>
      {error && (
        <div className="mb-4 text-[#fffb00] text-center cyberpunk-glow">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-[#00ff99] text-center cyberpunk-glow">
          {success}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 mt-2 bg-[#ff00ff] text-[#0a0a23] font-bold rounded-lg shadow-md hover:bg-[#00fff7] hover:text-[#181830] transition-all cyberpunk-btn"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <style jsx global>{`
        .cyberpunk-glow {
          text-shadow:
            0 0 8px #ff00ff,
            0 0 16px #00fff7,
            0 0 32px #ff00ff;
        }
        .cyberpunk-panel {
          box-shadow:
            0 0 20px #00fff7,
            0 0 40px #ff00ff inset;
        }
        .cyberpunk-btn {
          box-shadow:
            0 0 10px #ff00ff,
            0 0 20px #00fff7;
        }
        .cyberpunk-input {
          box-shadow: 0 0 6px #00fff7;
        }
        body {
          font-family: 'Roboto Mono', 'VT323', monospace;
        }
      `}</style>
    </form>
  );
};

export default UserRegistrationForm;
