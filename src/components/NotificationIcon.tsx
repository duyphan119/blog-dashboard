import api from "@/api";
import { Notification } from "@/api/notification.api";
import { wsClient } from "@/config/apolloClient";
import { useComponentVisible } from "@/hooks";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/utils/constants";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BadgeNotification } from "./common";
import NotificationList from "./NotificationList";

type Props = {};

const NotificationIcon: FC<Props> = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isComponentVisible, ref, setIsComponentVisible } =
    useComponentVisible(false);

  const handleOpen = useCallback(() => {
    setIsComponentVisible((prevState) => !prevState);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { value } = await wsClient
          .iterate({
            query: `
            subscription Subscription {
              notificationAdded {
                _id
                createdAt
                title
                seen
                type
                refId
              }
            }
          `,
          })
          .next();
        const notification = value.data.notificationAdded;
        setNotifications((prevState) => [
          notification,
          ...prevState.filter((item) => item._id !== notification._id),
        ]);
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      const { notifications } = await api.notification.notifications({
        limit: DEFAULT_LIMIT,
        p: DEFAULT_PAGE,
      });
      setNotifications(notifications);
    })();
  }, []);

  const hasNotification = useMemo(
    () =>
      notifications.find((notification) => !notification.seen) ? true : false,
    [notifications]
  );

  return (
    <>
      <div className="relative" ref={ref}>
        <BadgeNotification hide={!hasNotification}>
          <IoMdNotificationsOutline
            className="h-6 w-6 text-navy cursor-pointer"
            onClick={handleOpen}
          />
        </BadgeNotification>
        {isComponentVisible ? (
          <NotificationList notifications={notifications} />
        ) : null}
      </div>
    </>
  );
};

export default NotificationIcon;
