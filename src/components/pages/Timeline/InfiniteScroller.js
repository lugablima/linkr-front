import InfiniteScroll from "react-infinite-scroller";
import LoadingTailSpin from "../../../libs/LoadingTailSpin";
import { useInfiniteScrollContext } from "../../../contexts/InfiniteScrollContext";

export default function InfiniteScroller({ children, loadMore }) {
  const { hasMore } = useInfiniteScrollContext();

  return (
    <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMore} loader={<LoadingTailSpin key={0} />}>
      {children}
    </InfiniteScroll>
  );
}
