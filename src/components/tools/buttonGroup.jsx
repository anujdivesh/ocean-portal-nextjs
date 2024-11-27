"use client" // client side rendering 
import React, { useState,useRef,useEffect } from 'react';
import {Row,Col,Container,Button} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks'
import '@/components/css/workbench.css';
import { setDataset } from '@/app/GlobalRedux/Features/dataset/dataSlice';
import { hideModal,showModaler } from '@/app/GlobalRedux/Features/modal/modalSlice';
import { setAccordion } from '@/app/GlobalRedux/Features/accordion/accordionSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaSearch } from "react-icons/fa";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { setBounds,updateMapLayer, removeMapLayer } from '@/app/GlobalRedux/Features/map/mapSlice';
import { showoffCanvas, hideoffCanvas  } from '@/app/GlobalRedux/Features/offcanvas/offcanvasSlice';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { VscTools } from "react-icons/vsc";
import { IoIosAddCircleOutline,IoMdRemoveCircleOutline } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import BottomOffCanvas from './bottom_offcanvas';
import ColorScale from './color_scale';
import Legend from './legend';
import Opacity from './opacity';
import { get_url } from '@/components/json/urls';

function ButtonGroupComp({item}) {
    const isVisible = useAppSelector((state) => state.offcanvas.isVisible);
    const dispatch = useAppDispatch();
    const mapLayer = useAppSelector((state) => state.mapbox.layers);

    const fetchData = async (id) => {
      try {
        const response = await fetch(get_url('metadata',id)); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        dispatch(setDataset(result));
        //setData(result);
      } catch (error) {
        //setError(error);
      }
    };
    const removeLayerById = (item) => {
        dispatch(removeMapLayer({ id: item.id }));
    };
    const handleShow = () => {
        dispatch(showoffCanvas())
      };

      const handleUpdateLayer = (id, updates) => {
        dispatch(updateMapLayer({ id, updates }));
      };
    
      const idealZoom = (item) => {

        handleUpdateLayer(item.id, {
          layer_information: {
            ...item.layer_information,
            zoomToLayer:true // Updated value
          }
        });

       /* const newBounds = {
            northEast: { lat: item.bounding_box[0].northBoundLatitude, lng:  item.bounding_box[0].eastBoundLongitude }, // Example coordinates
            southWest: { lat: item.bounding_box[0].southBoundLatitude, lng: item.bounding_box[0].westBoundLongitude },
          };
          dispatch(setBounds(newBounds));*/
    };


return(
    <Row>
    <ButtonGroup size="sm"  style={{ marginLeft: 0,marginTop:-16}}> 
      <Button  variant="success" style={{fontSize:'12px',borderRadius:0 }}
          onClick={() => {
            dispatch(setAccordion(item.id));
            fetchData(item.id);
           
            dispatch(showModaler());
          }}>METADATA</Button>
     
      <Button variant="secondary" style={{ borderRadius: 0, fontSize: '12px' }}
          onClick={() => idealZoom(item)}> IDEAL ZOOM</Button>
    
    <Dropdown style={{borderRadius:0}}>
      <Dropdown.Toggle className="custom-dropdown-button" variant="warning" id="dropdown-basic" style={{borderRadius:0, fontSize: '12px',color:'white'}}>
      ACTIONS
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item eventkey="1"  onClick={() => removeLayerById(item)} style={{borderRadius:0,fontSize:'12px'}}><FaRegTrashCan size={15}/>&nbsp;Remove</Dropdown.Item>
      <Dropdown.Item eventkey="1"  onClick={handleShow}  style={{borderRadius:0,fontSize:'12px'}}> {isVisible ? <IoMdRemoveCircleOutline size={18} color='red'/> : <IoIosAddCircleOutline size={18} color='green'/>} Utilities</Dropdown.Item>
     
      </Dropdown.Menu>
  </Dropdown>
    </ButtonGroup>
    </Row>
)
}
export default ButtonGroupComp;