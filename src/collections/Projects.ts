import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Proje',
    plural: 'Projeler',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'year', 'status'],
  },
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
          label: 'Proje bilgileri',
          fields: [
            {
              name: 'title',
              label: 'Proje adı',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Proje açıklaması',
              type: 'richText',
              required: true,
              admin: {
                description:
                  'Yapılan uygulamaları, malzemeleri ve tasarım yaklaşımını anlatın.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  label: 'Konum',
                  type: 'text',
                  admin: {
                    width: '65%',
                    placeholder: 'Atakum, Samsun',
                  },
                },
                {
                  name: 'year',
                  label: 'Yıl',
                  type: 'number',
                  min: 1900,
                  max: 2100,
                  admin: {
                    width: '35%',
                  },
                  validate: (value: number | null | undefined) =>
                    value == null ||
                    Number.isInteger(value) ||
                    'Tam sayı gir.',
                },
              ],
            },
            {
              name: 'projectType',
              label: 'Proje türü',
              type: 'select',
              options: [
                { label: 'Konut', value: 'residential' },
                { label: 'Ofis', value: 'office' },
                { label: 'Ticari', value: 'commercial' },
                { label: 'Diğer', value: 'other' },
              ],
            },
          ],
        },
        {
          label: 'Görseller',
          description:
            'Kapak görselini seçin ve proje fotoğraflarını ekleyin.',
          fields: [
            {
              name: 'cover',
              label: 'Kapak görseli',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description:
                  'Proje kartında ve detay sayfasının başında gösterilir.',
              },
            },
            {
  name: 'galleryUploader',
  type: 'ui',
  admin: {
    components: {
      Field: '/components/admin/GalleryUploader',
    },
  },
},
            {
              name: 'gallery',
              label: 'Proje galerisi',
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
                  label: 'Görsel açıklaması',
                  type: 'text',
                  admin: {
                    description:
                      'İsteğe bağlıdır. Fotoğrafın altında gösterilir.',
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
              required: false,
              unique: true,
              index: true,
              admin: {
                description:
                  'Yeni projede boş bırakırsanız proje adından oluşturulur. Mevcut değeri değiştirmek eski bağlantıyı bozar.',
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
                        'URL oluşturulamadı. Proje adına harf veya sayı ekleyin.',
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
                  'Küçük İngilizce harfler, sayılar ve aralarda tire kullan.'
                )
              },
            },
            {
              name: 'featured',
              label: 'Anasayfada öne çıkar',
              type: 'checkbox',
              defaultValue: false,
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