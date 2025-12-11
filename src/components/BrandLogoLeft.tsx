export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="ml-2 flex items-center">
      <img 
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/480e709b-b7ba-4aa4-b6e4-1038f4fc4f27/logo.jpg" 
        alt="REVIVE - Vintage & Secondhand Fashion"
        className="h-12 w-auto object-contain" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-bold text-foreground">REVIVE</span>';
        }}
      />
    </a>
  )
}