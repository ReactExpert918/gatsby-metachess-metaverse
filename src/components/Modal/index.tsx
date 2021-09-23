import React, { Component, createRef } from 'react';

interface IProps {
  children: JSX.Element;
  onClose: () => void;
  isTopLeft?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
}

class Modal extends Component<IProps> {
  modalRef = createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('click', this.handleDivClick as any)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDivClick as any)
  }

  handleDivClick = (e: any) => {
    if (this.modalRef.current.contains(e.target)) {
      return;
    }
    this.props.onClose();
  }

  render() {
    return (
      <div className={`modal ${this.props.isTopLeft && 'top-left'} ${this.props.withShadow && 'with-shadow'} ${this.props.withBorder && `border3`}`}>
        <div ref={this.modalRef}>
          {this.props.children}
        </div>
      </div>
    )
  }
};

export default Modal;