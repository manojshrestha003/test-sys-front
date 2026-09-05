import { useState } from "react";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Button } from "@/common/components/ui/Button";
import { Card } from "@/common/components/ui/Card";
import { useRegisterMutation } from "@/modules/auth/api/authApi";
import {  useNavigate } from "react-router-dom";
import { routes } from "@/app/routes/routes";
import { registerSchema } from "../validation";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate =   useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setError(null);
    try {
      await register({
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
      }).unwrap();
      navigate(routes.VERIFY_OTP, { state: { email: formData.email } })
    } catch {
      // The global RTK Query base query displays the API error toast.
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-4xl grid md:grid-cols-2 overflow-hidden border-slate-200 bg-white shadow-xl p-0">
        
        {/* Left Side: Branding Banner */}
        <div className="relative hidden md:flex flex-col justify-between p-8 bg-slate-900 text-white dark:border-r dark:border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 opacity-90" />
          
          <div className="relative z-10 flex items-center gap-2 font-semibold text-lg">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span>Test System</span>
          </div>

          <div className="relative z-10 space-y-2">
            <blockquote className="text-lg font-medium leading-relaxed">
              &ldquo;This platform completely transformed how our team manages React UI workflows. Highly recommended.&rdquo;
            </blockquote>
            <p className="text-xs text-slate-300">— Alex Rivera, Senior Frontend Developer</p>
          </div>

          <div className="relative z-10 text-xs text-slate-400">
            © {new Date().getFullYear()} Acme Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-6 text-slate-900 sm:p-8 flex flex-col justify-center">
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Create an account</h2>
            <p className="text-sm text-slate-500">
              Enter your credentials to get started today.
            </p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
           
          </div>

          {/* Validation Error Display */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/15 text-destructive text-sm font-medium border border-destructive/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <a onClick={() => navigate(routes.LOGIN)} href="#login" className="font-medium text-indigo-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}