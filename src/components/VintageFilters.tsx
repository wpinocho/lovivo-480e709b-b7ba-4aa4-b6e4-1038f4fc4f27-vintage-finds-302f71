import { Badge } from '@/components/ui/badge'

interface VintageFiltersProps {
  selectedBrand?: string
  selectedCondition?: string
  onBrandChange: (brand: string | undefined) => void
  onConditionChange: (condition: string | undefined) => void
}

export const VintageFilters = ({
  selectedBrand,
  selectedCondition,
  onBrandChange,
  onConditionChange,
}: VintageFiltersProps) => {
  const brands = ['Designer', 'Vintage', '70s', '80s', '90s']
  const conditions = ['Like New', 'Excellent', 'Good']

  return (
    <div className="space-y-6">
      {/* Brand Filters */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Era & Style</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <Badge
              key={brand}
              variant={selectedBrand === brand ? 'default' : 'outline'}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => onBrandChange(selectedBrand === brand ? undefined : brand)}
            >
              {brand}
            </Badge>
          ))}
        </div>
      </div>

      {/* Condition Filters */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Condition</h3>
        <div className="flex flex-wrap gap-2">
          {conditions.map((condition) => (
            <Badge
              key={condition}
              variant={selectedCondition === condition ? 'default' : 'outline'}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() =>
                onConditionChange(selectedCondition === condition ? undefined : condition)
              }
            >
              {condition}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}