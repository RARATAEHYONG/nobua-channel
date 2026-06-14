type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const SIZE_MAP: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-10 w-14",
  md: "h-16 w-24",
  lg: "h-24 w-36",
};

export default function Logo({ className = "", size = "sm" }: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-background ${SIZE_MAP[size]} ${className}`}
    >
      <img
        src="/images/nobua-logo-banner.png"
        alt="のぶあ"
        width={144}
        height={96}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
