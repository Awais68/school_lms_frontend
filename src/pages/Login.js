import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import gsap from "gsap";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const formRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // GSAP animations - Rotate and swing entrance
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // Logo swing animation
    gsap.fromTo(
      logoRef.current,
      {
        rotation: -20,
        y: -50,
        opacity: 0,
      },
      {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        delay: 0.2,
      }
    );

    // Continuous subtle swing for logo
    gsap.to(logoRef.current, {
      rotation: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const formElements = formRef.current?.querySelectorAll(".form-field");
    gsap.from(formElements, {
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Success animation - rotate and zoom out
        gsap.to(cardRef.current, {
          rotation: 360,
          scale: 0,
          duration: 0.8,
          ease: "back.in(1.7)",
          onComplete: () => {
            // Redirect based on user role
            switch (result.data.user.role) {
              case "admin":
                navigate("/admin");
                break;
              case "teacher":
                navigate("/teacher");
                break;
              case "student":
                navigate("/student");
                break;
              case "parent":
                navigate("/parent");
                break;
              case "accountant":
                navigate("/accountant");
                break;
              default:
                navigate("/");
            }
          },
        });
        toast.success("Login successful!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-sky-700 to-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%)]" />
      <div className="absolute -top-1/3 -right-1/4 w-1/2 min-w-[18rem] aspect-square bg-white/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-1/3 -left-1/4 w-1/2 min-w-[18rem] aspect-square bg-emerald-400/30 blur-3xl rounded-full" />

      <div className="relative z-10 w-full flex justify-center">
        <div
          ref={cardRef}
          className="max-w-md w-full space-y-8 rounded-3xl bg-white/10 dark:bg-slate-900/70 backdrop-blur-2xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/20 text-white"
        >
          <div>
            <div
              ref={logoRef}
              className="mx-auto h-24 w-24 flex items-center justify-center"
            >
              <img
                src="/gTlogo.jpeg"
                alt="School Logo"
                className="h-24 w-24 rounded-full shadow-lg border-4 border-emerald-300"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base font-medium text-white/80">
              School Learning Management System
            </p>
          </div>

          <form ref={formRef} className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="form-field">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white/90 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-white/30 placeholder-white/60 text-white bg-white/10 dark:bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white/90 mb-1"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-white/30 placeholder-white/60 text-white bg-white/10 dark:bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={onChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-field flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-400 focus:ring-emerald-300 border-white/40 bg-transparent rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-white/80"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-emerald-200 hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="form-field">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 hover:from-emerald-300 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent disabled:opacity-50 transform transition-all hover:scale-105 shadow-lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="text-center text-sm font-medium text-white/80">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-200 hover:text-white transition-colors underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Login;
