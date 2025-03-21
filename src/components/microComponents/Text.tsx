import React from "react";

interface TextProps {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "label";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const Text = ({
  as: Component = "p",
  size = "md",
  children,
  className = "",
  onClick = () => {}
}: TextProps) => {
  return <Component onClick={onClick} className={`${sizeClasses[size]} ${className}`}>{children}</Component>;
};

export default Text;
