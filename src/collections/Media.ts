import { APIError, type CollectionConfig } from 'payload'

// Kodda doğrudan dosya bağlantısıyla kullanılan görseller.
const protectedFilenames = new Set([
  'WhatsApp Image 2026-09-05 at 18.42.12.jpeg',
  'anasayfa-kapak.png',
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

        // Ana sayfa veya başka bir kod sayfasında doğrudan kullanılan dosyalar.
        if (
          media.filename &&
          protectedFilenames.has(media.filename)
        ) {
          throw new APIError(
            'Görsel korunuyor: Site sayfalarında kullanılıyor.',
            409,
            null,
            true,
          )
        }

        // Proje kapağı veya proje galerisi kontrolü.
        const projectReferences = await req.payload.find({
          collection: 'projects',
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

        if (projectReferences.docs.length > 0) {
          throw new APIError(
            `Görsel korunuyor: Projede kullanılıyor (${projectReferences.docs[0].title}).`,
            409,
            null,
            true,
          )
        }

        // Hizmet kartı kapağı ve hizmetlerin alt başlık galerileri kontrolü.
        const serviceReferences = await req.payload.find({
          collection: 'services',
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
              { 'serviceSections.images': { equals: id } },
            ],
          },
        })

        if (serviceReferences.docs.length > 0) {
          throw new APIError(
            `Görsel korunuyor: Hizmette kullanılıyor (${serviceReferences.docs[0].title}).`,
            409,
            null,
            true,
          )
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