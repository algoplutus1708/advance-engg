interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-headline text-balance">{title}</h2>
      {description && (
        <p className="mt-6 text-body-large text-balance">{description}</p>
      )}
    </div>
  );
}
