import path from 'path'
import {fileURLToPath} from 'url'

import sharp from 'sharp'
import {buildConfig} from 'payload'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import {postgresAdapter} from '@payloadcms/db-postgres'

import { Posts } from './src/collections/Posts.ts'
import { Users } from './src/collections/Users.ts'
import { Media } from './src/collections/Media'
import { Projects } from './src/collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
    },

    editor: lexicalEditor(),

    collections: [Users, Posts, Media, Projects],

    secret: process.env.PAYLOAD_SECRET || '',

    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL,
        },
    }),

    sharp,

    typescript: {
        outputFile: path.resolve(dirname, 'src/payload-types.ts'),
    },
})