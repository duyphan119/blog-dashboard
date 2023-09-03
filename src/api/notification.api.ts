import client from "@/config/apolloClient";
import { ApolloQueryResult, FetchResult, gql } from "@apollo/client";

export type Notification = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  type: string;
  refId: string;
  seen: boolean;
};

export type Notifications = {
  notifications: Notification[];
  count: number;
  totalPages: number;
};

export type NotificationsResponse = {
  notifications: Notifications;
};

export type NotificationParams = Partial<{
  limit: number;
  p: number;
  sortBy: string;
  sortType: string;
  keyword: string;
}>;

export type NotificationsInput = {
  notificationsInput: NotificationParams;
};

export type ReadNotificationsResponse = {
  readNotifications: boolean;
};

export const NOTIFICATIONS = gql`
  query Notifications($notificationsInput: NotificationsInput) {
    notifications(notificationsInput: $notificationsInput) {
      notifications {
        _id
        title
        seen
        createdAt
        type
        refId
      }
      totalPages
      count
    }
  }
`;

export const READ_NOTIFICATIONS = gql`
  mutation ReadNotifications($idList: [String]) {
    readNotifications(idList: $idList)
  }
`;

export const notificationApi = {
  notifications: async (
    params?: NotificationParams
  ): Promise<Notifications> => {
    try {
      const { data }: ApolloQueryResult<NotificationsResponse> =
        await client.query({
          query: NOTIFICATIONS,
          variables: {
            notificationsInput: params || {},
          },
        });
      if (data) {
        return data.notifications;
      }
    } catch (error) {}
    return {
      notifications: [],
      count: 0,
      totalPages: 0,
    };
  },
  readNotifications: async (idList: string[]): Promise<boolean> => {
    try {
      const { data }: FetchResult<ReadNotificationsResponse> =
        await client.mutate({
          mutation: READ_NOTIFICATIONS,
          variables: { idList },
        });
      if (data) return data.readNotifications;
    } catch (error) {}
    return false;
  },
};
