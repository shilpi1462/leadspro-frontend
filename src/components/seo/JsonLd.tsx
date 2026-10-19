interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

// Emits one schema.org block; multiple nodes are wrapped in a single @graph.
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
