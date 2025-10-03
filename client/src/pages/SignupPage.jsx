import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import signupIllustration from "../assets/signup.illustration.png";
import { useAuthStore } from "../store/useAuthStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await signup(data.fullName, data.email, data.password);
      if (result.success) {
        reset();
        navigate("/otp-verification", { state: { email: data.email } });
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="relative w-full max-w-5xl rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-2xl">
        <div className="flex flex-col md:flex-row rounded-2xl bg-[#1a2637] overflow-hidden">
          {/* Left: Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400 mb-8">Sign up for a new account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
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
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
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
                disabled={isSigningUp}
                className={`w-full rounded-lg py-2 text-white font-semibold transition ${
                  isSigningUp
                    ? "bg-cyan-400 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600"
                }`}
              >
                {isSigningUp ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-5 text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-700" />

          {/* Right: Illustration */}
          <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-8 text-center">
            <img
              src={signupIllustration}
              alt="Illustration"
              className="w-64 mb-6"
            />
            <h3 className="text-white text-xl font-semibold mb-3">
              Start Your Journey Today
            </h3>
            <div className="flex gap-3">
              <span className="px-3 py-1 text-sm bg-gray-700 text-cyan-400 rounded-full">
                Free
              </span>
              <span className="px-3 py-1 text-sm bg-gray-700 text-cyan-400 rounded-full">
                Easy Setup
              </span>
              <span className="px-3 py-1 text-sm bg-gray-700 text-cyan-400 rounded-full">
                Private
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
