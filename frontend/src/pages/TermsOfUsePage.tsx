import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TermsOfUsePageProps {
  onBack: () => void;
}

export default function TermsOfUsePage({ onBack }: TermsOfUsePageProps) {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Terms of Use</h1>
          <p className="text-muted-foreground">Last updated: January 30, 2026</p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using Document Master Tools, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily use Document Master Tools for personal and commercial document processing purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose without proper attribution</li>
            <li>Attempt to decompile or reverse engineer any software contained on our website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>Service Description</h2>
          <p>
            Document Master Tools provides browser-based document processing tools including:
          </p>
          <ul>
            <li>PDF manipulation and conversion tools</li>
            <li>Image editing and processing tools</li>
            <li>Resume building templates and tools</li>
          </ul>

          <h2>User Responsibilities</h2>
          <p>
            You are responsible for:
          </p>
          <ul>
            <li>Ensuring you have the right to process any documents you upload</li>
            <li>Complying with all applicable laws and regulations</li>
            <li>Not using our services for any illegal or unauthorized purpose</li>
            <li>Not attempting to interfere with or disrupt our services</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            The materials on Document Master Tools are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall Document Master Tools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services.
          </p>

          <h2>Accuracy of Materials</h2>
          <p>
            The materials appearing on Document Master Tools could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current.
          </p>

          <h2>Links</h2>
          <p>
            We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.
          </p>

          <h2>Modifications</h2>
          <p>
            We may revise these terms of use at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of use.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </article>
      </div>
    </div>
  );
}
