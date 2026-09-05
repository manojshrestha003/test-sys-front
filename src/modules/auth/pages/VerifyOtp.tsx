import * as React from "react";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck, RefreshCw } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/common/components/ui/Button";
import { Card } from "@/common/components/ui/Card";
import { useVerifyEmailMutation } from "@/modules/auth/api/authApi";

interface VerifyOTPProps {
  email?: string;
  length?: number;
  onSuccess?: () => void;
  onBack?: () => void;
}

export function VerifyOTP({
  email = "user@example.com",
  length = 6,
  onSuccess,
  onBack,
}: VerifyOTPProps) {
  const location = useLocation();
  const locationEmail = (location.state as { email?: string } | null)?.email;
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));
  const [timer, setTimer] = React.useState(30);
  const [verifyEmail, { isLoading: isSubmitting }] = useVerifyEmailMutation();
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const verificationEmail = locationEmail ?? email;

  // Countdown timer for code resend
  React.useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle single character typing
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow numbers only

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance to next input field
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle full OTP paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return; // Must be digits only

    const digits = pastedData.slice(0, length).split("");
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    // Focus last filled field or next empty field
    const focusIndex = Math.min(digits.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  // Form submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < length) {
      toast.error(`Please enter the full ${length}-digit verification code.`);
      return;
    }

    try {
      await verifyEmail({ email: verificationEmail, otp: code }).unwrap();
      onSuccess?.();
    } catch {
      // The global RTK Query base query displays the API error toast.
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    setOtp(new Array(length).fill(""));
    inputRefs.current[0]?.focus();

    toast.info("A new verification code has been sent to your email.");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 border-slate-200 shadow-xl bg-white text-slate-900">
        
        {/* Navigation Back */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to registration
        </button>

        {/* Header Icon & Text */}
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Two-Step Verification</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We sent a {length}-digit code to{" "}
            <span className="font-semibold text-slate-900">{email}</span>.
            Enter the code below to complete registration.
          </p>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none disabled:opacity-50 transition-all shadow-sm"
                disabled={isSubmitting}
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || otp.join("").length < length}
            className="w-full h-11 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        {/* Resend Section */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Didn't receive the email?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0}
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline disabled:text-slate-400 disabled:no-underline inline-flex items-center gap-1 transition-colors"
          >
            {timer > 0 ? (
              <span>Resend in {timer}s</span>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                Resend code
              </>
            )}
          </button>
        </div>
      </Card>
    </div>
  );
}