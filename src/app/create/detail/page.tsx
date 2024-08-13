import Link from "next/link";

// DetailPage 페이지의 주요 콘텐츠
export default async function DetailPage() {
  const resp = await fetch("http://localhost:9999/topics/", { cache: `no-store` });
  const topics = await resp.json();
  return (
    <div>
      <h1 className="text-4xl font-bold">DetailPage Page</h1>
      <p>생성 된 Creact Detail 페이지 입니다.</p>
      <ol className="flex gap-x-2">
        {topics.map((topic: { body: string; id: string; title: string }) => {
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
  );
}
