import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '管理后台 | 2Pix',
  description: '2Pix 站点管理后台，管理工具、用户、评论、举报等内容。',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="admin-page-root">{children}</div>
}
