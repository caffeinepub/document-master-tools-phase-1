import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export default function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 30, 2026</p>

          <h2>Introduction</h2>
          <p>
            Document Master Tools ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our document processing tools.
          </p>

          <h2>Data Processing</h2>
          <p>
            All file processing on Document Master Tools happens entirely in your browser. We do not upload, store, or transmit your files to any server. Your documents remain on your device at all times.
          </p>

          <h3>What We Don't Collect</h3>
          <ul>
            <li>We do not collect or store any files you process</li>
            <li>We do not collect personal information unless you voluntarily provide it</li>
            <li>We do not track your document content or processing activities</li>
          </ul>

          <h3>What We May Collect</h3>
          <ul>
            <li>Anonymous usage statistics (page views, tool usage counts)</li>
            <li>Technical information (browser type, device type) for improving user experience</li>
            <li>Cookies for essential website functionality</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services for analytics and advertising. These services may collect information about your visit to our website in accordance with their own privacy policies.
          </p>

          <h2>Data Security</h2>
          <p>
            Since all processing happens in your browser, your files never leave your device. We implement industry-standard security measures to protect our website and any information we may collect.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access any personal information we may have collected</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of analytics tracking</li>
            <li>Disable cookies in your browser settings</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </article>
      </div>
    </div>
  );
}
