import React from "react";

const PasswordStrength = ({ password }) => {
  const calculateStrength = (pwd) => {
    let strength = 0;

    if (!pwd) return { strength: 0, label: "", color: "" };

    // Length check
    if (pwd.length >= 8) strength += 20;
    if (pwd.length >= 12) strength += 10;

    // Uppercase check
    if (/[A-Z]/.test(pwd)) strength += 20;

    // Lowercase check
    if (/[a-z]/.test(pwd)) strength += 20;

    // Number check
    if (/\d/.test(pwd)) strength += 15;

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength += 15;

    let label = "";
    let color = "";

    if (strength < 40) {
      label = "Weak";
      color = "bg-red-500";
    } else if (strength < 70) {
      label = "Medium";
      color = "bg-yellow-500";
    } else {
      label = "Strong";
      color = "bg-green-500";
    }

    return { strength, label, color };
  };

  const validatePassword = (pwd) => {
    return {
      minLength: pwd.length >= 8,
      hasUpperCase: /[A-Z]/.test(pwd),
      hasLowerCase: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
  };

  const { strength, label, color } = calculateStrength(password);
  const validations = validatePassword(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600">Password Strength</span>
          <span
            className={`font-semibold ${
              label === "Weak"
                ? "text-red-500"
                : label === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {label}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-1 text-xs">
        <div
          className={`flex items-center gap-2 ${
            validations.minLength ? "text-green-600" : "text-gray-500"
          }`}
        >
          <span>{validations.minLength ? "✓" : "○"}</span>
          <span>At least 8 characters</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            validations.hasUpperCase ? "text-green-600" : "text-gray-500"
          }`}
        >
          <span>{validations.hasUpperCase ? "✓" : "○"}</span>
          <span>One uppercase letter</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            validations.hasLowerCase ? "text-green-600" : "text-gray-500"
          }`}
        >
          <span>{validations.hasLowerCase ? "✓" : "○"}</span>
          <span>One lowercase letter</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            validations.hasNumber ? "text-green-600" : "text-gray-500"
          }`}
        >
          <span>{validations.hasNumber ? "✓" : "○"}</span>
          <span>One number</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            validations.hasSpecialChar ? "text-green-600" : "text-gray-500"
          }`}
        >
          <span>{validations.hasSpecialChar ? "✓" : "○"}</span>
          <span>One special character (!@#$%^&*...)</span>
        </div>
      </div>
    </div>
  );
};

export const validatePasswordStrength = (password) => {
  if (!password || password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
};

export default PasswordStrength;
