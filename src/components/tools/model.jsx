"use client" // client side rendering 
import '@/components/css/modal.css'
import React, { useState } from 'react';
import { Modal, Button,Row,Col, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import MyAccordion from './accordion';
import SmallMap from '../map/small_map';
import AccordionMetadata from './accordion_metadata';

const ExploreModal = ({ show, onClose, title, bodyContent }) => {
    return (
      <Modal show={show} onHide={onClose} centered scrollable size='xl' className="custom-modal">
        <Modal.Header closeButton className="custom-header">
          <Modal.Title style={{fontSize:'18px'}}>   <Button variant="btn btn-primary btn-sm rounded-pill" className="w-100"  style={{padding:'8px',color:'white'}}>&nbsp;{title}&nbsp;</Button></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:"0%",marginRight:"auto", marginLeft:"auto",width:'100%'}}>
        <Row className="g-0">
        <Col md={4} className="scrollable-column" style={{backgroundColor:'#F8F8F8'}}>
    
       <MyAccordion className="scrollable-content"/>
        </Col>
        <Col md={8} className="scrollable-column"> 
        <AccordionMetadata/>
        
        </Col>
      </Row>
        </Modal.Body>
        <Modal.Footer className="custom-header">
         <p style={{fontSize:'12px', color:'grey'}}>All Rights Reserved SPC </p>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default ExploreModal;
  