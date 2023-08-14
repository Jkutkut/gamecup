import ModalBootstrap from 'react-bootstrap/Modal';
import { PropsWithChildren } from "react";
import { Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  onHide: () => void;
  title: String;
  confirmText: String;
  onConfirm: () => void;
  cancelText?: String;
  onCancel?: () => void;
}

const Modal = ({
  show,
  onHide,
  title,
  confirmText, onConfirm,
  cancelText, onCancel,
  children
}: PropsWithChildren<Props>) => {
  return (
    <ModalBootstrap
      show={show}
      onHide={onHide}
      keyboard={true}
    >
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title>{title}</ModalBootstrap.Title>
      </ModalBootstrap.Header>
      <ModalBootstrap.Body>
        {children}
      </ModalBootstrap.Body>
      <ModalBootstrap.Footer>
        <Button variant="secondary" onClick={onCancel || onHide}>
          {cancelText || 'Close'}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </ModalBootstrap.Footer>
    </ModalBootstrap>
  );
}

export default Modal;