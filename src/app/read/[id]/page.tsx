// Read 페이지의 주요 콘텐츠
export default async function Read(props: { params: { id: string } }) {
  const id = props.params.id;
  const resp = await fetch(`http://localhost:9999/topics/${id}`, { cache: `no-store` });
  const topic = await resp.json();

  return (
    <>
      <h2 className="text-4xl font-bold">{topic.title}</h2>
      <p>{topic.body}</p>
    </>
  );
}
