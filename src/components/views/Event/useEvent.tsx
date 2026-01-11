import useChangeUrl from "@/hooks/useChangeUrl";
import EventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
  const router = useRouter();
  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,
  } = useChangeUrl();

  const getEvents = async () => {
    // Pastikan baris ini benar menggunakan '&'
    let params = `limit=${currentLimit}&page=${currentPage}&category=${currentCategory}&isFeatured=${currentIsFeatured}&isPublish=true&isOnline=${currentIsOnline}`;

    const res = await EventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: [
      "Events",
      currentPage,
      currentLimit,
      currentCategory,
      currentIsFeatured,
      currentIsOnline,
    ],
    queryFn: () => getEvents(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });
  return {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
  };
};

export default useEvent;
