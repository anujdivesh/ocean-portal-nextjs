import React,{useState} from 'react';
import {Col, Card, Button, Form} from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks'
import { addMapLayer, removeMapLayer,updateMapLayer } from '@/app/GlobalRedux/Features/map/mapSlice';

function CheckBox({ item}) {

    const [checked, setChecked] = useState(true);
    const dispatch = useAppDispatch();

    const handleUpdateLayer = (id, updates) => {
        dispatch(updateMapLayer({ id, updates }));
      };
    // Toggle checkbox state
    const handleCheckboxChange = (event,item) => {
      setChecked(!checked);
      handleUpdateLayer(item.id, {
        layer_information: {
          ...item.layer_information,
          enabled: event.target.checked // Updated value
        }
      });
    };


return(
    <Form.Check
    type="checkbox"
    id={`checkbox-${item.id}`}
    label={item.label} // Custom label or use item.label
    checked={checked}
    onClick={(e) => e.currentTarget.blur()}
    onChange={(e) => handleCheckboxChange(e,item)}
    style={{ marginRight: '1px',borderRadius:0,cursor:'pointer'}}
  />
  
)
}
export default CheckBox;