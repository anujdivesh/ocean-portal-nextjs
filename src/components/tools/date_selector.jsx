import React,{useState,useEffect,useRef} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '@/components/css/datepicker.css';
import { setBounds,updateMapLayer, removeMapLayer } from '@/app/GlobalRedux/Features/map/mapSlice';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks';
import {getDateFromArray, formatDateToISOWithoutMilliseconds,getDay} from '@/components/tools/helper';

function DateSelector({item,period,startDateStr,endDateStr}) {
  const dispatch = useAppDispatch();
  const _isMounted = useRef(true);
    const [startDate, setStartDate] = useState(startDateStr);
    const [endDate, setEndDate] = useState(endDateStr);
    const dateArray = useRef();
    var spec = item.layer_information.specific_timestemps;


    const [currentDate, setCurrentDate] = useState();

      const today = new Date();
      const [startDate2, setStartDate2] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    
      const handleUpdateLayer = (id, updates) => {
        dispatch(updateMapLayer({ id, updates }));
      };

      // Function to handle date changes
      const handleChange = (date,item) => {
        if (item.layer_information.datetime_format === 'MONTHLY'){
          if (spec !== ""){
            var date = getDateFromArray(dateArray.current,date.getFullYear(), date.getMonth()+1);
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}.000Z`;
            var day = getDay(dateArray.current,date.getFullYear(), date.getMonth()+1)
           // console.log(dateArray.current,date.getFullYear(), date.getMonth(),day)
            setCurrentDate(date);
            //console.log(new Date(date.getFullYear(), date.getMonth(), day))
            
            handleUpdateLayer(item.id, {
              layer_information: {
                ...item.layer_information,
                timeIntervalStart:dateString,
                zoomToLayer:false // Updated value
              }
            });
          }
          else{
            setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
            handleUpdateLayer(item.id, {
              layer_information: {
                ...item.layer_information,
                timeIntervalStart:formatDateToISOWithoutMilliseconds(new Date(date.getFullYear(), date.getMonth(), 1)),
                zoomToLayer:false // Updated value
              }
            });
          }
        }
        else{
            setCurrentDate(date)
            //setStartDate(date)
            
            handleUpdateLayer(item.id, {
              layer_information: {
                ...item.layer_information,
                timeIntervalStart:formatDateToISOWithoutMilliseconds(date),
                zoomToLayer:false // Updated value
              }
            });
            
      
        }
     //   console.log(date)
      };

      useEffect(() => {  
        if (_isMounted.current){

          if (item.layer_information.datetime_format === 'DAILY') {
            setStartDate(startDateStr)
            setEndDate(endDateStr)
            setCurrentDate(endDateStr)
          }
          else if (item.layer_information.datetime_format === 'MONTHLY') {
            var dateTimeArray;
            if (spec !== ""){
            dateTimeArray = spec.split(',').map(timestamp => new Date(timestamp.trim()));
            }
            dateArray.current = dateTimeArray;
            setStartDate(dateTimeArray[0])
            setEndDate(dateTimeArray[dateTimeArray.length - 1])
            setCurrentDate(dateTimeArray[0])
          }
          else if (item.layer_information.datetime_format === 'HOURLY') {
          }

        }  
        return () => { _isMounted.current = false }; 
        },[]);

  //new
  let content;
  if (item.layer_information.datetime_format === 'DAILY') {
    content = <DatePicker
    showIcon
    selected={currentDate}
    onChange={(date)=>handleChange(date,item)}
    minDate={startDate}
    maxDate={endDate}
    className="customInput rounded-pill"
    />;
  }else if (item.layer_information.datetime_format === 'SPECIFIC') {
    content = <DatePicker
    showIcon
    selected={dateTimeArray[0]}
    onChange={(date)=>handleChange(date,item)}
    includeDates={dateTimeArray}
    className="customInput rounded-pill"
    />;
  } else if (item.layer_information.datetime_format === 'MONTHLY') {
    content = 
    <DatePicker
    showIcon
        selected={currentDate}
        onChange={(date)=>handleChange(date,item)}
        dateFormat="yyyy/MM" // Display only month and year
        showMonthYearPicker // Show month and year picker
        showYearDropdown // Show year dropdown
        scrollableYearDropdown // Make the year dropdown scrollable
        yearDropdownItemNumber={15} // Number of years to display in dropdown
        minDate={startDate} // Set minimum date
        maxDate={endDate} // Set maximum date
        className="customInput rounded-pill"
      />;
  } 
  else if (period === 'HOURLY') {
    content =  <DatePicker
    showIcon
    selected={currentDate}
    onChange={(date)=>handleChange(date,item)}
    showTimeSelect
    timeIntervals={60}
    timeCaption="Hour"
    dateFormat="yyyy/MM/dd HH:00"
    timeFormat='HH:00'
    includeDates={dateTimeArray}
    className="customInput rounded-pill"
  />;
  } else {
    content = <div>Default Content</div>;
  }


  
return(
    <div className="row" style={{marginTop:'-5px',marginBottom:'8px'}}>
        <div className="col-sm-4">
        <p style={{fontSize:13,paddingLeft:5}}>Date Range:</p>
        </div>
        <div className="col-sm-6">
        {content}
    </div>
    </div>
)
}
export default DateSelector;