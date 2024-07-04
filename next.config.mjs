import withPWA from 'next-pwa';

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
};

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(pwaConfig)(nextConfig);
