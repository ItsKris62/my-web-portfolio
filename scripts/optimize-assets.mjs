import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

async function optimize() {
  console.log('Optimizing icons and assets...')

  // 1. christopher-rateng-logo-icon.png (1.5 MB -> 512x512 optimized PNG)
  const logoIconPath = path.resolve('public/branding/christopher-rateng-logo-icon.png')
  if (fs.existsSync(logoIconPath)) {
    const buf = await sharp(logoIconPath)
      .resize(512, 512, { fit: 'inside' })
      .png({ quality: 90, compressionLevel: 9 })
      .toBuffer()
    fs.writeFileSync(logoIconPath, buf)
    console.log(`Optimized logo-icon: ${buf.length} bytes`)
  }

  // 2. apple-touch-icon-dark.png (1.5 MB -> 180x180)
  const appleTouchDarkPath = path.resolve('public/icons/apple-touch-icon-dark.png')
  if (fs.existsSync(appleTouchDarkPath)) {
    const buf = await sharp(appleTouchDarkPath)
      .resize(180, 180, { fit: 'cover' })
      .png({ quality: 90, compressionLevel: 9 })
      .toBuffer()
    fs.writeFileSync(appleTouchDarkPath, buf)
    console.log(`Optimized apple-touch-icon-dark: ${buf.length} bytes`)
  }

  // 3. apple-touch-icon-light.png (1.1 MB -> 180x180)
  const appleTouchLightPath = path.resolve('public/icons/apple-touch-icon-light.png')
  if (fs.existsSync(appleTouchLightPath)) {
    const buf = await sharp(appleTouchLightPath)
      .resize(180, 180, { fit: 'cover' })
      .png({ quality: 90, compressionLevel: 9 })
      .toBuffer()
    fs.writeFileSync(appleTouchLightPath, buf)
    console.log(`Optimized apple-touch-icon-light: ${buf.length} bytes`)
  }

  // 4. favicon.ico (1.1 MB -> multi-size ICO or 48x48 PNG)
  // For standard ICO format, we can write a simple valid 32x32/16x16 ICO header or sharp PNG
  // Let's create an optimized 48x48 PNG buffer
  const faviconIcoPath = path.resolve('public/icons/favicon.ico')
  if (fs.existsSync(faviconIcoPath)) {
    // Generate 32x32 PNG buffer from the logo icon
    const png32 = await sharp(logoIconPath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()

    // Create a standard ICO wrapper for 32x32 PNG
    // ICO header: 6 bytes (Reserved 0, Type 1 for ICO, Count 1)
    // Directory entry: 16 bytes (Width 32, Height 32, Colors 0, Reserved 0, Planes 1, BPP 32, Size, Offset 22)
    const icoHeader = Buffer.alloc(6)
    icoHeader.writeUInt16LE(0, 0) // reserved
    icoHeader.writeUInt16LE(1, 2) // icon type (1 = icon)
    icoHeader.writeUInt16LE(1, 4) // count (1 image)

    const icoDir = Buffer.alloc(16)
    icoDir.writeUInt8(32, 0) // width (32)
    icoDir.writeUInt8(32, 1) // height (32)
    icoDir.writeUInt8(0, 2) // color palette (0 = no palette)
    icoDir.writeUInt8(0, 3) // reserved
    icoDir.writeUInt16LE(1, 4) // color planes (1)
    icoDir.writeUInt16LE(32, 6) // bits per pixel (32)
    icoDir.writeUInt32LE(png32.length, 8) // size of image data
    icoDir.writeUInt32LE(22, 12) // offset of image data (6 + 16 = 22)

    const icoBuffer = Buffer.concat([icoHeader, icoDir, png32])
    fs.writeFileSync(faviconIcoPath, icoBuffer)
    console.log(`Optimized favicon.ico: ${icoBuffer.length} bytes`)
  }

  // 5. adek_tatu_website.png (1.5 MB -> optimized PNG)
  const adekPath = path.resolve('public/og/adek_tatu_website.png')
  if (fs.existsSync(adekPath)) {
    const meta = await sharp(adekPath).metadata()
    const buf = await sharp(adekPath)
      .resize(Math.min(meta.width || 1200, 1440), undefined, { withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 8 })
      .toBuffer()
    fs.writeFileSync(adekPath, buf)
    console.log(`Optimized adek_tatu_website: ${buf.length} bytes`)
  }

  console.log('Asset optimization complete!')
}

optimize().catch(console.error)
