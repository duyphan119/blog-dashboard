import { AxiosResponse } from "axios";
import { publicApi } from ".";

const name = "upload";

const uploadApi = {
  uploadSingle: (
    formData: FormData
  ): Promise<AxiosResponse<{ secure_url: string }>> =>
    publicApi.post(`${name}/single`, formData),
};

export default uploadApi;
