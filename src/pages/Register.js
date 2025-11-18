import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import api from "../services/api";
import gsap from "gsap";
import PasswordStrength, {
  validatePasswordStrength,
} from "../components/common/PasswordStrength";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "student",
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const cardRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    fetchBranches();

    // GSAP animations - Rotate and swing entrance
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: 0.5,
        rotation: 10,
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
        rotation: 20,
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
      rotation: -5,
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

  const fetchBranches = async () => {
    try {
      // Try to fetch branches - if none exist, we'll handle it gracefully
      const response = await api.get("/branches");
      if (response.data.success && response.data.data) {
        setBranches(response.data.data.branches || []);
      }
    } catch (error) {
      console.log("No branches available yet - will create default");
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate password strength
    if (!validatePasswordStrength(formData.password)) {
      toast.error("Password does not meet requirements");
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData);

      if (result.success) {
        toast.success("Registration successful! Redirecting to login...");

        // Success animation - rotate and zoom out
        gsap.to(cardRef.current, {
          rotation: -360,
          scale: 0,
          duration: 0.8,
          ease: "back.in(1.7)",
          onComplete: () => {
            // Redirect to login page after successful registration
            navigate("/login", { state: { email: formData.email, password: formData.password } });
          },
        });
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div
        ref={cardRef}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-2xl shadow-2xl border-t-4 border-blue-500"
      >
        <div>
          <div
            ref={logoRef}
            className="mx-auto h-24 w-24 flex items-center justify-center"
          >
            <img
              src="/gTlogo.jpeg"
              alt="School Logo"
              className="h-24 w-24 rounded-full shadow-lg border-4 border-blue-500"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Create your account
          </h2>
          <p className="mt-2 text-center text-base font-medium text-black dark:text-white">
            Join our School Learning Management System
          </p>
        </div>

        <form ref={formRef} className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-field">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-black dark:text-white"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-600 dark:placeholder-gray-300 text-black dark:text-white bg-white dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="First name"
                value={formData.firstName}
                onChange={onChange}
              />
            </div>
            <div className="form-field">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-black dark:text-white mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-600 dark:placeholder-gray-300 text-black dark:text-white bg-white dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Last name"
                value={formData.lastName}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-black dark:text-white mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-600 dark:placeholder-gray-300 text-black dark:text-white bg-white dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={onChange}
            />
          </div>

          <div className="form-field">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-black dark:text-white mb-1"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-600 dark:placeholder-gray-300 text-black dark:text-white bg-white dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all sm:text-sm"
              placeholder="Phone number"
              value={formData.phone}
              onChange={onChange}
            />
          </div>

          <div className="form-field">
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-black dark:text-white mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all sm:text-sm rounded-lg"
              value={formData.role}
              onChange={onChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
              <option value="accountant">Accountant</option>
            </select>
          </div>

          {branches.length > 0 && (
            <div className="form-field">
              <label
                htmlFor="branchId"
                className="block text-sm font-semibold text-black dark:text-white mb-1"
              >
                Branch (Optional)
              </label>
              <select
                id="branchId"
                name="branchId"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all sm:text-sm rounded-lg"
                value={formData.branchId || ""}
                onChange={onChange}
              >
                <option value="">Select a branch (optional)</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-field">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-black dark:text-white mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-600 dark:placeholder-gray-300 text-black dark:text-white bg-white dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={onChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black dark:text-white"
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
            <PasswordStrength password={formData.password} />
          </div>

          <div className="form-field">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transform transition-all hover:scale-105 shadow-lg"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm font-medium text-black dark:text-white mt-4">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-green-600 transition-colors underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
