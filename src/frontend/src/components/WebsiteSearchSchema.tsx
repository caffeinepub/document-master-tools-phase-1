/**
 * WebsiteSearchSchema
 * JSON-LD only component — renders no visible UI.
 * Injects a WebSite schema with Sitelinks Search Box potentialAction
 * so Google can show a search box directly in search results.
 */
export default function WebsiteSearchSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DocMasterTools",
    url: "https://docmastertools.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://docmastertools.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe; content is serialized JSON, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
