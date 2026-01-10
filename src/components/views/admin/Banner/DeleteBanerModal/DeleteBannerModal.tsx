import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchBanner: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = props;

  const {
    isPendingMutateDeleteBanner,
    mutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  } = useDeleteBannerModal();

  useEffect(() => {
    if(isSuccessMutateDeleteBanner) {
        onClose(),
        refetchBanner()
        setSelectedId("")
    }
  }, [isSuccessMutateDeleteBanner])

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Banner</ModalHeader>
        <ModalBody>
          <p className="text-medium font-bold">
            Are you sure you want to delete this banner?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteBanner}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteBanner}
            onPress={() => mutateDeleteBanner(selectedId)}
          >
            {isPendingMutateDeleteBanner ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Banner"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
