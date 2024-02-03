import { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";



const StaticModal = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    useEffect(()=>{
        setShow(show => props.show);
    },[props.show])
    return <Fragment>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Havelsan AŞ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>

};


export default StaticModal;