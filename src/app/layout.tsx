import { ReactNode } from "react";
import "./globals.css";
import "./style.css";

// 기본 레이아웃 컴포넌트
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="bg-gray">
        <div
          id="wrap"
          className="max-w-[1200px] h-[100vh] mx-auto flex items-center justify-center flex-col text-white text-center gap-y-[12px]"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
