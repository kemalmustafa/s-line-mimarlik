import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Görsel',
    plural: 'Görseller',
  },
  access: {
  read: () => true,
  create: ({ req: { user } }) => Boolean(user),
  update: ({ req: { user } }) => Boolean(user),
  delete: ({ req: { user } }) => Boolean(user),
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