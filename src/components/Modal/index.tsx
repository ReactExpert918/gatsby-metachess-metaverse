import React, { Component, createRef } from "react";
import CloseIcon from "../../assets/images/CloseIcon.svg";

interface IProps {
  children: JSX.Element;
  onClose: () => void;
  isTopLeft?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
  withCloseIcon?: boolean;
}

class Modal extends Component<IProps> {
  modalRef = createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener("click", this.handleDivClick as any);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDivClick as any);
  }

  handleDivClick = (e: any) => {
    if (this.modalRef.current.contains(e.target)) {
      return;
    }
    this.props.onClose();
  };

  render() {
    return (
      <div
        className={`modal ${this.props.isTopLeft && "top-left"} ${
          this.props.withShadow && "with-shadow"
        } ${this.props.withBorder && `border3`}`}
      >
        <div ref={this.modalRef} className="modal-wrapper">
          <div className="close-icon" onClick={this.props.onClose}>
            <img src={CloseIcon} />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
