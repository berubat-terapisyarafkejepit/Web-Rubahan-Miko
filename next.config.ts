import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web-berubat.vercel.app',
        pathname: '/img/**',
      },
    ],
  },
}

export default withPayload(nextConfig)
