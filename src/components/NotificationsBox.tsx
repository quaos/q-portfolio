import React from "../deps/react.ts";

export interface NotificationsBoxProps {
  data: string[];
}

export const NotificationsBox = ({ data }: NotificationsBoxProps) => {
  return (
    <div className="widget notifications-box">
      {data.map((noti: string) => <p className="notification-msg">{noti}</p>)}
    </div>
  );
};
