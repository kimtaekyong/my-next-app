import { ReactNode } from "react";
import Link from "next/link";
import "../styles/globals.css";
import "../styles/style.css";

// 기본 레이아웃 컴포넌트
export default async function RootLayout({ children }: { children: ReactNode }) {
  const resp = await fetch("http://localhost:9999/topics/");
  const topics = await resp.json();

  // 콘솔에 출력
  console.log("page/layout.js/topics", topics);
  return (
    <html>
      <body className="bg-gray font-Pretendard">
        <div
          id="wrap"
          className="max-w-[1200px] h-[100vh] mx-auto flex items-center justify-center flex-col text-white text-center"
        >
          <div>
            <ol className="flex">
              {topics.map((topic: { body: string; id: number; title: string }) => {
                return (
                  <li key={topic.id}>
                    <Link className="text-xl" href={`/read/${topic.id}`}>
                      {topic.title}
                    </Link>
                  </li>
                );
              })}
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
