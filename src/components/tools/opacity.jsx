import React,{useState} from 'react';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks'
import { addMapLayer, removeMapLayer,updateMapLayer } from '@/app/GlobalRedux/Features/map/mapSlice';
import { Modal,Row,Col, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
function Opacity({ item,id}) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(1);
  const handleUpdateLayer = (id, updates) => {
    dispatch(updateMapLayer({ id, updates }));
  };

  const handleChange = (event,item) => {
    setValue(parseFloat(event.target.value));
    const updatedObject = {
      ...item,
      layer_information: {
        ...item.layer_information,
        opacity: event.target.value // Updated value
      }
    };
    handleUpdateLayer(item.id, {
      layer_information: {
        ...item.layer_information,
        opacity: event.target.value,
        zoomToLayer:false // Updated value
      }
    });

    event.currentTarget.blur()
  };


return(
          <Row className="g-0" style={{marginTop:'3px',marginLeft:5}} key={id}>
  <Col md={4}>
  <p style={{fontSize:13, paddingTop:8}}>Opacity:</p> 
</Col>
<Col md={5}> 
  <input type="range" style={{fontSize:13}} className="form-range" onClick={(e) => e.currentTarget.blur()} min={0} max={1} step={0.1} id="refreshButton" value={value} onChange={(e) => handleChange(e,item)}/>

  </Col>
  <Col md={2}>

  <p style={{fontSize:12,paddingTop:5,paddingLeft:3}}>{value*100}%</p>
  </Col>
    </Row>
  
)
}
export default Opacity;