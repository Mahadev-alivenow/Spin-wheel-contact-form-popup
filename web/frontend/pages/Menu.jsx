// import React, { useState } from 'react'
// import { Modal, ModalContent, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
// import { ModalIframe } from '@shopify/app-bridge/actions/Modal';

// function Menu() {
//   	const [modalOpen, setModalOpen] = useState(false);
//   return (
//     <>
//       <button onClick={() => shopify.modal.show("my-modal")}>Open Modal</button>
//       {/* <Modal id="my-modal"> */}
//       <ModalContent id="my-modal">
//         <p>Message</p>
//         <TitleBar title="My Modal">
//           <button onClick={() => setModalOpen(false)}>Label</button>
//         </TitleBar>
//       </ModalContent>
//       {/* </Modal> */}
//     </>
//   );
// }

// export default Menu


import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";
export default function Menu() {
  const shopify = useAppBridge();

  useEffect(() => {
    function handleMessageFromModal(ev) {
      console.log("Message received in main app:", ev.data);
    }

    window.addEventListener("message", handleMessageFromModal);
    return () => {
      window.removeEventListener("message", handleMessageFromModal);
    };
  }, []);

  const openModal = async () => {

    await shopify.modal.show("my-modal");
    sendMessageToModal("Hello from the main app");
  };

  const sendMessageToModal = (message) => {
    document
      .getElementById("my-modal")
      .contentWindow.postMessage(message, location.origin);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal id="my-modal" src="/my-route">
        <TitleBar title="Title">
          <button variant="primary">Label</button>
          <button onClick={() => shopify.modal.hide("my-modal")}>Label</button>
        </TitleBar>
      </Modal>
    </>
  );
}

// export default Menu
