// "use client"; 

// import { useState } from "react";

// export default function Login() {
// const [showPassword, setShowPassword] = useState(false);

// return (
// <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-950">
// <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 mx-4 border border-gray-700 transition transform hover:scale-[1.02] hover:shadow-red-700/40">

// <div className="text-center mb-8">
// <h2 className="text-3xl font-bold text-red-500">MovieHub 🎬</h2>
// <p className="text-gray-400 mt-2">Login to explore movies & shows</p>
// </div>

// <form className="space-y-5">

// <div>
// <label className="block text-sm text-gray-400 mb-1">Email</label>
// <input
// type="email"
// required
// placeholder="Enter your email"
// className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500
// focus:ring-2 focus:ring-red-600 focus:outline-none transition"
// />
// </div>

// <div>
// <label className="block text-sm text-gray-400 mb-1">Password</label>
// <div className="relative">
// <input
// type={showPassword ? "text" : "password"}
// required
// placeholder="••••••••"
// className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500
// focus:ring-2 focus:ring-red-600 focus:outline-none transition pr-10"
// />
// <button
// type="button"
// onClick={() => setShowPassword(!showPassword)}
// className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-400"
// >
// {showPassword ? "🙈" : "👁️"}
// </button>
// </div>
// </div>


// <button
// type="submit"
// className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-700
// hover:from-red-700 hover:to-pink-800 text-white font-semibold shadow-lg
// transform hover:scale-[1.02] transition duration-300"
// >
// Login
// </button>
// </form>


// <p className="text-gray-400 text-sm text-center mt-6">
// Don’t have an account?{" "}
// <a href="/signup" className="text-red-400 hover:underline">
// Sign up
// </a>
// </p>
// </div>
// </div>
// );
// }


"use client";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = () => {
    validate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Submit login here
      console.log("Logging in with", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-950">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 mx-4 border border-gray-700 transition transform hover:scale-[1.02] hover:shadow-red-700/40">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-500">MovieHub 🎬</h2>
          <p className="text-gray-400 mt-2">Login to explore movies & shows</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none transition ${
                errors.email ? "border border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none transition pr-10 ${
                  errors.password ? "border border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white font-semibold shadow-lg transform hover:scale-[1.02] transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}


