import React from "react"
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
 * @param {string} [props.modalElements.text] - Optional plain text message.
 * @param {React.ReactNode} [props.modalElements.htmlElement] - Optional custom HTML or JSX to render.
 * @param {Object} [props.modalOptions] - Optional style and layout options.
 * @param {string} [props.modalOptions.headerBackgroundColor="#fff"] - Header background color.
 * @param {string} [props.modalOptions.headerTextColor="#000"] - Header text color.
 * @param {string} [props.modalOptions.backdropColor="rgba(0, 0, 0, 0.7)"] - Backdrop background color.
 * @param {boolean} [props.modalOptions.shadowed=true] - Whether to apply a shadow to the modal.
 *
 * @returns {JSX.Element|null} Rendered modal component or null if not open.
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
 * />
 */
const Modal = ({ isOpen, onClose, modalElements, modalOptions }) => {
  if (!isOpen) return null

  const mergedModalOptions = {
    headerBackgroundColor: "#fff",
    headerTextColor: "#000",
    backdropColor: "rgba(0, 0, 0, 0.7)",
    shadowed: true,
    ...modalOptions,
  }

  const headerStyle = {
    backgroundColor: mergedModalOptions.headerBackgroundColor,
    color: mergedModalOptions.headerTextColor,
  }

  /**
   * Handles click on the modal backdrop to close the modal.
   * Closes the modal only if the backdrop itself (not the content) is clicked.
   *
   * @param {React.MouseEvent<HTMLDivElement>} e - The mouse event from the click.
   */
  const handleBackdropClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      onClose()
    }
  }

  return (
    <div
      className="modal-backdrop"
      style={{ backgroundColor: mergedModalOptions.backdropColor }}
      onClick={handleBackdropClick}
    >
      <div
        className={`modal-content ${mergedModalOptions.shadowed ? "shadowed" : ""}`}
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
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modalElements: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    text: PropTypes.string,
    htmlElement: PropTypes.node,
  }).isRequired,
  modalOptions: PropTypes.shape({
    headerBackgroundColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    backdropColor: PropTypes.string,
    shadowed: PropTypes.bool,
  }),
}

export default Modal
