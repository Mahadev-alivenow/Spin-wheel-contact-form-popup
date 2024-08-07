import { useState } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";

function MyModal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      <Modal id="my-modal" open={modalOpen}>
        <p>Message</p>
        <TitleBar title="My Modal">
          <button onClick={() => setModalOpen(false)}>Label</button>
        </TitleBar>
      </Modal>
    </>
  );
}

export default MyModal