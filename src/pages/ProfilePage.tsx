import { UpdateProfileDTO } from "@/api/auth.api";
import { Author } from "@/api/author.api";
import { Paper } from "@/components";
import { FooterForm } from "@/components/forms";
import { Input } from "@/components/inputs";
import { useDocumentTitle } from "@/hooks";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthor } from "@/redux/slice/auth.slice";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};

const ProfilePage: FC<Props> = () => {
  useDocumentTitle("Thông tin tài khoản");

  // const appDispatch = useAppDispatch();

  const profile = useAppSelector(selectAuthor) as Author;

  const initialValues: UpdateProfileDTO = {
    name: profile.name,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateProfileDTO>({
    defaultValues: initialValues,
  });

  console.log("profile", profile);

  const onSubmit: SubmitHandler<UpdateProfileDTO> = async (values) => {
    try {
      console.log(values);
      // const response = await authApi.updateProfile(values);
      // const { data } = response.data;
      // if (data) {
      //   toastSuccess("Cập nhật thành công");
      //   appDispatch(setAuthor(data));
      // }
    } catch (error) {}
  };

  return (
    <Paper title="Thông tin tài khoản">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-4"
      >
        <div className="col-span-12">
          <Input
            label="Họ tên"
            error={errors.name?.message ?? ""}
            register={register("name", {
              required: {
                value: true,
                message: "Họ tên không được để trống",
              },
            })}
          />
        </div>
        <div className="col-span-12">
          <FooterForm
            onCancel={() => reset(initialValues)}
            submitLoading={isSubmitting}
          />
        </div>
      </form>
    </Paper>
  );
};

export default ProfilePage;