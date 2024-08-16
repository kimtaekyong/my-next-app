"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault();

        const form = evt.target as HTMLFormElement;
        const { title, Name, deadName, contant } = form.elements as any;
        const createTitle = (title as HTMLInputElement).value;
        const createName = (Name as HTMLInputElement).value;
        const createdeadName = (deadName as HTMLInputElement).value;
        const createContent = (contant as HTMLTextAreaElement).value;

        if (!createTitle || !createName || !createdeadName || !createContent) {
          window.alert("제목과 내용을 모두 입력해주세요.");
          return;
        }

        const getTopicsResp = await fetch("http://localhost:9999/topics/");
        const topics = await getTopicsResp.json();

        const ids = topics.map((topic: { id: any }) => parseInt(topic.id, 10));
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        const newId = (maxId + 1).toString();

        const createTime = new Date().toISOString(); // 현재 시간을 ISO 형식으로 생성합니다.

        const resp = await fetch("http://localhost:9999/topics/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: newId,
            title: createTitle,
            Name: createName,
            deadName: createdeadName,
            contant: createContent,
            created_at: createTime, // 생성된 시간을 서버로 전송할 데이터에 추가합니다.
          }),
        });

        const topic = await resp.json();

        console.log("file: page.js:19 ~ Create ~ topic:", topic);
        router.push(`/read/${topic.id}`);
        router.refresh();
      }}
    >
      <h1 className="text-3xl font-bold mb-10">남기고 싶은 이야기를 남겨주세요.</h1>
      <div className="flex gap-x-4">
        <div className="flex-1">
          <p>
            <span className="block pl-3 mb-2 text-left">작성자</span>
            <input
              type="text"
              name="Name"
              placeholder="성함"
              className="font-bold mb-2 text-base"
              style={{
                width: "100%",
                height: "52px",
                padding: "0 12px",
                background: "none",
                border: "1px solid #eee",
                outline: "none",
              }}
            />
          </p>
        </div>
        <div className="flex-1">
          <p>
            <span className="block pl-3 mb-2 text-left">고인명</span>
            <input
              type="text"
              name="deadName"
              placeholder="고인명"
              className="font-bold mb-2 text-base"
              style={{
                width: "100%",
                height: "52px",
                padding: "0 12px",
                background: "none",
                border: "1px solid #eee",
                outline: "none",
              }}
            />
          </p>
        </div>
      </div>
      <p>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          className="font-bold mb-2 text-base"
          style={{
            width: "100%",
            height: "52px",
            padding: "0 12px",
            background: "none",
            border: "1px solid #eee",
            outline: "none",
          }}
        />
      </p>
      <p>
        <textarea
          name="contant"
          placeholder="남기고 싶은 이야기를 남겨주세요."
          style={{
            width: "100%",
            height: "200px",
            padding: "12px",
            background: "none",
            border: "1px solid #eee",
            outline: "none",
            resize: "none",
          }}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="생성" className="p-5 w-full" style={{ background: "#0064FF", cursor: "pointer" }} />
      </p>
    </form>
  );
}
