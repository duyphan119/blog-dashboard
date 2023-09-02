import { Notification } from "@/api/notification.api";
import { DATE_TIME_FORMAT } from "@/utils/constants";
import { ROUTES } from "@/utils/routes";
import { TITLES } from "@/utils/titles";
import moment from "moment";
import { FC, memo, useCallback } from "react";
import { Link } from "react-router-dom";

type Props = {
  notifications: Notification[];
};

const NotificationList: FC<Props> = ({ notifications }) => {
  const getHref = useCallback((notification: Notification) => {
    const { type, refId } = notification;
    switch (type) {
      case "contact":
        return `${ROUTES.CONTACTS}/${refId}`;
    }
    return "";
  }, []);

  return (
    <div className="absolute top-full right-0 w-72 bg-white border border-hr rounded-md">
      <h4 className="px-2 pt-2 pb-1 uppercase font-semibold">Thông báo</h4>
      <hr className="border-t-hr my-1" />
      <ul className={`pt-1 ${notifications.length > 0 ? "pb-1" : "pb-2"}`}>
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const href = getHref(notification);
            const className = "flex px-2 items-center";

            const content = (
              <div className="">
                <p className="">{notification.title}</p>
                <p className="text-sm">
                  {moment(notification.createdAt).format(DATE_TIME_FORMAT)}
                </p>
              </div>
            );

            return (
              <li
                className="hover:bg-teal hover:text-white"
                key={notification._id}
              >
                {href === "" ? (
                  <p className={className}>{content}</p>
                ) : (
                  <Link to={href} className={className}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })
        ) : (
          <li className="px-2">Không có thông báo</li>
        )}
      </ul>
      {notifications.length > 0 ? (
        <>
          <hr className="border-t-hr my-1" />
          <div className="">
            <Link
              to={ROUTES.NOTIFICATIONS}
              className="px-2 pb-1 flex justify-center hover:text-navy"
              title={TITLES.VIEW_NOTIFICATIONS}
            >
              Xem tất cả
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default memo(NotificationList);
