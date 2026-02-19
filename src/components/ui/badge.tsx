interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({
  children,
  color,
  variant = "default",
  className = "",
}: BadgeProps) {
  if (variant === "outline") {
    return (
      <span
        className={[
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
          className,
        ].join(" ")}
        style={color ? { borderColor: color, color } : undefined}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className,
      ].join(" ")}
      style={
        color
          ? { backgroundColor: `${color}20`, color }
          : { backgroundColor: "#f3f4f6", color: "#374151" }
      }
    >
      {children}
    </span>
  );
}
