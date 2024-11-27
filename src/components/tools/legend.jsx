import React from 'react';

function Legend({url}) {
return(
    <div className="row" style={{marginTop:'5px'}}>
    <div className="col-sm-5">
<p style={{fontSize:13}}>Legend:</p> </div>
  <div className="col-sm-7">
  <img src={url} alt="Description of image" style={{ width: '50px', height: 'auto' }} />
    </div>
    </div>
)
}
export default Legend;