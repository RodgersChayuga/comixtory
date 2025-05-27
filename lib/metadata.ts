export function generateMetadataJSON(images: string[], story: string) {
    return {
        name: 'HekaHeka Comic',
        description: story,
        image: images[0],
        attributes: images.slice(1).map((img, i) => ({ trait_type: `Panel ${i + 2}`, value: img }))
    }
}