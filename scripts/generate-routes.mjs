import fs from 'node:fs'
import path from 'node:path'
import { endpoints } from '../module/endpoints.js'

const ROOT = process.cwd()
const ROUTES_DIR = path.join(ROOT, 'routes')

fs.rmSync(ROUTES_DIR, { recursive: true, force: true })
fs.mkdirSync(ROUTES_DIR, { recursive: true })

for (const ep of endpoints) {
  const method = String(ep.method).toLowerCase()
  const routeRel = String(ep.route).replace(/^\/+/, '').replace(/\/+$/, '')

  const outFile = path.join(ROUTES_DIR, 'api', 'robosats', `${routeRel}.${method}.js`)
  fs.mkdirSync(path.dirname(outFile), { recursive: true })

  const handlerPath = `../../../runtime/handlers/${ep.file}`

  fs.writeFileSync(
    outFile,
    `import handler from '${handlerPath}'\nexport default handler\n`,
    'utf8'
  )
}

console.log(`[generate-routes] Generated ${endpoints.length} route wrappers.`)
