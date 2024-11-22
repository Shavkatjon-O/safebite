import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'safebite.falconsoft.uz',
        port: '',
        pathname: '/**',
      },
    ]
  }
    /* config options here */
};

export default nextConfig;
