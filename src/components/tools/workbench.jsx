"use client" // client side rendering 
import React, { useState,useRef,useEffect } from 'react';
import {Col, Card, Button, Form} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks'
import '@/components/css/workbench.css';
import ButtonGroupComp from './buttonGroup';
import BottomOffCanvas from './bottom_offcanvas';
import ColorScale from './color_scale';
import Legend from './legend';
import Opacity from './opacity';
import DateSelector from './date_selector';
import { addMapLayer, removeMapLayer,updateMapLayer } from '@/app/GlobalRedux/Features/map/mapSlice';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CheckBox from './checkbox';
import RangeSlider from './range_slider';

const MyWorkbench = () => {
  const dispatch = useAppDispatch();

  function CustomToggle({ children, eventKey, disableClick }) {
    const [expanded, setExpanded] = useState(false);
  
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      setExpanded(!expanded);
    });
  
    return (
      <div
        onClick={disableClick ? null : decoratedOnClick}
        style={{
          display: 'flex',
          alignItems: 'center',
        justifyContent: 'space-between', // Aligns items at the start and end
          cursor: 'pointer',
          marginTop:-22,
          paddingLeft:30,
          fontSize:14
        }}
      >
      
      <span>{children}</span>
      {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    );
  }
  


    const isVisible = useAppSelector((state) => state.offcanvas.isVisible);
    const mapLayer = useAppSelector((state) => state.mapbox.layers);
    const _isMounted = useRef(true);


    useEffect(() => {  
        if (_isMounted.current){

        }  
        return () => { _isMounted.current = false }; 
        },[mapLayer]);


    return (
        <>
        {mapLayer.length === 0 ? (
              
              <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'100px'}}>
              <div className="item" style={{color:'grey'}}>Your Workbench is empty</div>
              </div>
          ) : 
          (
          
        <Col md={12} style={{marginTop:-13,overflowY:'auto'}}>
            <hr style={{marginRight:-10,marginLeft:-12}}/>
            <p style={{fontSize:'12px',marginTop:'-10px'}}>DATA SETS ( {mapLayer.length} )</p>
            <hr style={{marginTop:-10,marginRight:-10,marginLeft:-12}}/>
            {
            mapLayer.map((item) => (
                <Accordion key={item.id} defaultActiveKey={""}>
                  <Card eventkey={item.id} style={{ borderRadius: 0 }} >
                  <Card.Header onClick={(e) => e.currentTarget.blur()} disabled={true}>
                    <CheckBox item={item}/>
                     
                  <CustomToggle eventkey={item.id}> {item.layer_information.layer_title}</CustomToggle>
                  
                    </Card.Header>
                    <Accordion.Collapse eventkey={item.id}>
                    <Card.Body style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <ButtonGroupComp item={item}/>
                      
                      <Opacity item={item} id={item.id}/>

                      {item.layer_information.is_timeseries ? (
                        <RangeSlider item={item}/>
                       
                    ) : (
                      <DateSelector item={item} period={'daily'} startDateStr={item.layer_information.timeIntervalStart} endDateStr={item.layer_information.timeIntervalEnd}/>
                    
                    )}
                       <ColorScale 
                          item={item}
                        />

                     {/* <Legend url={item.layer_information.legend_url}/>*/}
                   

                      <BottomOffCanvas isVisible={isVisible} />
                   
                    </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              ))              
            }
        </Col>
        
)}
</>
);
}

  
  export default MyWorkbench;
  