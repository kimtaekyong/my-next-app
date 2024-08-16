// components/TopicList.tsx
"use client"; // 클라이언트 사이드에서만 사용

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 현재 경로를 가져오기 위한 훅

// Topic 인터페이스 정의
interface Topic {
  title: string;
  created_at: string | number | Date;
  contant: string;
  id: string;
  deadName: string;
  Name: string;
}

// TopicListProps 타입 정의
interface TopicListProps {
  topics: Topic[]; // Topic 객체 배열을 props로 받음
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로를 가져오는 훅

  useEffect(() => {
    // URL에서 ID를 가져와서 초기 선택 상태를 설정합니다.
    const pathId = pathname.split("/").pop(); // `/read/${id}`에서 id를 추출
    setSelectedId(pathId || null);
  }, [pathname]);

  // 클릭된 항목의 ID를 상태로 관리
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 클릭 이벤트 핸들러
  const handleClick = (id: string) => {
    setSelectedId(id);
    router.push(`/read/${id}`); // 클릭 시 URL 업데이트
  };

  // 특정 페이지에서는 렌더링하지 않음
  // pathname이 "/create"인 경우, 컴포넌트를 렌더링하지 않고 null을 반환
  if (pathname === "/create") {
    return null; // 특정 페이지에서 렌더링을 건너뜀
  }

  // 현재 경로가 "/create"가 아닌 경우, 주어진 topics 배열을 리스트로 렌더링
  return (
    <>
      <h2 className="mb-12 text-3xl font-bold">온라인추모관</h2>
      <div style={{ borderTop: "1px solid #fff" }}>
        <ol className="gap-y-4">
          {/* topics 배열을 map 함수로 순회하여 리스트 항목을 생성 */}
          {topics.map((topic) => (
            <li className="w-full py-7 " key={topic.id} style={{ color: "white", borderBottom: "1px solid #fff" }}>
              {/* 각 토픽의 제목을 링크로 표시 */}
              <Link
                onClick={() => handleClick(topic.id)}
                className={`text-xl ${selectedId === topic.id ? "text-[#0064FF]" : ""}`}
                href={`/read/${topic.id}`}
              >
                <span className="flex justify-between">
                  <div className="flex gap-x-5">
                    <p className="font-bold text-xl">{topic.title}</p>
                    <p className="text-xl">{topic.Name}</p>
                  </div>
                  <div>{new Date(topic.created_at).toLocaleString()}</div>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default TopicList;
