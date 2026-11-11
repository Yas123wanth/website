export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:px-6 prose prose-gray">
      <h1 className="font-serif text-4xl text-charcoal not-prose">{title}</h1>
      <div className="mt-8 space-y-4 text-gray-600 leading-relaxed">{children}</div>
    </article>
  );
}
