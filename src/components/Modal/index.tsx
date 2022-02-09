import React, { Component, createRef } from "react";
import Draggable from "react-draggable";
import CloseIcon from "../../assets/images/CloseIcon.svg";

interface IProps {
  children: JSX.Element;
  onClose: () => void;
  isTopLeft?: boolean;
  withShadow?: boolean;
  draggable?: boolean;
  withBorder?: boolean;
  withCloseIcon?: boolean;
  notShowClose?: boolean;
}

class Modal extends Component<IProps> {
  constructor(props: any) {
    super(props);
  }
  modalRef = createRef<HTMLDivElement>();

  // componentDidMount() {
  //   document.addEventListener("click", this.handleDivClick as any);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("click", this.handleDivClick as any);
  // }

  // handleDivClick = (e: any) => {
  //   if (this.modalRef.current.contains(e.target)) {
  //     return;
  //   }
  //   console.log(e);
  //   this.props.onClose();
  // };
  modal() {
    return (
      <div ref={this.modalRef} className="modal-wrapper">
        {this.props.children}
        {!this.props.notShowClose && <div className="close-icon btn-clickable" onClick={this.props.onClose}>
          <img src={CloseIcon} />
        </div>}
      </div>
    );
  }
  render() {
    return (
      <div
        className={`modal ${this.props.isTopLeft && "top-left"} ${this.props.withShadow && "with-shadow"
          } ${this.props.withBorder && `border3`}`}
      >
        {this.props.draggable ? (
          <Draggable cancel=".btn-clickable">{this.modal()}</Draggable>
        ) : (
          this.modal()
        )}
      </div>
    );
  }
}

export default Modal;
