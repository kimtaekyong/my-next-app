"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Read(props: { params: { id: string } }) {
  const [topic, setTopic] = useState<{ deadName: string; Name: string; contant: string; created_at: string } | null>(
    null
  );
  const router = useRouter();
  const id = props.params.id;

  useEffect(() => {
    const loadTopic = async () => {
      const firstId = id || "1"; // 첫 번째 ID를 기본값으로 설정
      const resp = await fetch(`http://localhost:9999/topics/${firstId}`, { cache: "no-store" });
      const data = await resp.json();
      setTopic(data);

      // 만약 새로고침 후 첫 번째 ID로 리다이렉트하려면 아래 코드 사용
      if (id !== firstId) {
        router.replace(`/read/${firstId}`);
      }
      console.log(`Redirecting from /read/${id} to /read/${firstId}`); // 로그 추가
    };
    loadTopic();
  }, [id, router]);

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-4xl font-bold"></h2>
      <div className="flex gap-x-3">
        <p className="flex-1">작성자 : {topic.Name}</p>
        <p className="flex-1">고인명 : {topic.deadName}</p>
      </div>
      <div className="bg-white p-6 rounded-xl	">
        <p className="text-[#1f1f1f]">{topic.contant}</p>
      </div>
      <div>작성 시간: {new Date(topic.created_at).toLocaleString()}</div>
    </>
  );
}
