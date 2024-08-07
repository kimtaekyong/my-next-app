// Main 페이지의 주요 콘텐츠
export default function Main() {
  return (
    <>
      {/* 공통 네비게이션 바 */}
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/create">Create</a>
          </li>
          <li>
            <a href="/news">News</a>
          </li>
        </ul>
      </nav>
      <div className="text-center font-Pretendard text-white">
        <h2 className="text-2xl font-bold">Welcome</h2>
        <p className="text-xl">Hello, NextJS</p>
      </div>
    </>
  );
}
