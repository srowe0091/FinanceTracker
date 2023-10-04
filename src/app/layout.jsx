import { Providers } from './Providers'

const RootLayout = async ({ children }) => {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" type="image/png" href="/icon-192.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Track your finances" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
