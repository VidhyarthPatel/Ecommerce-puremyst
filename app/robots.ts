import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/api/', '/checkout/', '/order-confirmation/'],
        },
        sitemap: 'https://www.puremyst.in/sitemap.xml',
    }
}
