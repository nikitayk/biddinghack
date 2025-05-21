import React, { useState } from "react";

interface LoginFormProps {
  onLoginSuccess?: (token: string, user: { id: string; username: string; email: string }) => void;
}

interface LoginFormState {
  email: string;
  password: string;
}

const initialState: LoginFormState = {
  email: "",
  password: "",
};

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [form, setForm] = useState<LoginFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success && data.token && data.user) {
        if (onLoginSuccess) onLoginSuccess(data.token, data.user);
      } else {
        setError(data.error || "Login failed. Please try again.");
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
        LOGIN
      </h2>
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
          className="w-full px-4 py-2 bg-[#0a0a23] border-2 border-[#00fff7] rounded-lg text-[#fff] focus:outline-none focus:border-[#ff00ff] cyberpunk-input"
        />
      </div>
      {error && (
        <div className="mb-4 text-[#fffb00] text-center cyberpunk-glow">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 mt-2 bg-[#ff00ff] text-[#0a0a23] font-bold rounded-lg shadow-md hover:bg-[#00fff7] hover:text-[#181830] transition-all cyberpunk-btn"
      >
        {loading ? "Logging in..." : "Login"}
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

export default LoginForm;

