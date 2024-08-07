import { useEffect } from "react";
export function MyRoute() {
  useEffect(() => {
    function handleMessageFromMainApp(ev) {
      console.log("Message received in modal:", ev.data);
    }

    window.addEventListener("message", handleMessageFromMainApp);
    return () => {
      window.removeEventListener("message", handleMessageFromMainApp);
    };
  }, []);

  const sendMessageToMainApp = (message) => {
    window.opener.postMessage(message, location.origin);
  };

  return (
    <button onClick={() => sendMessageToMainApp("Hello from the modal")}>
      Send message
    </button>
  );
}
