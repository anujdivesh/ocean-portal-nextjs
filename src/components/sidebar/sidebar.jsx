"use client" // client side rendering 
import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { useAppSelector, useAppDispatch, useAppStore } from '@/app/GlobalRedux/hooks'
import { hideModal,showModaler } from '@/app/GlobalRedux/Features/modal/modalSlice';
import MyWorkbench from '../tools/workbench';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { setDataset } from '@/app/GlobalRedux/Features/dataset/dataSlice';
import { setAccordion } from '@/app/GlobalRedux/Features/accordion/accordionSlice';
import { showsideoffCanvas, hidesideoffCanvas  } from '@/app/GlobalRedux/Features/sideoffcanvas/sideoffcanvasSlice';
import SideOffCanvas from '../tools/side_offcanvas';
const ExploreModal = dynamic(() => import('@/components/tools/model'), {ssr: false})

const SideBar = () => {
    const _isMounted = useRef(true);

    const handleShowCanvas = () => {
      dispatch(showsideoffCanvas())
    };
    const isVisiblecanvas = useAppSelector((state) => state.sideoffcanvas.isVisible);

    //const [showModal, setShowModal] = useState(false);
    const isVisible = useAppSelector((state) => state.modal.isVisible);
    const dispatch = useAppDispatch();
    

    const handleShow = () => {
      dispatch(setAccordion(''))
      dispatch(setDataset([]))
      dispatch(showModaler())
      //setShowModal(true)
    };
    const handleClose = () => {
      dispatch(hideModal())
      //setShowModal(false)
    };

  
  
  
  /*
    useEffect(() => {  
      if (_isMounted.current){
        console.log('sidebar mounted')
      }  
      return () => { _isMounted.current = false }; 
      },[]);
      */

  return (
    <div style={{marginRight:'5px',marginLeft:'5px'}}>
        <Row  style={{paddingTop:'10px'}}>
        <Col md={12}>
        <select className="form-select rounded-pill w-100" aria-label="Default select example" defaultValue={"0"}>
          <option value="0">Search for locations</option>
          <option value="1">Fiji</option>
          <option value="2">Tonga</option>
          <option value="3">Samoa</option>
        </select>
        </Col>
        </Row>
        
      <Row style={{paddingTop:'10px'}}>
        <Col md={7}>
        <button type="button" className="btn btn-primary btn-sm rounded-pill w-100" style={{padding:'8px', marginLeft:'5px'}} onClick={handleShow}><IoIosAddCircleOutline size={20}/>&nbsp;Explore Map Data</button>
        </Col>
        <Col md={5} style={{marginRight:0}}>
          <Button variant="btn btn-info btn-sm rounded-pill" className="w-100"  style={{padding:'8px',color:'white'}}  onClick={handleShowCanvas} ><IoInformationCircleOutline size={20} />Info</Button>
        </Col>
      </Row>
      <Row style={{paddingTop:10,marginRight:-10,marginLeft:-8}}>
        <MyWorkbench/>
      </Row>
      <SideOffCanvas isVisible={isVisiblecanvas}/>
      <ExploreModal
       show={isVisible} 
       onClose={handleClose} 
       title="Data Catalogue" 
       bodyContent="This is the modal body content." 
       />
    </div>
  );
};

export default SideBar;
