import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import "./Modal.scss"

/**
 * Modal component for displaying overlay dialogs with customizable header and content.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Determines whether the modal is open.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {Object} props.modalElements - Elements to display in the modal.
 * @param {string} props.modalElements.title - Modal title text.
 * @param {string} props.modalElements.subtitle - Modal subtitle text.
 * @param {string} props.modalElements.text - Optional plain text message.
 * @param {React.ReactNode} props.modalElements.htmlElement - Optional custom HTML or JSX to render.
 * @param {Object} [props.modalOptions] - Optional style and layout options.
 * @param {string} [props.modalOptions.headerBackgroundColor] - Header background color.
 * @param {string} [props.modalOptions.headerTextColor] - Header text color.
 * @param {string} [props.modalOptions.backdropColor] - Backdrop background color.
 * @param {boolean} [props.modalOptions.shadowed=true] - Whether to apply a shadow to the modal.
 * @param {number} [props.fadeDuration=3000] - Duration of the fade animation in ms.
 *
 * @example
 * <Modal
 *   isOpen={true}
 *   onClose={handleClose}
 *   modalElements={{
 *     title: "Success",
 *     subtitle: "Employee created",
 *     text: "Employee John Doe has been added.",
 *     htmlElement: <p>Custom HTML here</p>
 *   }}
 *   modalOptions={{
 *     headerBackgroundColor: "lightgreen",
 *     headerTextColor: "#000",
 *     backdropColor: "rgba(0, 0, 0, 0.5)",
 *     shadowed: true
 *   }}
 *   fadeDuration={500}
 * />
 */
const Modal = ({
  isOpen,
  onClose,
  modalElements,
  modalOptions = {},
  fadeDuration = 300,
}) => {
  const [visible, setVisible] = useState(isOpen)
  const [fadeState, setFadeState] = useState("fade-in")

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      setFadeState("fade-in")
    } else {
      setFadeState("fade-out")
      const timer = setTimeout(() => setVisible(false), fadeDuration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, fadeDuration])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!visible) return null

  const headerStyle = {
    backgroundColor: modalOptions.headerBackgroundColor,
    color: modalOptions.headerTextColor,
  }

  return (
    <div
      className={`modal-backdrop ${fadeState}`}
      style={{
        backgroundColor: modalOptions.backdropColor || "rgba(0,0,0,0.7)",
        transitionDuration: `${fadeDuration}ms`,
      }}
      onClick={(e) => {
        if (e.target.className.includes("modal-backdrop")) {
          onClose()
        }
      }}
    >
      <div
        className={`modal-content ${
          modalOptions.shadowed !== false ? "shadowed" : ""
        }`}
        style={{ transitionDuration: `${fadeDuration}ms` }}
      >
        <div className="modal-header" style={headerStyle}>
          <h2 className="modal-title">{modalElements.title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <h3 className="modal-subtitle">{modalElements.subtitle}</h3>
        {modalElements.text && (
          <p className="modal-text">{modalElements.text}</p>
        )}
        <div className="modal-htmlElement">{modalElements.htmlElement}</div>
        <button className="modal-button-close" onClick={onClose} style={headerStyle}>
          {modalElements.closeButtonText || "Close"}
        </button>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modalElements: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    htmlElement: PropTypes.node,
    closeButtonText:PropTypes.string,
  }).isRequired,
  modalOptions: PropTypes.shape({
    headerBackgroundColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    backdropColor: PropTypes.string,
    shadowed: PropTypes.bool,
  }),
  fadeDuration: PropTypes.number,
}

export default Modal
