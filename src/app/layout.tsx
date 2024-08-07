import { ReactNode } from "react";
import Link from "next/link";
import "../styles/globals.css";
import "../styles/style.css";

// 기본 레이아웃 컴포넌트
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="bg-gray font-Pretendard">
        <div
          id="wrap"
          className="max-w-[1200px] h-[100vh] mx-auto flex items-center justify-center flex-col text-white text-center"
        >
          <div>
            <ol className="flex gap-x-[12px]">
              <li>
                <Link href="/read/1">HTML</Link>
              </li>
              <li>
                <Link href="/read/2">CSS</Link>
              </li>
            </ol>
          </div>
          <main className="py-[12px]">{children}</main>
          <div>
            <ul className="flex gap-x-[12px]">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/create">Create</Link>
              </li>
              <li>
                <Link href="/Update">Update</Link>
              </li>
              <li>
                <button>Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
