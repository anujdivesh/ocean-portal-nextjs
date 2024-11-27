import React,{useState} from 'react';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks'
import { addMapLayer, removeMapLayer,updateMapLayer } from '@/app/GlobalRedux/Features/map/mapSlice';
import '@/components/css/input.css'


function ColorScale({item }) {
    
  const [colormin, setColorMin] = useState("-100");
  const [colormax, setColorMax] = useState("-100");
  const [legend,setLegend] = useState(item.layer_information.legend_url);
  const dispatch = useAppDispatch();

  const handleUpdateLayer = (id, updates) => {
    dispatch(updateMapLayer({ id, updates }));
  };

  const removeLayerById = (item) => {
    dispatch(removeMapLayer({ id: item.id }));
};

const handleChangemin = (event,item) => {
  setColorMin( event.target.value)

  const updatedObject = {
    ...item,
    layer_information: {
      ...item.layer_information,
      colormin: event.target.value // Updated value
    }
  };
  handleUpdateLayer(item.id, {
    layer_information: {
      ...item.layer_information,
      colormin: event.target.value,
      zoomToLayer:false // Updated value // Updated value
    }
  });
  //removeLayerById(item)
  //dispatch(addMapLayer(updatedObject));

  event.currentTarget.blur()
};


const handleChangemax = (event,item) => {
setColorMax( event.target.value)
handleUpdateLayer(item.id, {
  layer_information: {
    ...item.layer_information,
    colormax: event.target.value // Updated value
  }
});

  /*
  const updatedObject = {
    ...item,
    layer_information: {
      ...item.layer_information,
      colormax: event.target.value // Updated value
    }
  };
  removeLayerById(item)
  dispatch(addMapLayer(updatedObject));*/

  event.currentTarget.blur()
};

const rowStyle = {
  display: 'flex',
  flexDirection: 'row', // Align items horizontally
  justifyContent: 'space-between', // Adjust alignment as needed
  gap: '1px', // Space between items, optional
};

const itemStyle = {
  fontSize:12,
  flex: '1', // Allow items to grow equally, optional
};


return(
  <>
    <div className="row" style={{marginTop:'-5px',marginLeft:-5}}>
    <div className="col-sm-4">
    <p style={{marginTop:4, fontSize:13}}>Color Scale:</p> </div>
     <div className="col-sm-6">
     <div style={rowStyle}>
        <div style={{ fontSize:12,flex:1,paddingTop:5}}>Min:</div>
        <div style={{ fontSize:12,flex:1, width:20,marginLeft:-15}}><input type="email" className="form-control form-control-sm rounded-pill" id="colFormLabelSm" style={{borderRadius:0}} placeholder="min" onChange={(e) => handleChangemin(e,item)} value={colormin == "-100" ? item.layer_information.colormin : colormin}/>
     </div>
        <div style={{ fontSize:12,flex:1,paddingTop:5,paddingLeft:5}}>Max:</div>
        <div style={{ fontSize:12,flex:1,width:20,marginLeft:-15}}> <input type="email" className="form-control form-control-sm rounded-pill" id="colFormLabelSm" style={{borderRadius:0}} placeholder="max" onChange={(e) => handleChangemax(e,item)} value={colormax == "-100" ? item.layer_information.colormax : colormax}/></div>
      </div>
     </div>
    </div>
      <div className="row" style={{marginTop:'5px',marginLeft:-5}}>
      <div className="col-sm-4">
  <p style={{fontSize:13}}>Legend:</p> </div>
    <div className="col-sm-7">
    <img src={item.layer_information.legend_url} alt="Description of image" style={{ width: '50px', height: 'auto' }} />
      </div>
      </div>
      </>
)
}
export default ColorScale;