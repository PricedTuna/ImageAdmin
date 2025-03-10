import React from 'react'

interface ButtonProps {
  variant?: "primary" | "secondary" | "dark" | "light" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  width?: "full" | "auto" | number;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white",
  secondary: "bg-gray-500 hover:bg-gray-700 text-white",
  dark: "bg-black hover:bg-gray-800 text-white",
  light: "bg-white hover:bg-gray-200 text-black border",
  success: "bg-green-500 hover:bg-green-700 text-white",
  danger: "bg-red-500 hover:bg-red-700 text-white",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  width = "auto",
  onClick,
  disabled = false,
  children,
  className,
}) => {
  const widthClass =
    width === "full" ? "w-full" : width === "auto" ? "w-auto" : `w-[${width}px]`;

  return (
    <button
      className={`rounded transition duration-200 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button
