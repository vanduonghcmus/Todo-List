import { notification } from "antd";

const openNotification = (type, message) => {
  switch (type) {
    case "success":
      notification[type]({
        message: message,
        duration: 1,
      });
      break;
    case "error":
      notification[type]({
        message: message,
        duration: 2,
      });
      break;
    default: {
      return null;
    }
  }
};
export default openNotification;
