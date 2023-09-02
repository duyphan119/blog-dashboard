import { authApi } from "./auth.api";
import { blogApi } from "./blog.api";
import { categoryApi } from "./category.api";
import { contactApi } from "./contact.api";
import { notificationApi } from "./notification.api";
import { pageApi } from "./page.api";

export default {
  blog: blogApi,
  category: categoryApi,
  page: pageApi,
  auth: authApi,
  notification: notificationApi,
  contact: contactApi,
};
