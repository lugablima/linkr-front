import { createContext, useContext, useState } from "react";

const InfiniteScrollContext = createContext();

export const useInfiniteScrollContext = () => useContext(InfiniteScrollContext);

export default function InfiniteScrollProvider({ children }) {
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  function stopInfiniteScroll() {
    setHasMore(false);
  }

  function incrementOffset() {
    setOffset(offset + 10);
  }

  function resetInfiniteScroll() {
    setOffset(0);
    setHasMore(true);
  }

  return (
    <InfiniteScrollContext.Provider value={{ offset, hasMore, incrementOffset, stopInfiniteScroll, resetInfiniteScroll }}>
      {children}
    </InfiniteScrollContext.Provider>
  );
}
