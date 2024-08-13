"use client"; // 클라이언트 측에서만 실행되는 컴포넌트로 전환합니다. useEffect, useState, onSubmit 등의 클라이언트 전용 훅과 기능을 사용할 수 있습니다.

import { useRouter } from "next/navigation"; // Next.js의 useRouter 훅을 사용하여 페이지 이동 및 라우터 관련 기능을 제공합니다.

export default function Create() {
  const router = useRouter(); // useRouter 훅을 통해 라우터 객체를 가져옵니다. 페이지 이동 및 리프레시와 같은 라우팅 관련 작업을 수행할 수 있습니다.

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault(); // 폼 제출 시 페이지 리로드와 같은 기본 동작을 방지합니다.

        const form = evt.target as HTMLFormElement; // 이벤트의 타겟을 HTMLFormElement로 캐스팅하여 폼 요소에 접근합니다.
        const { title, body } = form.elements as any; // 폼 요소에서 title과 body 입력 필드를 가져옵니다.
        const createTitle = (title as HTMLInputElement).value; // title 입력 필드의 값을 문자열로 가져옵니다.
        const createContent = (body as HTMLTextAreaElement).value; // body 입력 필드의 값을 문자열로 가져옵니다.

        // 서버에서 현재 존재하는 토픽들을 가져와서 새로운 ID를 생성하기 위한 기준으로 사용합니다.
        const getTopicsResp = await fetch("http://localhost:9999/topics/");
        const topics = await getTopicsResp.json(); // 서버의 응답을 JSON 형태로 파싱합니다.

        // 기존 토픽의 ID 값들을 숫자로 변환하여 배열로 만듭니다.
        const ids = topics.map((topic: { id: any }) => parseInt(topic.id, 10));
        // ID 배열이 비어 있지 않으면 가장 큰 ID를 찾고, 비어 있으면 기본값 0을 사용합니다.
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        // 새 ID를 기존 최대 ID + 1로 설정합니다. 숫자로 변환 후 문자열로 변환합니다.
        const newId = (maxId + 1).toString();

        // 새로 생성된 토픽을 서버에 전송합니다.
        const resp = await fetch("http://localhost:9999/topics/", {
          method: "POST", // POST 요청 방식으로 데이터를 전송합니다.
          headers: {
            "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시합니다.
          },
          body: JSON.stringify({ id: newId, title: createTitle, body: createContent }), // 새로 생성된 ID와 입력된 제목 및 내용을 JSON 문자열로 변환하여 요청 본문에 포함합니다.
        });

        const topic = await resp.json(); // 서버의 응답을 JSON으로 파싱하여 토픽 객체로 저장합니다.

        // 생성된 토픽의 ID를 사용하여 해당 토픽의 상세 페이지로 이동합니다.
        console.log("file: page.js:19 ~ Create ~ topic:", topic); // 생성된 토픽의 내용을 콘솔에 출력하여 디버깅합니다.
        router.push(`/read/${topic.id}`); // 새로 생성된 토픽의 ID를 URL에 포함시켜 상세 페이지로 이동합니다.
        router.refresh(); // 페이지를 새로 고쳐 최신 데이터를 반영합니다.
      }}
      style={{ width: "480px" }} // 폼의 너비를 480px로 설정합니다.
    >
      <h1 className="text-2xl font-bold mb-4">남기고 싶은 이야기를 남겨주세요.</h1> {/* 폼의 제목을 설정합니다. */}
      <p>
        <input
          type="text"
          name="title"
          placeholder="제목을 작성해주세요" // 제목 입력 필드에 플레이스홀더를 설정합니다.
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
          placeholder="남기고 싶은 이야기를 남겨주세요." // 내용 입력 필드에 플레이스홀더를 설정합니다.
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
        <input
          type="submit"
          value="생성" // 제출 버튼의 텍스트를 설정합니다.
          className="p-5 w-full" // 제출 버튼의 스타일을 설정합니다.
          style={{ background: "#0064FF", cursor: "pointer" }} // 제출 버튼의 배경색과 커서를 포인터로 설정하여 클릭할 수 있음을 명시합니다.
        />
      </p>
    </form>
  );
}
