// components/TopicList.tsx
"use client"; // 클라이언트 사이드에서만 사용

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 현재 경로를 가져오기 위한 훅

// Topic 인터페이스 정의
interface Topic {
  body: string;
  id: string;
  title: string;
}

// TopicListProps 타입 정의
interface TopicListProps {
  topics: Topic[]; // Topic 객체 배열을 props로 받음
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  const pathname = usePathname(); // 현재 경로를 가져오는 훅

  // 클릭된 항목의 ID를 상태로 관리
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 클릭 이벤트 핸들러
  const handleClick = (id: string) => {
    setSelectedId(id);
  };

  // 특정 페이지에서는 렌더링하지 않음
  // pathname이 "/create"인 경우, 컴포넌트를 렌더링하지 않고 null을 반환
  if (pathname === "/create" || pathname === "/") {
    return null; // 특정 페이지에서 렌더링을 건너뜀
  }

  // 현재 경로가 "/create"가 아닌 경우, 주어진 topics 배열을 리스트로 렌더링
  return (
    <div>
      <ol className="flex gap-x-2">
        {/* topics 배열을 map 함수로 순회하여 리스트 항목을 생성 */}
        {topics.map((topic, index) => (
          <li key={topic.id}>
            {/* 각 토픽의 제목을 링크로 표시 */}
            <Link
              onClick={() => handleClick(topic.id)}
              className={`text-xl ${selectedId === topic.id ? "text-[#0064FF]" : "text-white"} ${
                index === 0 && selectedId === null ? "text-[#0064FF]" : ""
              }`}
              href={`/read/${topic.id}`}
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopicList;
