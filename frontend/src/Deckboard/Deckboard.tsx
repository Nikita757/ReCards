import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

export default function Deckboard() {
  const params = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "20px",
    },
  };

  return (
    <div>
      Deckboardd <div>{params.id}</div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        style={modalStyle}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <form action="">
          <input type="text" name="cardQuestion" />
          <input type="text" name="cardAnswer" />

          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
}
