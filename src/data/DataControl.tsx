// data/DataControl.ts
export async function fetchTopics() {
  try {
    const resp = await fetch("http://localhost:9999/topics/", { cache: "no-store" });
    if (!resp.ok) {
      throw new Error(`Error fetching topics: ${resp.statusText}`);
    }
    const topics = await resp.json();
    return topics;
  } catch (error) {
    console.error(error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

// data/DataControl.ts
export async function fetchItem() {
  try {
    const resp = await fetch("http://localhost:9999/Item/", { cache: "no-store" });
    if (!resp.ok) {
      throw new Error(`Error fetching topics: ${resp.statusText}`);
    }
    const topics = await resp.json();
    return topics;
  } catch (error) {
    console.error(error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}
