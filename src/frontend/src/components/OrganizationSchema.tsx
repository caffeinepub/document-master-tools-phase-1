/**
 * OrganizationSchema
 * Injects a global Organization JSON-LD schema tag for the entire site.
 * Place this once in App.tsx so every page benefits from the structured data.
 */
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DocMasterTools",
    url: "https://docmastertools.com",
    logo: "https://docmastertools.com/assets/generated/docmastertools-logo.dim_540x270.png",
    description:
      "DocMasterTools.com provides free online tools for PDF editing, image processing, resume building, calculators, and typing practice. All processing happens locally in the browser — no files are stored or uploaded.",
    email: "support@docmastertools.com",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@docmastertools.com",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
    knowsAbout: [
      "PDF Tools",
      "Image Editing",
      "Resume Builder",
      "Typing Test",
      "Online Calculators",
      "Document Processing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe; content is serialized JSON, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
