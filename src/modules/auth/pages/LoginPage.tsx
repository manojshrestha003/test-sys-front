import * as React from "react";
import { useCookies } from "react-cookie";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Button } from "@/common/components/ui/Button";
import { Card } from "@/common/components/ui/Card";
import { useLoginMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { routes } from "@/app/routes/routes";
import { loginSchema } from "../validation";


interface LoginPageProps {
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
  onSuccess?: () => void;
}

const LoginPage = ({
  onForgotPasswordClick,
  onSuccess,
}: LoginPageProps) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [, setCookie] = useCookies([
    "auth_token",
    "login_date",
    "user_name",
    "user_email",
    "user_status",
    "user_role",
  ]);

  const navigate =  useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setError(null);
    try {
      const response = await login({
        email: validation.data.email,
        password: validation.data.password,
      }).unwrap();


      const cookieOptions = {
        path: "/",
        ...(formData.rememberMe ? { maxAge: 60 * 60 * 24 * 30 } : {}),
      };

      setCookie("auth_token", response.data.token, cookieOptions);
      setCookie("login_date", new Date().toISOString(), cookieOptions);
      setCookie("user_name", response.data.user.name, cookieOptions);
      setCookie("user_email", response.data.user.email, cookieOptions);
      setCookie("user_status", response.data.user.status, cookieOptions);
      setCookie("user_role", response.data.user.role, cookieOptions);
      onSuccess?.();
      navigate(routes.DASHBOARD)
    } catch {
      // The global RTK Query base query displays the API error toast.
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 border-slate-200 shadow-xl bg-white text-slate-900">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="text-sm text-slate-600">
            Please enter your details to sign in
          </p>
        </div>
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/15 p-3 text-sm font-medium text-destructive">
              {error}
            </div>
          )}
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-700 font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-9 border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-9 pr-9 border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600/20"
            />
            <label
              htmlFor="rememberMe"
              className="text-xs text-slate-600 select-none cursor-pointer"
            >
              Remember me on this device
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors gap-2 mt-2"
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={()=> navigate(routes.REGISTER)}
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Create an account
          </button>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;