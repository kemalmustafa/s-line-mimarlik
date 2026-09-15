import { tr } from '@payloadcms/translations/languages/tr'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
  supportedLanguages: { tr },
  fallbackLanguage: 'tr',
},
  admin: {
  user: Users.slug,
  theme: 'light',
  meta: {
    titleSuffix: ' | S-Line Yönetim',
  },
  components: {
  graphics: {
    Logo: '/components/admin/Branding#Logo',
  },
  beforeNavLinks: ['/components/admin/Branding#AdminHomeLink'],
  beforeDashboard: ['/components/admin/Branding#Welcome'],
},
  importMap: {
    baseDir: path.resolve(dirname),
  },
},
  collections: [Users, Media, Projects, Services],
  upload: {
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  abortOnLimit: true,
},
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
