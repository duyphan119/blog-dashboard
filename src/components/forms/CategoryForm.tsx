import {
  Category,
  CreateCategoryDTO,
  CreateCategoryInput,
  CreateCategoryResponse,
  CREATE_CATEGORY,
  UpdateCategoryInput,
  UpdateCategoryResponse,
  UPDATE_CATEGORY,
} from "@/api/category.api";
import { FooterForm } from "@/components/forms";
import { Input } from "@/components/inputs";
import { Select } from "@/components/selects";
import { toastError, toastSuccess } from "@/config/toastify";
import { MESSAGE_FAIL, MESSAGE_SUCCESS } from "@/utils/message";
import { useMutation } from "@apollo/client";
import { FC, useMemo, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type Props = {
  parents: Category[];
  item: Category | null;
};

const CategoryForm: FC<Props> = ({ parents, item }) => {
  const [createCategory, dataCreated] = useMutation<
    CreateCategoryResponse,
    CreateCategoryInput
  >(CREATE_CATEGORY);
  const [updateCategory, dataUpdated] = useMutation<
    UpdateCategoryResponse,
    UpdateCategoryInput
  >(UPDATE_CATEGORY);

  const initialValues = useMemo<CreateCategoryDTO>(
    () => ({
      name: item?.name ?? "",
      slug: item?.slug ?? "",
      parentId: item?.parentId ?? "",
    }),
    [item]
  );

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<CreateCategoryDTO>({
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<CreateCategoryDTO> = async (values) => {
    if (item) {
      updateCategory({
        variables: {
          updateCategoryInput: {
            ...values,
            id: item._id,
          },
        },
      });
    } else {
      createCategory({
        variables: {
          createCategoryInput: {
            name: values.name,
            parentId: values.parentId === "" ? null : values.parentId,
            ...(values.slug !== "" ? { slug: values.slug } : {}),
          },
        },
      });
    }
  };

  useEffect(() => {
    if (dataCreated.data?.createCategory) {
      reset(initialValues);
      toastSuccess(MESSAGE_SUCCESS.CREATE);
    }
  }, [dataCreated.data]);

  useEffect(() => {
    if (dataUpdated.data?.updateCategory) {
      toastSuccess(MESSAGE_SUCCESS.UPDATE);
    }
  }, [dataUpdated.data]);

  useEffect(() => {
    if (dataCreated.error) {
      toastError(MESSAGE_FAIL.CREATE);
    }
  }, [dataCreated.error]);

  useEffect(() => {
    if (dataUpdated.error) {
      toastError(MESSAGE_FAIL.UPDATE);
    }
  }, [dataUpdated.error]);

  const loading = isSubmitting || dataCreated.loading || dataUpdated.loading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-12">
      <div className="col-span-12">
        <Input
          label="Tên"
          register={register("name", {
            required: { value: true, message: "Tên không được để trống" },
          })}
          error={errors.name?.message || ""}
          required={true}
        />
      </div>
      <div className="col-span-12">
        <Input
          label="Slug"
          register={register("slug")}
          error={errors.slug?.message || ""}
        />
      </div>
      <div className="col-span-12">
        <Select
          label="Danh mục cha"
          register={register("parentId")}
          error={errors.parentId?.message || ""}
          options={[
            { value: "", label: "Chọn danh mục cha" },
            ...parents.map((category) => ({
              value: category._id,
              label: category.name,
            })),
          ]}
        />
      </div>
      <div className="col-span-12">
        <FooterForm
          submitLoading={loading}
          onCancel={() => reset(initialValues)}
        />
      </div>
    </form>
  );
};

export default CategoryForm;
