import { APIError, type CollectionConfig } from 'payload'

// Sayfalarda doğrudan dosya bağlantısıyla kullanılan görseller.
const protectedFilenames = new Set([
  'WhatsApp Image 2026-09-05 at 18.42.12.jpeg',
])

export const Media: CollectionConfig = {
  slug: 'media',

  labels: {
    singular: 'Görsel',
    plural: 'Görseller',
  },

  admin: {
    components: {
      beforeListTable: ['/components/admin/DeleteUnusedMedia'],
    },
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        const media = await req.payload.findByID({
          collection: 'media',
          id,
          depth: 0,
          req,
          overrideAccess: true,
        })

        if (media.filename && protectedFilenames.has(media.filename)) {
          throw new APIError(
            'Görsel korunuyor: Site sayfalarında kullanılıyor.',
            409,
            null,
            true,
          )
        }

        for (const collection of ['projects', 'services'] as const) {
          // Yayın durumu filtrelenmez; taslaklar da korunur.
          // Bu kontrol tüm ilişkileri görebilmeli.
          const references = await req.payload.find({
            collection,
            req,
            overrideAccess: true,
            depth: 0,
            limit: 1,
            pagination: false,
            select: {
              title: true,
            },
            where: {
              or: [
                { cover: { equals: id } },
                { 'gallery.image': { equals: id } },
              ],
            },
          })

          if (references.docs.length > 0) {
            const document = references.docs[0]
            const label = collection === 'projects' ? 'Projede' : 'Hizmette'

            throw new APIError(
              `Görsel korunuyor: ${label} kullanılıyor (${document.title}).`,
              409,
              null,
              true,
            )
          }
        }
      },
    ],
  },

  fields: [
    {
      name: 'alt',
      label: 'Görsel açıklaması',
      type: 'text',
      required: false,
      admin: {
        description:
          'İsteğe bağlı. Fotoğraftaki belirli bir detayı anlatmak isterseniz yazabilirsiniz.',
      },
    },
  ],

  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    pasteURL: false,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1920,
        withoutEnlargement: true,
      },
    ],
    adminThumbnail: 'thumbnail',
  },
}