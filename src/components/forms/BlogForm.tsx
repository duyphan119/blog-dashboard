import { FC, useEffect, useMemo, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbPhotoPlus } from "react-icons/tb";
import { ButtonUpload } from "../buttons";
import { Editor, Input } from "../inputs";
import FooterForm from "./FooterForm";
import { ModalCategory } from "../modals";
import {
  Blog,
  CreateBlogDTO,
  CreateBlogInput,
  CreateBlogResponse,
  CREATE_BLOG,
  UpdateBlogInput,
  UpdateBlogResponse,
  UPDATE_BLOG,
} from "@/api/blog.api";
import { Category } from "@/api/category.api";
import { useMutation } from "@apollo/client";
import { toastError, toastSuccess } from "@/config/toastify";
import { selectAccessToken } from "@/redux/slice/auth.slice";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  categories: Category[];
  item: Blog | null;
};
const BlogForm: FC<Props> = ({ categories, item }) => {
  const accessToken = useAppSelector(selectAccessToken);
  const option = {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  };
  const [createBlog, dataCreated] = useMutation<
    CreateBlogResponse,
    CreateBlogInput
  >(CREATE_BLOG, option);
  const [updateBlog, dataUpdated] = useMutation<
    UpdateBlogResponse,
    UpdateBlogInput
  >(UPDATE_BLOG, option);

  const [uploadLoading, startTransition] = useTransition();
  const [thumbnail, setThumbnail] = useState(item?.thumbnail ?? "");
  const [open, setOpen] = useState(false);

  const initialValues = useMemo<CreateBlogDTO>(
    () => ({
      title: item?.title ?? "",
      thumbnail: item?.thumbnail ?? "",
      categoryIds: item?.categoryIds ?? [],
      content: item?.content ?? "",
    }),
    [item]
  );

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm<CreateBlogDTO>({
    defaultValues: initialValues,
  });

  const handleSelectCategories = (ids: string[]) => {
    setValue("categoryIds", ids);
  };

  const onSubmit: SubmitHandler<CreateBlogDTO> = async (values) => {
    if (item) {
      updateBlog({
        variables: {
          updateBlogInput: {
            id: item._id,
            ...values,
            thumbnail,
          },
        },
      });
    } else {
      createBlog({
        variables: {
          createBlogInput: { ...values, thumbnail },
        },
      });
    }
    // setSubmitLoading(true);
    // try {
    //   const response = await (item
    //     ? blogApi.updateOne(item.id, formData)
    //     : blogApi.createOne(formData));
    //   const { data } = response.data;
    //   if (data) {
    //     reset(initialValues);
    //     toastSuccess(item ? "Sửa thành công" : "Thêm thành công");
    //   }
    // } catch (error) {
    // } finally {
    //   setSubmitLoading(false);
    // }
  };

  useEffect(() => {
    if (dataCreated.data?.createBlog) {
      reset(initialValues);
      toastSuccess("Thêm thành công");
    }
  }, [dataCreated.data]);

  useEffect(() => {
    if (dataUpdated.data?.updateBlog) {
      reset(initialValues);
      toastSuccess("Sửa thành công");
    }
  }, [dataUpdated.data]);

  useEffect(() => {
    if (dataCreated.error) {
      toastError("Thêm không thành công");
    }
  }, [dataCreated.error]);

  useEffect(() => {
    if (dataUpdated.error) {
      toastError("Sửa không thành công");
    }
  }, [dataUpdated.error]);

  const loading = isSubmitting || dataCreated.loading || dataUpdated.loading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-12">
      <div className="col-span-12">
        <Input
          label="Tiêu đề"
          register={register("title", {
            required: { value: true, message: "Tiêu đề không được để trống" },
          })}
          error={errors.title?.message || ""}
          required={true}
          disabled={loading}
        />
      </div>

      <div className="col-span-12">
        <Input label="Ảnh bìa" disabled={loading}>
          <ButtonUpload
            onSuccess={(url) => {
              startTransition(() => {
                setThumbnail(url);
              });
            }}
            className="flex flex-col items-center justify-center h-48 w-full border-2 text-3xl text-black border-dashed border-black cursor-pointer rounded-[3px]"
            disabled={loading}
          >
            {thumbnail ? (
              <img
                alt="thumbnail"
                src={thumbnail}
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <TbPhotoPlus />
                <div className="">{uploadLoading ? "Đang tải..." : ""}</div>
              </>
            )}
          </ButtonUpload>
        </Input>
      </div>
      <div className="col-span-12">
        <Input label="Danh mục bài viết">
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="bg-orange text-white px-4 py-2 rounded-[3px]"
              onClick={() => setOpen(true)}
              disabled={loading}
            >
              Xem danh mục
            </button>
            <div>Đã chọn: {getValues("categoryIds").length}</div>
          </div>
        </Input>
        {open ? (
          <ModalCategory
            open={open}
            onClose={() => setOpen(false)}
            categories={categories}
            title="Chọn danh mục bài viết"
            selectedIds={getValues("categoryIds")}
            onOk={handleSelectCategories}
          />
        ) : null}
      </div>
      <div className="col-span-12">
        <Input label="Nội dung bài viết">
          <Editor
            value={getValues("content")}
            onChange={(value) => setValue("content", value)}
          />
        </Input>
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

export default BlogForm;
