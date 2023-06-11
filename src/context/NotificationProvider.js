import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");

  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);

    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-red-500");
    }

    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed -right-20 top-20 bg-red-500 max-w-sm -translate-x-1/2 shadow-md shadow-gray-400 rounded flash">
          <p
            className={
              classes +
              " text-white px-4 py-2 rounded font-semibold text-xl w-full"
            }
          >
            {notification}
          </p>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
