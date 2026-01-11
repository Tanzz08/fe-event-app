import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";

const EventFilter = () => {
  const { control, dataCategory } = useEventFilter();
  const { handleChangeCategory } = useChangeUrl();
  return (
    <div className="w-full rounded-xl border p-4 lg:sticky lg:top-20 lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Autocomplete
              {...field}
              defaultItems={dataCategory?.data.data || []}
              label="Category"
              variant="bordered"
              onSelectionChange={(value) => {
                onChange(value);
                handleChangeCategory(value !== null ? `${value}` : "");
              }}
              placeholder="Search Category here"
            >
              {(category: ICategory) => (
                <AutocompleteItem key={`${category._id}`}>
                  {category.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
          )}
        />
      </div>
    </div>
  );
};

export default EventFilter;
