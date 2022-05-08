import { useState } from "react";
import ReviewList from "./ReviewList";
import mockItems from "../mock.json";

function App() {
  // 정렬 방법
  const [items, setItems] = useState(mockItems);
  // 버튼을 클릭했을 때 정렬 기준
  const [order, setOrder] = useState("");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    // id 와 같지 않는(제외한) 배열의 요소들로만 새로운 배열을 생성하고
    // items 가 새로운 배열로 변경 되고 nextItems 가 바로 그 배열이다.
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>베스트순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
