"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function Control() {
  const params = useParams();
  const pathname = usePathname(); // 현재 경로를 가져옵니다.
  const id = params.id;

  return (
    <ul className="flex gap-x-5">
      {/* pathname !== "/create":
        현재 페이지의 경로 (pathname)가 "/create"와 다를 때.
        즉, 사용자가 /create 경로가 아닌 다른 경로 (/, /about, /contact 등)에 있을 때 이 조건이 참이 됩니다.
        !id:

        id가 null, undefined, 또는 빈 문자열("")일 때. 즉, id가 존재하지 않을 때 이 조건이 참이 됩니다. */}
      {pathname !== "/create" && !id && (
        <li
          className="px-10 py-4 text-lg font-nomal rounded-lg w-full"
          style={{ background: "#0064FF", cursor: "pointer", color: "#ffffff" }}
        >
          <Link href="/create" style={{ color: "#ffffff", textDecoration: "none" }}>
            작성하기
          </Link>
        </li>
      )}
      {/* id가 있을 때만 Update와 Delete 버튼을 보여줍니다. */}
      {id && (
        <>
          <li>
            <Link href={`/`}>메인으로</Link>
          </li>
          <li>
            <Link href={`/update/${id}`}>수정</Link>
          </li>
          <li>
            <input type="button" value="삭제" />
          </li>
        </>
      )}
    </ul>
  );
}
