import Head from 'next/head'
import { defaultMeta } from '@/lib/seo/meta'
export default function SEO({ title, description }: { title?: string; description?: string }) {
  const meta = { ...defaultMeta, title, description }
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
    </Head>
  )
}