import React from "react"
import "./Modal.scss"

const Modal = ({ isOpen, onClose, modalElements, modalOptions }) => {
  if (!isOpen) return null

  const headerStyle = {
    backgroundColor: modalOptions?.headerBackgroundColor,
    color: modalOptions?.headerTextColor || "#000",
  }

  const handleBackdropClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header" style={headerStyle}>
          <h2 className="modal-title">{modalElements.title}</h2>

          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <h3 className="modal-subtitle">{modalElements.subtitle}</h3>
        <p className="modal-text">{modalElements.text}</p>
        {modalElements.htmlElement}
      </div>
    </div>
  )
}

export default Modal
