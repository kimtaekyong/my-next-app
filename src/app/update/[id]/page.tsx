"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(props: { params: { id: any } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const id = props.params.id;

  // 데이터 가져오기 함수
  async function refresh() {
    const resp = await fetch(`http://localhost:9999/topics/${id}`);
    const topic = await resp.json();
    setTitle(topic.title);
    setBody(topic.body);
  }

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    refresh();
  }, [id]);

  // 폼 제출 처리 함수
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    // 폼 요소에서 입력값 추출
    const formData = new FormData(evt.currentTarget);
    const updatedTitle = formData.get("title") as string;
    const updatedBody = formData.get("body") as string;

    // 서버에 PATCH 요청 보내기
    const resp = await fetch(`http://localhost:9999/topics/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle, body: updatedBody }), // JSON 객체로 변환
    });
    const topic = await resp.json();

    // 수정 완료 후 페이지 이동
    router.push(`/read/${topic.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "480px" }}>
      <h2 className="text-2xl font-bold mb-4">텍스트를 수정해주세요.</h2>
      <p>
        <input
          type="text"
          name="title"
          placeholder="제목을 작성해주세요" // 제목 입력 필드에 플레이스홀더를 설정합니다.
          value={title} // 현재 제목 값을 입력 필드에 설정합니다.
          onChange={(e) => setTitle(e.target.value)} // 입력값 변경 시 상태 업데이트
          className="font-bold mb-2 text-base" // 입력 필드의 스타일을 설정합니다.
          style={{
            width: "100%", // 입력 필드의 너비를 100%로 설정하여 폼의 너비에 맞춥니다.
            height: "52px", // 입력 필드의 높이를 52px로 설정합니다.
            padding: "0 12px", // 입력 필드의 내부 여백을 설정합니다.
            background: "none", // 배경을 없애서 디자인을 간소화합니다.
            border: "1px solid #eee", // 입력 필드의 테두리를 설정합니다.
            outline: "none", // 입력 필드 포커스 시 기본 아웃라인을 제거합니다.
          }}
        />
      </p>
      <p>
        <textarea
          name="body"
          value={body} // 현재 본문 값을 텍스트 영역에 설정합니다.
          onChange={(e) => setBody(e.target.value)} // 입력값 변경 시 상태 업데이트
          style={{
            width: "100%", // 텍스트 영역의 너비를 100%로 설정하여 폼의 너비에 맞춥니다.
            height: "200px", // 텍스트 영역의 높이를 200px로 설정합니다.
            padding: "12px", // 텍스트 영역의 내부 여백을 설정합니다.
            background: "none", // 배경을 없애서 디자인을 간소화합니다.
            border: "1px solid #eee", // 텍스트 영역의 테두리를 설정합니다.
            outline: "none", // 텍스트 영역 포커스 시 기본 아웃라인을 제거합니다.
            resize: "none", // 텍스트 영역 크기 조절을 비활성화합니다.
          }}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="수정" className="p-5 w-full" style={{ background: "#0064FF", cursor: "pointer" }} />
      </p>
    </form>
  );
}
