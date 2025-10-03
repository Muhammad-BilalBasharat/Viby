import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import loginIllustration from "../assets/login.illustration.png";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        navigate("/");
      }
    } catch (error) {
      error;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="relative w-full max-w-5xl rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-2xl">
        <div className="flex flex-col md:flex-row rounded-2xl bg-[#1a2637] overflow-hidden">
          {/* Left: Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 mb-8">Login to your account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 pl-10 pr-12 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full rounded-lg py-2 text-white font-semibold transition ${
                  isLoggingIn
                    ? "bg-cyan-400 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600"
                }`}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-5 text-center text-gray-400">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-cyan-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-700" />

          {/* Right: Illustration */}
          <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-8 text-center">
            <img
              src={loginIllustration}
              alt="Illustration"
              className="w-64 mb-6"
            />
            <h3 className="text-white text-xl font-semibold mb-3">
              Welcome Back to Chat
            </h3>
            <div className="flex gap-3">
              <span className="px-3 py-1 text-sm bg-gray-700 text-cyan-400 rounded-full">
                Secure
              </span>
              <span className="px-3 py-1 text-sm bg-gray-700 text-cyan-400 rounded-full">
                Fast
              </span>
              <span className="px-3 py-1 text-sm bg-gray-700 text-cyan-400 rounded-full">
                Reliable
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
