import Button from 'react-bootstrap/Button';

import {default as ModalExt} from 'react-bootstrap/Modal';
export const Modal = ({ show, closeCall, formFinish, title, children }) => {
    //var {show, closeCall, formFinish, title} = props;
    return (
        <ModalExt show={show} onHide={closeCall}>
        <ModalExt.Header closeButton>
          <ModalExt.Title>{title}</ModalExt.Title>
        </ModalExt.Header>
        <ModalExt.Body>{children}</ModalExt.Body>
        <ModalExt.Footer>
          <Button variant="secondary" onClick={closeCall}>
            Close
          </Button>
          <Button variant="primary" onClick={formFinish}>
            save
          </Button>
        </ModalExt.Footer>
      </ModalExt>
    )
}
