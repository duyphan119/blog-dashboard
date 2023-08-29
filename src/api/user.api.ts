export type User = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isAdmin: boolean;
};

const name = "user";

const userApi = {};

export default userApi;
