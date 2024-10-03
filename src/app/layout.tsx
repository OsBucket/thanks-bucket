import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/shared/lib/index.css';
import { QueryProvider } from './_providers';
import KakaoScript from '@/shared/lib/KakaoScript';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: 'Thanks Bucket',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icons/logo-512x512.png', sizes: '512x512' },
    { rel: 'icon', url: '/icons/logo-256x256.png', sizes: '256x256' },
    { rel: 'icon', url: '/icons/logo-192x192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', url: '/icons/logo-180x180.png', sizes: '180x180' },
    { rel: 'icon', url: '/icons/logo-152x152.png', sizes: '152x152' },
    { rel: 'icon', url: '/icons/logo-144x144.png', sizes: '144x144' },
    { rel: 'icon', url: '/icons/logo-120x120.png', sizes: '120x120' },
    { rel: 'icon', url: '/icons/logo-114x114.png', sizes: '114x114' }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/icons/main-icon.svg" />
      </head>
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
      <KakaoScript />
    </html>
  );
}
