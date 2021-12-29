import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const modalRoot = document.querySelector('#modal-root');

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 12px;
  right: 28px;
  padding: 0;
  border: none;
  color: #fff;
  background-color: transparent;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  
  :hover {
    color: #303f9f;
  }
`;

const ModalWrapper = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    fullSize: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  handleClick = () => {
    this.props.onClose();
  };

  render() {
    const { fullSize, name } = this.props;
    return createPortal(
      <OverlayWrapper onClick={this.handleBackdropClick}>
        <ModalWrapper>
          <img src={fullSize} alt={name} />
        </ModalWrapper>
        <ButtonClose
          type="button"
          onClick={this.handleClick}
        >
          <AiOutlineCloseCircle style={{ width: 36, height: 36 }} />
        </ButtonClose>
      </OverlayWrapper>,
      modalRoot,
    );
  }
}

export default Modal;