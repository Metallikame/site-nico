const { withPayload } = require('@payloadcms/next/withPayload')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'ton-domaine.com', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'www.ton-domaine.com', pathname: '/uploads/**' },
    ],
  },
}

module.exports = withPayload(nextConfig)