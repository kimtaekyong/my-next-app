// Read 페이지의 주요 콘텐츠
export default function Read(props: { params: { id: string | number } }) {
  return (
    <>
      <h2 className="text-4xl font-bold">READ</h2>
      <p>Parameters: {props.params.id}</p>
    </>
  );
}
