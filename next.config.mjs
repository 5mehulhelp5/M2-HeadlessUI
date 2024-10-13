/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.M2_STORE_URl+'graphql/', // Proxy to Magento GraphQL
      },
    ];
  },
  images: {
    domains: ['demo.hyva.io','m246.local'], // Add any additional domains you need here
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client','bcrypt']
  }
};

export default nextConfig;
