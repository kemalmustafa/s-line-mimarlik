import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Yönetici',
    plural: 'Yöneticiler',
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),

    // İlk admin hesabı oluşturuldu. Yeni hesap açılmasını kapatıyoruz.
    create: () => false,

    // Admin yalnızca kendi kullanıcı kaydını okuyabilir ve değiştirebilir.
    read: ({ req: { user } }) => {
      if (!user) return false

      return {
        id: {
          equals: user.id,
        },
      }
    },
    update: ({ req: { user } }) => {
      if (!user) return false

      return {
        id: {
          equals: user.id,
        },
      }
    },

    // Admin hesabının yanlışlıkla silinmesini engelliyoruz.
    delete: () => false,
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  fields: [],
}