import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Este componente solo maneja la presentación del ProductCard.
 * Toda la lógica viene del HeadlessProductCard.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Animaciones y efectos
 * - Agregar features visuales (hover effects, etc.)
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-muted rounded-t-lg overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-destructive text-destructive-foreground text-xs px-2.5 py-1 rounded-full font-semibold shadow-md">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-accent text-accent-foreground text-xs px-2.5 py-1 rounded-full font-semibold shadow-md">
                      Featured
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-foreground/80 text-background text-xs px-2.5 py-1 rounded-full font-semibold shadow-md">
                      Sold
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </div>
            </Link>

            <div className="px-4 pb-4 space-y-3">
              {logic.hasVariants && logic.options && (
                <div className="space-y-2">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-medium text-muted-foreground mb-1.5">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-7 w-7 rounded-full border-2 transition-all ${
                                  isSelected ? 'border-primary scale-110' : 'border-border hover:border-primary/50'
                                } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                                style={{ backgroundColor: swatch }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border-2 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                                isSelected 
                                  ? 'border-primary bg-primary text-primary-foreground' 
                                  : 'border-border bg-background text-foreground hover:border-primary/50'
                              } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                              title={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-end justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-foreground font-bold text-lg">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-muted-foreground text-sm line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className="font-medium"
                >
                  {logic.inStock ? 'Add to Cart' : 'Sold Out'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}