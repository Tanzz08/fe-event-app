import { ToasterContext } from "@/contexts/ToasterContext";
import BannerServices from "@/services/banner.service copy";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteBanner = async (id: string) => {
    const res = await BannerServices.deleteBanner(id);
    return res;
  };

  const {
    mutate: mutateDeleteBanner,
    isPending: isPendingMutateDeleteBanner,
    isSuccess: isSuccessMutateDeleteBanner,
  } = useMutation({
    mutationFn: deleteBanner,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Banner Success",
      });
    },
  });

  return {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  };
};

export default useDeleteBannerModal;
