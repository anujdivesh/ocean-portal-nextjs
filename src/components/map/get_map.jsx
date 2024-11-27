"use client" // client side rendering 
import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { Modal, Button,Row,Col, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import L from 'leaflet';
import { useAppSelector, useAppDispatch, useAppStore } from '@/app/GlobalRedux/hooks'
import '@/components/functions/L.TileLayer.BetterWMS';
import { setCenter, setZoom, setBounds,addLayer, removeLayer,setBaseMapLayer,setEEZEnable } from '@/app/GlobalRedux/Features/map/mapSlice';
import addWMSTileLayer from '../functions/addWMSTileLayer';
import "leaflet-bing-layer";
import '@/components/css/legend.css';
const MapBox = () => {
    const mapRef = useRef();
    const dispatch = useAppDispatch();
    const { center, zoom, bounds, maxBounds, layers, basemap, eezoverlay,enable_eez } = useAppSelector((state) => state.mapbox);
    const isBing = useRef(false); 
    const [selectedOption, setSelectedOption] = useState('opentopo'); 
    const [checkboxChecked, setCheckboxChecked] = useState(true);
    const [wmsLayer, setWmsLayer] = useState(null);
    const [showTime, setShowTime] = useState(false);
    const legendColorRef = useRef();

      useEffect(() => {
        mapRef.current = L.map('map', {
          center: center,
          zoom: zoom,
        });

        if(isBing.current){
          const defaultBasemapLayer = L.tileLayer.bing(basemap.url, {
            attribution: basemap.attribution,
          }).addTo(mapRef.current);
        }
        else{
        const defaultBasemapLayer = L.tileLayer(basemap.url, {
          attribution: basemap.attribution,
        }).addTo(mapRef.current);
      }
      
      legendColorRef.current = L.control({ position: "topright", id:22 });
      legendColorRef.current.onAdd = function() {
        // Create a div container for the legend
        var div = L.DomUtil.create("div", "legend");
      
        // Add the heading
       // div.innerHTML += "<h4>Note</h4>";
      
        // Add radio buttons for different map options
        div.innerHTML += `
          <label>
            <input 
              type="radio" 
              name="option" 
              value="opentopo" 
              id="opentopo-radio" 
              ${selectedOption === 'opentopo' ? 'checked' : ''}
            /> OpenTopoMap
          </label><br/>
          <label>
            <input 
              type="radio" 
              name="option" 
              value="osm" 
              id="osm-radio" 
              ${selectedOption === 'osm' ? 'checked' : ''}
            /> OpenStreetMap
          </label><br/>
             <label>
            <input 
              type="radio" 
              name="option" 
              value="bing" 
              id="bing-radio" 
              ${selectedOption === 'bing' ? 'checked' : ''}
            /> Satellite
          </label>
        `;
      
        // Add event listeners to the radio buttons
        const opentopoRadio = div.querySelector("#opentopo-radio");
        const osmRadio = div.querySelector("#osm-radio");
        const bingRadio = div.querySelector("#bing-radio");
      
        // Add event listeners to the radio buttons
        opentopoRadio.addEventListener("change", handleRadioChange);
        osmRadio.addEventListener("change", handleRadioChange);
        bingRadio.addEventListener("change", handleRadioChange);
      
        // Return the div to Leaflet
        return div;
      };
      
        legendColorRef.current.addTo(mapRef.current);
   
        
        mapRef.current.eachLayer((layer) => {
        if (layer._url !== 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png') {
          
          
        }
        else if (layer._url !== 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'){

        }
        else if(layer.options.bingMapsKey !== 'AnIOo4KUJfXXnHB2Sjk8T_zV-tI7FkXplU1efiiyTYrlogDKppodCvsY7-uhRe8P'){

        }
        else{
          //if(layer.layer_information.is_timeseries){
            setShowTime(false)
          //}
          mapRef.current.removeLayer(layer);
        }
      });
      
       //Add new layers from state

        if(layers.length === 0){
          setShowTime(false)
        }
  
      
    layers.forEach(layer => {

      if(layer.layer_information.enabled){
      
      if(!layer.layer_information.is_timeseries){
        addWMSTileLayer(mapRef.current, layer.layer_information.url, {
          layers: layer.layer_information.layer_name,
          format: 'image/png',
          transparent: true,
          opacity: layer.layer_information.opacity,
          styles: layer.layer_information.style,
          colorscalerange: layer.layer_information.colormin+", "+layer.layer_information.colormax,
          abovemaxcolor: layer.layer_information.abovemaxcolor,
          belowmincolor: layer.layer_information.belowmincolor,
          numcolorbands: layer.layer_information.numcolorbands,
          time: layer.layer_information.timeIntervalStart,
        });
    }
    else{
      addWMSTileLayer(mapRef.current, layer.layer_information.url, {
        layers: layer.layer_information.layer_name,
        format: 'image/png',
        transparent: true,
        opacity: layer.layer_information.opacity,
        styles: layer.layer_information.style,
        colorscalerange: layer.layer_information.colormin+", "+layer.layer_information.colormax,
        abovemaxcolor: layer.layer_information.abovemaxcolor,
        belowmincolor: layer.layer_information.belowmincolor,
        numcolorbands: layer.layer_information.numcolorbands,
        time: layer.layer_information.timeIntervalStart,
      });
     /*addTimeDimensionLayer(mapRef.current, layer.layer_information.url, {
        layers: layer.layer_information.layer_name,
        format: 'image/png',
        transparent: true,
        styles: layer.layer_information.style,
        colorscalerange: layer.layer_information.colormin+", "+layer.layer_information.colormax,
        abovemaxcolor: layer.layer_information.abovemaxcolor,
        belowmincolor: layer.layer_information.belowmincolor,
        numcolorbands: layer.layer_information.numcolorbands,
        opacity:layer.layer_information.opacity,
        timeIntervalStart: layer.layer_information.timeIntervalStart,
        timeIntervalEnd: layer.layer_information.timeIntervalEnd,
        period: layer.layer_information.period,
    });*/

  }
    //set Bounds
    if(layer.layer_information.zoomToLayer){
      
      mapRef.current.fitBounds(L.latLngBounds([[layer.south_bound_latitude,
        layer.east_bound_longitude],[layer.north_bound_latitude, layer.west_bound_longitude]]));
     }
    }
    });

   

      const handleMoveEnd = () => {
      const newCenter = mapRef.current.getCenter();
      const newZoom = mapRef.current.getZoom();
      dispatch(setCenter([newCenter.lat, newCenter.lng]));
      dispatch(setZoom(newZoom));
     };
  
      mapRef.current.on('moveend', handleMoveEnd);

     if(enable_eez){
      const newWmsLayer = L.tileLayer.wms(eezoverlay.url, {
        layers: eezoverlay.layer, // Replace with your WMS layer name
        format: 'image/png',
        transparent: true,
      }).addTo(mapRef.current);
      setWmsLayer(newWmsLayer);
    }
    else{
      if (wmsLayer) {
        mapRef.current.removeLayer(wmsLayer);
        setWmsLayer(null);
      }
    }

        return () => {
          mapRef.current.remove();
        };
      }, [layers,basemap,enable_eez]);

      const handleRadioChange = (event) => {
        console.log(event.target.value)

        if(event.target.value === "osm"){
          isBing.current = false
          dispatch(setBaseMapLayer({ url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution:'&copy; Pacific Community SPC' }));
        }
        else if(event.target.value === "bing"){
          isBing.current = true
          dispatch(setBaseMapLayer({ url: 'AnIOo4KUJfXXnHB2Sjk8T_zV-tI7FkXplU1efiiyTYrlogDKppodCvsY7-uhRe8P', attribution:'&copy; Pacific Community SPC' }));
        }
        else{
          isBing.current = false
          dispatch(setBaseMapLayer({ url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', attribution:'&copy; Pacific Community SPC' }));
        }
        setSelectedOption(event.target.value);
      };

      const handleCheckboxChange = (event) => {
        setCheckboxChecked(event.target.checked);
        const isChecked = event.target.checked;
      
       if (isChecked) {
        dispatch(setEEZEnable(true));
       
        } else {
          dispatch(setEEZEnable(false));
        }
      };

   

    
  return (
    <div>
     <div id="map" style={{Zindex: "auto",marginRight:-12, marginLeft:-12}}></div>
   
    </div>
  );
};

export default MapBox;
