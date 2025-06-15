import Image from 'next/image'
export default function LazyImage({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={800} height={600} placeholder="blur" blurDataURL="/assets/images/hero/avatar-fallback.jpg" />
}