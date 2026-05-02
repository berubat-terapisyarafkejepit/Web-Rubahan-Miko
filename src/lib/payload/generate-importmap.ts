import { generateImportMap } from 'payload'
import config from '@/payload.config'

;(async () => {
  await generateImportMap(await config, {
    force: true,
    log: true,
  })
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
