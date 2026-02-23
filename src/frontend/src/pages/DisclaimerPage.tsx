import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DisclaimerPageProps {
  onBack: () => void;
}

export default function DisclaimerPage({ onBack }: DisclaimerPageProps) {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Disclaimer</h1>
          <p className="text-muted-foreground">Last updated: January 30, 2026</p>

          <h2>General Information</h2>
          <p>
            The information provided by Document Master Tools is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h2>No Professional Advice</h2>
          <p>
            The tools and services provided on this website are not intended to be a substitute for professional advice. Always seek the advice of qualified professionals with any questions you may have regarding document processing, legal matters, or business decisions.
          </p>

          <h2>Tool Accuracy</h2>
          <p>
            While we strive to provide accurate and reliable document processing tools, we cannot guarantee:
          </p>
          <ul>
            <li>Perfect conversion or processing results for all document types</li>
            <li>Compatibility with all file formats and versions</li>
            <li>Preservation of all formatting, fonts, or special characters</li>
            <li>100% accuracy in OCR (Optical Character Recognition) results</li>
          </ul>

          <h2>User Responsibility</h2>
          <p>
            Users are solely responsible for:
          </p>
          <ul>
            <li>Verifying the accuracy and quality of processed documents</li>
            <li>Ensuring they have the legal right to process uploaded documents</li>
            <li>Backing up important documents before processing</li>
            <li>Reviewing output files before using them for official purposes</li>
          </ul>

          <h2>External Links Disclaimer</h2>
          <p>
            This website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>

          <h2>Errors and Omissions</h2>
          <p>
            While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Document Master Tools is not responsible for any errors or omissions or for the results obtained from the use of this information.
          </p>

          <h2>Fair Use</h2>
          <p>
            This website may use copyrighted material which has not always been specifically authorized by the copyright owner. We believe this constitutes a 'fair use' of any such copyrighted material as provided for in applicable copyright law.
          </p>

          <h2>No Warranties</h2>
          <p>
            This website and its tools are provided "as is" without any representations or warranties, express or implied. We make no representations or warranties in relation to this website or the information and materials provided on this website.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
          </p>

          <h2>Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify this disclaimer at any time. Changes and clarifications will take effect immediately upon their posting on the website.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about this disclaimer, please contact us through our website.
          </p>
        </article>
      </div>
    </div>
  );
}
