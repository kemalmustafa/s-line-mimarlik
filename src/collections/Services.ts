import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Hizmet',
    plural: 'Hizmetler',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder', 'status'],
  },
  defaultSort: 'sortOrder',
  access: {
    read: ({ req: { user } }) => {
      if (user) return true

      return {
        status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hizmet bilgileri',
          fields: [
            {
              name: 'title',
              label: 'Hizmet adı',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Duvar Uygulamaları',
              },
            },
            {
              name: 'category',
              label: 'Kart üst etiketi',
              type: 'text',
              admin: {
                placeholder: 'UYGULAMA',
                description: 'Kartın fotoğrafı üzerinde gösterilir.',
              },
            },
            {
              name: 'description',
              label: 'Hizmet açıklaması',
              type: 'richText',
              required: true,
              admin: {
                description:
                  'Hizmetin kapsamını, kullanılan malzemeleri ve çalışma sürecini anlatın.',
              },
            },
          ],
        },
        {
          label: 'Görseller',
          fields: [
            {
              name: 'cover',
              label: 'Kapak görseli',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description:
                  'Hizmet kartında ve detay sayfasının başında gösterilir.',
              },
            },
            {
              name: 'galleryUploader',
              type: 'ui',
              admin: {
                components: {
                  Field: {
                    path: '/components/admin/GalleryUploader',
                    clientProps: {
                      collectionSlug: 'services',
                    },
                  },
                },
              },
            },
            {
              name: 'gallery',
              label: 'Hizmet galerisi',
              type: 'array',
              labels: {
                singular: 'Fotoğraf',
                plural: 'Fotoğraflar',
              },
              admin: {
                description:
                  'Fotoğrafları soldaki tutamaçla sıralayabilirsiniz.',
              },
              fields: [
                {
                  name: 'image',
                  label: 'Görsel',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  label: 'Fotoğraf açıklaması',
                  type: 'text',
                  admin: {
                    description: 'İsteğe bağlıdır.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Yayın ayarları',
          fields: [
            {
              name: 'slug',
              label: 'URL adı',
              type: 'text',
              unique: true,
              index: true,
              admin: {
                description:
                  'Boş bırakırsanız hizmet adından oluşturulur. Mevcut URL’yi değiştirmek eski bağlantıyı bozar.',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data, originalDoc }) => {
                    const source =
                      typeof value === 'string' && value.trim()
                        ? value
                        : originalDoc?.slug || data?.title

                    const slug =
                      typeof source === 'string'
                        ? source
                            .trim()
                            .replace(/İ/g, 'i')
                            .replace(/ı/g, 'i')
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-+|-+$/g, '')
                        : ''

                    if (!slug) {
                      throw new Error(
                        'URL oluşturulamadı. Hizmet adına harf veya sayı ekleyin.',
                      )
                    }

                    return slug
                  },
                ],
              },
              validate: (value: string | null | undefined) => {
                if (value == null || value.trim() === '') return true

                return (
                  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ||
                  'Küçük İngilizce harfler, sayılar ve tire kullanın.'
                )
              },
            },
            {
              name: 'sortOrder',
              label: 'Liste sırası',
              type: 'number',
              defaultValue: 0,
              required: true,
              min: 0,
              admin: {
                description:
                  'Küçük sayı önce gösterilir. Örneğin: 1, 2, 3.',
              },
              validate: (value: number | null | undefined) =>
                (typeof value === 'number' &&
                  Number.isInteger(value) &&
                  value >= 0) ||
                'Sıfır veya pozitif bir tam sayı girin.',
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      label: 'Yayın durumu',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Taslak', value: 'draft' },
        { label: 'Yayında', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}