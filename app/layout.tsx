import "./globals.css";
// 注意：这里删掉了 import TopBar ...
import BottomNav from "@/components/shared/BottomNav"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black antialiased no-scrollbar">
        {/* 这里不要放 <TopBar /> */}
        
        <main className="min-h-screen relative">
          {children}
        </main>
        
        <BottomNav />
      </body>
    </html>
  );
}