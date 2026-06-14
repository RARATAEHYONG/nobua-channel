type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Eyebrow label with a short red rule, followed by a large display title.
 * Used to introduce "OFFICIAL WEBSITE", "最新動画", "グッズ", etc.
 */
export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "items-center text-center" : "items-start text-left"} flex flex-col ${className}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        <span className="font-sans text-xs font-bold tracking-[0.25em] text-accent">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-jp text-4xl font-black leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
