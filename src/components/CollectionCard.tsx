import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary cursor-pointer">
      <CardContent className="p-0" onClick={() => onViewProducts(collection.id)}>
        <div className="aspect-[4/3] bg-muted overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
          {collection.featured && (
            <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
              Featured
            </span>
          )}
        </div>
        
        <div className="p-6 space-y-3">
          <h3 className="text-foreground font-bold text-xl group-hover:text-primary transition-colors">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
          >
            Explore Collection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}