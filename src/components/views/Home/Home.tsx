import { Skeleton } from "@nextui-org/react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";
import HomeEvent from "./HomeEvent";
import HomeCategoryList from "./HomeCategoryList";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      ></HomeSlider>
      <HomeEvent
        title="Featured Event"
        events={dataFeaturedEvents}
        isLoading={isLoadingFeaturedEvents}
      />
      <Skeleton
        isLoaded={!isLoadingBanners}
        className="mb-16 h-[20vw] rounded-2xl"
      >
        <Image
          src={dataBanners && dataBanners?.data[0]?.image}
          alt="banner"
          className="h-[20vw] w-full rounded-2xl object-cover object-center"
          width={1920}
          height={800}
        />
      </Skeleton>
      <HomeEvent
        title="Latest Event"
        events={dataLatestEvents}
        isLoading={isLoadingLatestEvents}
      />
      <HomeCategoryList categories={dataCategories?.data} isLoading={isLoadingCategories}/>
    </div>
  );
};

export default Home;
