import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '', // no port needed normally
        pathname: '/t/p/**', // TMDB image path pattern wildcard
      },
    ],
  },
};

export default nextConfig;
