import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main className="app-shell">
          <div className="stage">{children}</div>
        </main>
      </body>
    </html>
  );
}
