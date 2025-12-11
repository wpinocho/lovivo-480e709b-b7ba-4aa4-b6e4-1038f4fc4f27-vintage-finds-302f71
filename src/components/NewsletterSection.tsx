import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection
 * 
 * Componente UI completamente editable para suscripción a newsletter.
 * El agente IA puede modificar colores, textos, layout, etc.
 * 
 * Consume lógica de HeadlessNewsletter (solo muestra email input).
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-gradient-to-br from-foreground/5 to-primary/5 py-20 border-y">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logic.success ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-primary/20 rounded-full p-4">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground">
                  Welcome to the Community!
                </h3>
                <p className="text-lg text-muted-foreground">
                  Get ready for exclusive vintage finds and sustainable fashion tips.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-foreground">
                    Join Our Vintage Community
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Get notified about new arrivals, exclusive sales, and sustainable fashion tips
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 h-12"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    size="lg"
                    className="sm:w-auto"
                  >
                    {logic.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-destructive">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};