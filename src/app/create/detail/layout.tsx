import { ReactNode } from "react";

// 레이아웃 컴포넌트는 ReactNode 타입의 children을 받아서 반환합니다.
export default function DetailLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* children을 통해 페이지별 콘텐츠가 렌더링됩니다. */}
      <main>{children}</main>
    </div>
  );
}
