import { ArrowLeft } from "lucide-react";

interface DisclaimerPageProps {
  onBack: () => void;
}

export default function DisclaimerPage({ onBack }: DisclaimerPageProps) {
  const sections = [
    {
      title: "General Information",
      content:
        "This website provides free document and utility tools for educational and personal use. We do not store user files. All processing happens locally in the browser. The information provided by DocMasterTools.com is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.",
    },
    {
      title: "No Professional Advice",
      content:
        "The tools and services provided on this website are not intended to be a substitute for professional advice. Always seek the advice of qualified professionals with any questions you may have regarding document processing, legal matters, or business decisions.",
    },
    {
      title: "Tool Accuracy",
      content:
        "While we strive to provide accurate and reliable document processing tools, we cannot guarantee perfect conversion or processing results for all document types, compatibility with all file formats and versions, preservation of all formatting and fonts, or 100% accuracy in OCR results.",
    },
    {
      title: "User Responsibility",
      content:
        "Users are solely responsible for verifying the accuracy and quality of processed documents, ensuring they have the legal right to process uploaded documents, backing up important documents before processing, and reviewing output files before using them for official purposes.",
    },
    {
      title: "External Links Disclaimer",
      content:
        "This website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.",
    },
    {
      title: "No Warranties",
      content:
        'This website and its tools are provided "as is" without any representations or warranties, express or implied. We make no representations or warranties in relation to this website or the information and materials provided on this website.',
    },
    {
      title: "Limitation of Liability",
      content:
        "Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.",
    },
    {
      title: "Contact Information",
      content:
        "If you have any questions about this disclaimer, please contact us at support@docmastertools.com.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <button
          type="button"
          data-ocid="disclaimer.back_button"
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: "0.9rem",
            marginBottom: "2rem",
            padding: "0.25rem 0",
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        <h1
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Disclaimer
        </h1>
        <p
          style={{
            color: "#94a3b8",
            marginBottom: "2.5rem",
            fontSize: "0.95rem",
          }}
        >
          Last updated: March 2026
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {sections.map((section) => (
            <div
              key={section.title}
              style={{
                background: "#111827",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                borderLeft: "3px solid #f97316",
              }}
            >
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "0.93rem",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            color: "#475569",
            fontSize: "0.8rem",
            textAlign: "center",
            marginTop: "2.5rem",
          }}
        >
          © {new Date().getFullYear()} RJY TOTAL MANPOWERS SERVICES PRIVATE
          LIMITED. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
