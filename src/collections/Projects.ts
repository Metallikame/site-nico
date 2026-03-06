import type {CollectionConfig} from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true, // public
    },
    fields: [
        {name: 'title', type: 'text', required: true},
        {name: 'slug', type: 'text', required: true, unique: true},
        {name: 'summary', type: 'textarea'},
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                },
            ],
        },
    ],
}