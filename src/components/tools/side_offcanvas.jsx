import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { showsideoffCanvas, hidesideoffCanvas  } from '@/app/GlobalRedux/Features/sideoffcanvas/sideoffcanvasSlice';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks';

function SideOffCanvas({isVisible}) {
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(hidesideoffCanvas())
      };
return(
    <Offcanvas show={isVisible} onHide={handleClose} placement="end" className="offcanvas-end" backdrop={true} scroll={true}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Saving Workbench Layers</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      To Save workbench layers click on the button below. This will allow the application to rememeber selected layers and it will be displayed when the application is initialized.
     <br/><br/>
      <Button variant="btn btn-primary btn-sm rounded-pill" className="w-100"  style={{padding:'8px',color:'white'}}  >Save Workbench</Button>
        
    </Offcanvas.Body>
  </Offcanvas>
)
}
export default SideOffCanvas;