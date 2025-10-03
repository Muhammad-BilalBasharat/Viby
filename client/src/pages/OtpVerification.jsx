import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function OTPVerification() {
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ safely read store
  const storeState = useAuthStore.getState();
  const storeUser = storeState?.authUser;
  const email = location.state?.email || storeUser?.email || "";

  const { otpverification } = useAuthStore();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
    },
  });

  const watchedValues = watch();
  const otpValues = [
    watchedValues.otp0,
    watchedValues.otp1,
    watchedValues.otp2,
    watchedValues.otp3,
    watchedValues.otp4,
    watchedValues.otp5,
  ];
  const otpCode = otpValues.join("");

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value, onChange) => {
    if (value.length > 1) return;
    onChange(value);
    clearErrors();
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6 && /^\d$/.test(pastedData[i])) {
        setValue(`otp${i}`, pastedData[i]);
      }
    }
    clearErrors();
    const lastFilledIndex = pastedData.length - 1;
    if (lastFilledIndex < 5) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    }
  };

  const onSubmit = async (data) => {
    const otpCode = Object.values(data).join("");

    if (otpCode.length !== 6) {
      setError("otp", {
        type: "manual",
        message: "Please enter the complete 6-digit code",
      });
      return;
    }

    if (!email) {
      setError("otp", {
        type: "manual",
        message: "Email not found. Please signup again.",
      });
      return;
    }

    try {
      const result = await otpverification(email, otpCode);
      if (result.success) {
        await delay(1000);
        navigate("/login");
      } else {
        setError("otp", {
          type: "manual",
          message: result.message || "Invalid verification code",
        });
      }
    } catch (error) {
      setError("otp", {
        type: "manual",
        message: "Verification failed. Try again.",
      });
    }
  };

  return (
    <div className="absolute w-full px-4 flex justify-center items-center">
      {/* Gradient Border Wrapper */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-2xl w-full max-w-sm">
        <div className="rounded-2xl bg-[#0f1c2e] w-full p-6 sm:p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            Verify Your Account
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Enter the 6-digit code sent to
            <span className="block text-cyan-400 font-medium mt-1">
              {email || "your email"}
            </span>
          </p>

          {/* OTP Inputs */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Controller
                  key={index}
                  name={`otp${index}`}
                  control={control}
                  rules={{
                    required: "Required",
                    pattern: {
                      value: /^\d$/,
                      message: "Must be a digit",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={value}
                      onChange={(e) =>
                        handleOtpChange(
                          index,
                          e.target.value.replace(/\D/g, ""),
                          onChange
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`w-full h-12 text-center text-lg font-semibold rounded-md border bg-gray-800 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none ${
                        errors[`otp${index}`]
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-600"
                      }`}
                    />
                  )}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm text-center">
                {errors.otp.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || otpCode.length !== 6}
              className={`w-full rounded-md py-2 text-white font-semibold transition-all ${
                isSubmitting || otpCode.length !== 6
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600"
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify Account"}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-400">
              Didn’t receive code?{" "}
              <button
                type="button"
                disabled={timer > 0}
                onClick={() => setTimer(60)}
                className={`font-medium ${
                  timer > 0
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-cyan-400 hover:underline"
                }`}
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </button>
            </p>
            <Link
              to="/login"
              className="text-cyan-400 hover:underline text-sm font-medium block"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
