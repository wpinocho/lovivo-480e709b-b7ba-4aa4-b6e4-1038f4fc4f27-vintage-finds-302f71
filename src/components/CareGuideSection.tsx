import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Shirt, Droplets, Sun } from 'lucide-react'

export const CareGuideSection = () => {
  const careGuides = [
    {
      icon: Shirt,
      title: 'Gentle Washing',
      description: 'Always wash vintage pieces inside-out on delicate cycle with cold water',
    },
    {
      icon: Droplets,
      title: 'Air Dry',
      description: 'Avoid dryers - hang dry to preserve fabric integrity and prevent shrinkage',
    },
    {
      icon: Sparkles,
      title: 'Proper Storage',
      description: 'Store in breathable garment bags away from direct sunlight',
    },
    {
      icon: Sun,
      title: 'Spot Treatment',
      description: 'Address stains immediately with gentle, eco-friendly stain removers',
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Vintage Care Guide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Keep your vintage treasures looking their best with our expert care tips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careGuides.map((guide, index) => {
            const Icon = guide.icon
            return (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {guide.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}