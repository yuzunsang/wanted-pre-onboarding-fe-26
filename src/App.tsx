import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getMockData } from "./mock/getMockData";
import type { MockData } from "./mock/getMockData";
import LoadingSpinner from "./lib/loadingSpinner";

function App() {
  const [pageNum, setPageNum] = useState(0); // 현재 페이지
  const [loadedData, setLoadedData] = useState<MockData[]>([]); // 불러온 데이터
  const [isLoading, setIsLoading] = useState(false); // 로딩중
  const [isEnd, setIsEnd] = useState(false); // 페이지의 끝
  const targetRef = useRef<HTMLDivElement>(null); // 무한 스크롤의 trigger 지점 마킹

  // trigger가 되었을 때 함수 실행
  useEffect(() => {
    const container = targetRef.current;

    if (!container) return;

    const options = {
      rootMargin: "0px",
      thresold: 1,
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && !isEnd) {
        setPageNum((prevNum) => prevNum + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container); // 컴포넌트가 언마운트되면 Observer 해제
      }
    };
  }, [isEnd]);

  // 데이터 불러오기
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!isMounted) return;
      const { datas, isEnd: endOfPage } = await getMockData(pageNum);

      if (isMounted) {
        setLoadedData((prevState) => [...prevState, ...datas]);
        setIsEnd(endOfPage);
      }
    }

    (async () => {
      setIsLoading(true);
      await loadData();
      setIsLoading(false);
    })();

    return () => {
      isMounted = false;
    };
  }, [pageNum]);

  return (
    <>
      <div className="container">
        <div className="info-section">
          {loadedData?.map((item, idx) => (
            <div key={`${idx}_${item.productId}`} className="info-item">
              <h3>상품명: {item.productName}</h3>
              <h5>구매일: {item.boughtDate}</h5>
              <span>상품 가격: ${item.price}</span>
            </div>
          ))}
          {isLoading && <LoadingSpinner />}
          {isEnd && <p>마지막 상품입니다!</p>}
        </div>
      </div>
      <div ref={targetRef} />
    </>
  );
}

export default App;
