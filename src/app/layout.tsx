import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Word Cloud',
  description: 'Em uma palavra, o que significou pra você?',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        background: '#09061a',
        color: '#fff',
        overflowX: 'hidden',
      }}>
        {children}
      </body>
    </html>
  )
}