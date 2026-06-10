import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '个人中心 | 2Pix',
  description: '管理你的2Pix账号信息、收藏的工具、发布的分享和评论记录。',
}

export default function UserCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
