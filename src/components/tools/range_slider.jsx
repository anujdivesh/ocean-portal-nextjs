import React, { useEffect, useState, useRef } from 'react';
import { Modal,Row,Col, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import '@/components/css/slider.css'
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa'; 
import {roundToNearestSixHours, formatDateToISOWithoutMilliseconds,getWmsTimeDimension} from '@/components/tools/helper';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setBounds,updateMapLayer, removeMapLayer } from '@/app/GlobalRedux/Features/map/mapSlice';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks';
import Badge from 'react-bootstrap/Badge';

function RangeSlider({item}) { // Default value for the slider
    const sliderRef = useRef(0);
    const dispatch = useAppDispatch();
    const [playing, setPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const intervalRef = useRef(null); 
      //SLIDERR
      const timeIntervalStart = new Date(item.layer_information.timeIntervalStart);
      const timeIntervalEnd = new Date(item.layer_information.timeIntervalEnd);
    const [sliderValue, setSliderValue] = useState(timeIntervalStart);
      // Define the start and end dates for the slider
      const [startDate,setStartDate] = useState(new Date(item.layer_information.timeIntervalStart));
      const [endDate, setEndDate] = useState(new Date(item.layer_information.timeIntervalEnd));
      const [period, setPeriod] = useState(parseInt(item.layer_information.interval_step,10)*3600000);
     //const startDate = new Date(2024, 8, 12, 0, 0); // January 1, 2024, 00:00
    
      // Convert datetime to timestamp
      const dateToTimestamp = (date) => date.getTime();
      const timestampToDate = (timestamp) => new Date(timestamp);
    
      const minTimestamp = startDate.getTime()
      const maxTimestamp = endDate.getTime()
    
      const formatDate = (date) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
      };

      // Handle slider change event
  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const date = timestampToDate(value);
    setSliderValue(date);
   // console.log(`Slider value: ${formatDate(date)}`);
  };

  // Handle play button click
  const handlePlayClick = () => {
    if (!playing) {
      setPlaying(true);
      
      // Start the interval for updating the slider value periodically
      const id = setInterval(() => {
        if (sliderRef.current) {
          let newValue = parseInt(sliderRef.current.value, 10) + period;// Increment by the period
  
          console.log(endDate)
          if (newValue > endDate.getTime()) {
            newValue = endDate.getTime(); // Cap to maxTimestamp
            clearInterval(id); // Stop the interval
            setPlaying(false); // Update the playing state
          }
  
          // Update the slider and state
          sliderRef.current.value = newValue;
          setSliderValue(timestampToDate(newValue));
        }
      }, 1500); // Check every 1.5 seconds
  
      setIntervalId(id); // Store the interval ID for later cleanup
    } else {
      // Pause playback
      setPlaying(false);
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval
        setIntervalId(null); // Reset intervalId
      }
    }
  };
  

  // Handle next button click
  const handleNextClick = () => {
    if (sliderRef.current) {
      let newValue = parseInt(sliderRef.current.value, 10) + period; // Increment by 1 hour (3600000 ms)
      if (newValue > maxTimestamp) newValue = minTimestamp; // Loop back to minTimestamp
      sliderRef.current.value = newValue;
      setSliderValue(timestampToDate(newValue));
      handleSliderChange({ target: { value: newValue } });
    }
  };

  // Handle previous button click
  const handlePreviousClick = () => {
    if (sliderRef.current) {
      let newValue = parseInt(sliderRef.current.value, 10) - period; // Decrement by 1 hour (3600000 ms)
      if (newValue < minTimestamp) newValue = maxTimestamp; // Loop back to maxTimestamp
      sliderRef.current.value = newValue;
      setSliderValue(timestampToDate(newValue));
      handleSliderChange({ target: { value: newValue } });
    }
  };

  const handleUpdateLayer = (id, updates) => {
    dispatch(updateMapLayer({ id, updates }));
  };
/*
  useEffect(() => {

    setStartDate(new Date(item.layer_information.timeIntervalStart))
    setEndDate(new Date(item.layer_information.timeIntervalEnd))

  // Clean up on unmount
  return () => {
  };
}, []);
*/


  useEffect(() => {
    // Initialize the map
    handleUpdateLayer(item.id, {
        layer_information: {
          ...item.layer_information,
          timeIntervalStart:formatDateToISOWithoutMilliseconds(sliderValue),
          zoomToLayer:false // Updated value
        }
      });


    // Clean up on unmount
    return () => {
    };
  }, [sliderValue]);
  



return(
   
    <div style={{marginTop:'-10px',marginBottom:12, marginLeft:5}}>
      <Row className="g-0">
      <Col md={4}>
      <p style={{fontSize:13, paddingTop:8}}>Time Range:</p>
      </Col>
      <Col md={4}> 
      <input
        type="range"
        className="form-range"
        min={minTimestamp}
        max={maxTimestamp}
        step={period} // Step every 1 hour (3600000 ms)
        value={dateToTimestamp(sliderValue)}
        ref={sliderRef}
        onChange={handleSliderChange}
        onClick={(e) => e.currentTarget.blur()}

      />
     
      </Col>
      <Col md={3} style={{marginLeft:10}}>
      <ButtonGroup aria-label="Basic example" style={{marginLeft:2}}>
      <button className="btn btn-outline-primary btn-sm" style={{borderRadius:0, fontSize:8}} onClick={handlePreviousClick}><FaBackward /></button>
        <button className="btn btn-success btn-sm" style={{borderRadius:0, fontSize:8}} onClick={handlePlayClick}>{playing ?  <FaPause /> : <FaPlay />}</button>
        <button className="btn btn-outline-primary btn-sm" style={{borderRadius:0, fontSize:8}} onClick={handleNextClick}><FaForward /></button>
    
      </ButtonGroup>
     </Col>
     
    </Row>
    <Row className="g-0" style={{marginTop:-15}}>
    <Col md={4}>
    
    </Col>
      <Col md={6}>
      <h6 style={{paddingTop:0}}>
      <Badge bg="secondary">{formatDateToISOWithoutMilliseconds(sliderValue)}</Badge>
      </h6>
      </Col>
    </Row>
    
      
    </div>
)
}
export default RangeSlider;