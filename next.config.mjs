import withPWA from 'next-pwa';

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return {
  //     fallback: [
  //       {
  //         source: '/api/:path*',
  //         destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
  //       }
  //     ]
  //   };
  // }
};

export default withPWA(pwaConfig)(nextConfig);
