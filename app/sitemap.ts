import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.puremyst.in'

    // Static routes
    const routes = [
        '',
        '/AboutUs',
        '/contact',
        '/ro-water-purifier',
        '/commercial-water-purifier',
        '/washing-machine-cleaner',
        '/accessories',
        '/privacy-policy',
        '/return-refund-policy',
        '/shipping-policy',
        '/warranty-policy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes (Products)
    const products = await prisma.products.findMany({
        select: {
            slug: true,
            updatedAt: true,
        },
    })

    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...routes, ...productRoutes]
}
