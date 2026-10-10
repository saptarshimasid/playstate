import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  metadataBase: new URL('https://playstate.app'),
  title: 'PLAYSTATE · Eight Outdoor Sports & AI Match Kit Planner',
  description: 'An outdoor sports storefront built with Next.js, Express, Python LangChain & LangGraph, GSAP, Lenis, and Framer Motion. 16 curated equipment concepts across eight outdoor disciplines.',
  keywords: ['outdoor sports', 'cricket', 'football', 'hockey', 'basketball', 'tennis', 'volleyball', 'golf', 'badminton', 'match kit', 'langgraph', 'langchain'],
  authors: [{ name: 'Playstate Athletics' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'PLAYSTATE · Outdoor Sports & AI Match Planner',
    description: '16 curated equipment concepts across eight outdoor disciplines with real-time AI kit strategist.',
    url: 'https://playstate.app',
    siteName: 'PLAYSTATE',
    images: [
      {
        url: '/assets/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Playstate outdoor athletic equipment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#1d2924',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-[#f7f6f0] text-[#1d2924] antialiased selection:bg-[#e3ff76] selection:text-[#1d2924]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
