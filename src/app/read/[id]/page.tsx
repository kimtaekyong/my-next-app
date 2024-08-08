// Read 페이지의 주요 콘텐츠
export default async function Read(props: { params: { id: number } }) {
  const id = props.params.id;
  const resp = await fetch(`http://localhost:9999/topics/${id}`);
  const topic = await resp.json();

  console.log(topic);

  return (
    <>
      <h2 className="text-4xl font-bold">{topic.title}</h2>
      <p>{topic.body}</p>
    </>
  );
}
