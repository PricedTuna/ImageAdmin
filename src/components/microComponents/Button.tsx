import React, { JSX } from 'react';

interface ButtonProps {
  variant?: "primary" | "secondary" | "dark" | "light" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  width?: "full" | "auto" | number;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  truncate?: boolean;
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

const Button = ({
  variant = "primary",
  size = "md",
  width = "auto",
  onClick,
  disabled = false,
  children,
  className,
  icon,
  iconPosition = "left",
  truncate = false
}: ButtonProps) => {
  const widthClass =
    width === "full" ? "w-full" : width === "auto" ? "w-auto" : `w-[${width}px]`;

  return (
    <button
      className={`rounded transition duration-200 cursor-pointer flex items-center gap-2 ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div>{icon && iconPosition === "left" && icon}</div> <span className={truncate ? "truncate" : ""}>{children}</span> <div>{icon && iconPosition === "right" && icon}</div>
    </button>
  );
};

export default Button
