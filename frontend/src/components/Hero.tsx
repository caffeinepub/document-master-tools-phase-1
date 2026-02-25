import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Master Your Documents with{' '}
              <span className="text-primary">Professional Tools</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Process PDFs, edit images, and build stunning resumes - all in your browser. Fast, secure, and completely private.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                View All Tools
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Private</div>
              </div>
              <div>
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm text-muted-foreground">Tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm text-muted-foreground">Forever</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/assets/generated/hero-banner.dim_1200x400.png"
              alt="Document Master Tools"
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
