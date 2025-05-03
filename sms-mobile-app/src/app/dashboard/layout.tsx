// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="flex flex-col h-full">
          <main className="flex-1 overflow-y-auto pb-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}