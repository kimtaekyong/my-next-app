import TopicList from "@/components/TopicList";
import { fetchTopics } from "@/data/DataControl";

// Main 페이지의 주요 콘텐츠
export default async function Main() {
  const topics = await fetchTopics();
  return (
    <>
      <div>
        {topics.length === 0 ? (
          <h2 className="text-2xl font-bold">등록된 게시물이 없습니다.</h2>
        ) : (
          <TopicList topics={topics} />
        )}
        {/* {<TopicList topics={topics} />는 React 컴포넌트를 사용하여 topics라는 프로퍼티를 TopicList라는 자식 컴포넌트에 전달하는 코드입니다.
          여기서 topics는 부모 컴포넌트에서 가져온 데이터로, TopicList 컴포넌트가 이를 사용하여 UI를 렌더링합니다.} */}
      </div>
    </>
  );
}
