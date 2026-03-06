import type {CollectionConfig} from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true, // public pour afficher sur le site
    },
    upload: {
        staticDir: 'uploads',
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}