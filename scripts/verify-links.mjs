async function verify() {
  console.log('Fetching homepage from http://localhost:3005/ ...')
  const res = await fetch('http://localhost:3005/')
  const html = await res.text()

  const linkRegex = /href=["'](\/[^"'#]*)["']/g
  const matches = new Set()
  let m
  while ((m = linkRegex.exec(html)) !== null) {
    matches.add(m[1])
  }

  // Also extract img src
  const imgRegex = /src=["'](\/[^"']*)["']/g
  while ((m = imgRegex.exec(html)) !== null) {
    if (!m[1].startsWith('/_next/')) {
      matches.add(m[1])
    }
  }

  console.log(`Verifying ${matches.size} unique internal resources...`)
  let allPass = true
  for (const path of matches) {
    const r = await fetch('http://localhost:3005' + path)
    if (r.status !== 200) {
      console.error(`FAIL: ${path} returned status ${r.status}`)
      allPass = false
    } else {
      console.log(`OK (200): ${path}`)
    }
  }

  if (allPass) {
    console.log('ALL INTERNAL LINKS AND ASSETS PASSED (100% 200 OK)')
  } else {
    console.error('SOME LINKS FAILED')
    process.exit(1)
  }
}

verify().catch(console.error)
