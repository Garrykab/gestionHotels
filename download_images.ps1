# Créer le dossier images s'il n'existe pas
if (-not (Test-Path "images")) {
    New-Item -ItemType Directory -Path "images"
}

# URLs des images depuis Unsplash
$imageUrls = @{
    "hotel1.jpg" = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop"
    "hotel2.jpg" = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop"
    "hotel3.jpg" = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop"
    "hero-bg.jpg" = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop"
}

# Télécharger chaque image
foreach ($image in $imageUrls.GetEnumerator()) {
    $outputPath = Join-Path "images" $image.Key
    Write-Host "Téléchargement de $($image.Key)..."
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
    Write-Host "Téléchargement terminé pour $($image.Key)"
}

Write-Host "Tous les téléchargements sont terminés !" 