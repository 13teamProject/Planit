import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps<T> {
  fetchItems: (page: number) => Promise<T[]>;
  initialPage?: number;
  pageSize?: number;
}

export function useInfiniteScroll<T>({
  fetchItems,
  initialPage = 1,
  pageSize = 10,
}: UseInfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const loadItems = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newItems = await fetchItems(page);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setHasMore(newItems.length >= pageSize);
      setPage((prevPage) => prevPage + 1);
    } finally {
      setLoading(false);
    }
  }, [page, fetchItems, loading, hasMore, pageSize]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadItems();
      }
    });
    if (endRef.current) observer.current.observe(endRef.current);
    return () => observer.current?.disconnect();
  }, [loadItems, hasMore, loading]);

  return { items, endRef, loading, hasMore };
}
