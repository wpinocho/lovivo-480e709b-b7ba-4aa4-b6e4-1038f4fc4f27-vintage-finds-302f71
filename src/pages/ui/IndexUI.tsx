import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { VintageFilters } from '@/components/VintageFilters';
import { CareGuideSection } from '@/components/CareGuideSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import heroImage from '@/assets/hero-vintage.jpg';

/**
 * EDITABLE UI - IndexUI
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [selectedCondition, setSelectedCondition] = useState<string>();

  // Filter products based on selected filters
  const finalFilteredProducts = filteredProducts.filter((product) => {
    if (selectedBrand) {
      const matchesBrand = 
        product.tags?.some((tag) => tag.toLowerCase().includes(selectedBrand.toLowerCase())) ||
        product.title?.toLowerCase().includes(selectedBrand.toLowerCase());
      if (!matchesBrand) return false;
    }
    if (selectedCondition) {
      const matchesCondition = product.tags?.some((tag) =>
        tag.toLowerCase().includes(selectedCondition.toLowerCase())
      );
      if (!matchesCondition) return false;
    }
    return true;
  });

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary">Sustainable Fashion</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Buy & Sell
                <span className="block text-primary">Vintage Fashion</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover unique secondhand pieces that tell a story. Shop sustainably, 
                sell easily, and give pre-loved fashion a new life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base group">
                  Explore Finds
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-base">
                  Start Selling
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div>
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div>Unique Pieces</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div>Authenticated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">♻️</div>
                  <div>Sustainable</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Vintage fashion shopping experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-3 rounded-lg shadow-lg">
                <div className="text-sm font-medium">New arrivals weekly!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VintageFilters
            selectedBrand={selectedBrand}
            selectedCondition={selectedCondition}
            onBrandChange={setSelectedBrand}
            onConditionChange={setSelectedCondition}
          />
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Curated Collections
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our handpicked vintage selections
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name || 'Collection'
                  : 'Featured Finds'
                }
              </h2>
              <p className="text-muted-foreground">
                {finalFilteredProducts.length} {finalFilteredProducts.length === 1 ? 'piece' : 'pieces'} available
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                See All Products
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-background rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : finalFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {finalFilteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No products match your filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedBrand(undefined);
                  setSelectedCondition(undefined);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Care Guide Section */}
      <CareGuideSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};