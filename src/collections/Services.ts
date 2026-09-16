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
                placeholder: 'Cephe Sistemleri',
              },
            },
            {
              name: 'cover',
              label: 'Hizmet kartı görseli',
              type: 'upload',
              relationTo: 'media',
              admin: 
              {
                  description:
                  'Hizmetlerimiz sayfasındaki kartta gösterilir. İsteğe bağlıdır.',
              },
            },
            {
              name: 'category',
              label: 'Kısa üst etiket',
              type: 'text',
              admin: {
                placeholder: 'S-LINE DEKORASYON',
                description:
                  'İsteğe bağlıdır; detay sayfasındaki hizmet başlığının üstünde görünür.',
              },
            },
            {
              name: 'description',
              label: 'Kısa açıklama',
              type: 'richText',
              admin: {
                description:
                  'İsteğe bağlıdır; hizmet başlığının altında görünür.',
              },
            },
          ],
        },

        {
          label: 'Alt başlıklar ve fotoğraflar',
          fields: [
            {
              name: 'serviceSections',
              label: 'Alt başlıklar',
              type: 'array',
              minRows: 1,
              labels: {
                singular: 'Alt başlık',
                plural: 'Alt başlıklar',
              },
              admin: {
                initCollapsed: true,
                description:
                  'Her alt başlığa bir veya birden fazla fotoğraf ekleyebilirsiniz.',
              },
              fields: [
                {
                  name: 'title',
                  label: 'Alt başlık adı',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Örneğin: Betopan',
                  },
                },
                {
                  name: 'images',
                  label: 'Fotoğraflar',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                  admin: {
                    description:
                      'Bir veya birden fazla fotoğraf seçebilirsiniz.',
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
                  'Boş bırakırsanız hizmet adından oluşturulur.',
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
            },
            {
              name: 'sortOrder',
              label: 'Liste sırası',
              type: 'number',
              defaultValue: 0,
              required: true,
              min: 0,
              admin: {
                description: 'Küçük sayı önce gösterilir.',
              },
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