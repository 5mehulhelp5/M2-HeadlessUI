/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.M2_STORE_URl+'graphql/:path*', // Proxy to Magento GraphQL
      },
    ];
  },
  // async middleware(req, res) {
  //   return createProxyMiddleware('/api', {
  //     target: process.env.M2_STORE_URl,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '', // Removes /api from the forwarded path
  //     },
  //   })(req, res);
  // },
  images: {
    domains: ['demo.hyva.io'], // Add any additional domains you need here
  },
};

export default nextConfig;
