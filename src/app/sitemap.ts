import { MetadataRoute } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.2pix.cn'

  let tools: { slug: string; updatedAt: Date }[] = []
  let news: { id: number; publishedAt: Date | null }[] = []

  try {
    tools = await prisma.tool.findMany({
      where: { status: 'approved', isActive: true },
      select: { slug: true, updatedAt: true }
    })
    news = await prisma.news.findMany({
      select: { id: true, publishedAt: true }
    })
  } catch {
    // 鏋勫缓鏃舵暟鎹簱涓嶅彲鐢紝鍏堣繑鍥為潤鎬侀〉闈?    console.warn('sitemap: database unavailable during build, using static pages only')
  }

  try { await prisma.$disconnect() } catch {}

  // 闈欐€侀〉闈?  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/trending`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${baseUrl}/opensource`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/user-share`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  // 宸ュ叿璇︽儏椤?  const toolPages = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // 璧勮璇︽儏椤?  const newsPages = news.map(article => ({
    url: `${baseUrl}/news/${article.id}`,
    lastModified: article.publishedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5
  }))

  await prisma.$disconnect()

  return [...staticPages, ...toolPages, ...newsPages]
}
