import { LIMIT_BANNER, PAGE_DEFAULT } from "@/constants/list.constants";
import BannerServices from "@/services/banner.service copy";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

    const res = await BannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners"],
    queryFn: () => getBanners(),
  });

  return {
    dataBanners,
    isLoadingBanners,
  };
};

export default useHome;
