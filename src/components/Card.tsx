import { MockData } from "../mock/getMockData";
import "./card.css";

export default function Card({ item }: { item: MockData }) {
  return (
    <div className="card">
      <h3>상품명: {item.productName}</h3>
      <h5>구매일: {item.boughtDate}</h5>
      <span>상품 가격: ${item.price}</span>
    </div>
  );
}
