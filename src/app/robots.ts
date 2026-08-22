import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // Ganti URL ini dengan domain asli Anda jika sudah live (misal: https://camlogexpress.com)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://camlogexpress.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/api/', 
        '/kurir/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
