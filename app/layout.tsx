import './globals.css'

export const metadata = {
  title: 'Tcorps Hub',
  description: 'Personal web development portfolio and collaborations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
