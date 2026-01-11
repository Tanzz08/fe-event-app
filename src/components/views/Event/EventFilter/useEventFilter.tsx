import CategoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string().required("Please input category"),
  isPublish: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
});

const useEventFilter = () => {
  const { control, reset, watch, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryServices.getCategories(),
  });

  return {
    control,
    dataCategory,
  };
};

export default useEventFilter;
