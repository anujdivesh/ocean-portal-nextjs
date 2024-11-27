"use client" // client side rendering 
import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '@/components/css/map.css'
import { useAppSelector, useAppDispatch, useAppStore } from '@/app/GlobalRedux/hooks'
import { hideModal } from '@/app/GlobalRedux/Features/modal/modalSlice';
import { setCenter, setZoom, setBounds,addMapLayer, removeMapLayer } from '@/app/GlobalRedux/Features/map/mapSlice';
import { get_url } from '@/components/json/urls';

const SmallMap = () => {
    const mapContainer2 = useRef(null);
    const layer_workbench = useAppSelector((state) => state.mapbox.layers);
    const dataset_list = useAppSelector(state => state.dataset_list.value)
    const baseLayer = useRef();
    const _isMounted = useRef(true);
    const current_datatset = useRef(null);
    const layer = useRef(null);
    const dispatch = useAppDispatch()
    const boolCheck =useRef(false);
    const [error, setError] = useState('');

    const handleClick = () => {
      // Set the error message
      setError('*Warning : Layer exists in the workbench');
      setTimeout(() => {
          setError('');
      }, 5000);
  };

    useEffect(() => {  
        initMap();
        addLayer(dataset_list)
      return () => {
        mapContainer2.current.remove();
      };
      },[]);

      function addBBox(map, bbox) {
        var rect = L.rectangle(bbox, {color: '#FF5733', weight: 3,id:1}).addTo(map);
        map.fitBounds(bbox);
        return rect;
      }

      function addLayer(dataset_list){
        //add bbox
        if (dataset_list.has_bbox){
          mapContainer2.current.eachLayer(function (layer) {
            const layername = layer.options.id;
            if(layername === 1){
              mapContainer2.current.removeLayer(layer);
            }
          });
  
          current_datatset.current = dataset_list;
          layer.current = addBBox(mapContainer2.current, [[dataset_list.south_bound_latitude,
            dataset_list.east_bound_longitude],[dataset_list.north_bound_latitude, dataset_list.west_bound_longitude]])
        }
        else{
          mapContainer2.current.eachLayer(function (layer) {
            const layername = layer.options.id;
            if(layername === 1){
              mapContainer2.current.removeLayer(layer);
            }
          });
        }
      }

      const fetchData = async (dataset_list,id) => {
        try {
          const response = await fetch(get_url('layer',id)); // Replace with your API URL
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          const jsonWithParent = {
            id:dataset_list.id,
            south_bound_latitude:dataset_list.south_bound_latitude,
            east_bound_longitude:dataset_list.east_bound_longitude,
            north_bound_latitude:dataset_list.north_bound_latitude,
            west_bound_longitude:dataset_list.west_bound_longitude,
            layer_information: result
          };
          dispatch(addMapLayer(jsonWithParent))
          //setData(result);
        } catch (error) {
          //setError(error);
        }
      };
      

    function initMap(){
       mapContainer2.current = L.map('map2', {
        zoom: 4,
        center: [-8, 179.3053],
       });
     
       const baselayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; Pacific Community (OSM)',
        detectRetina: true
    }).addTo(mapContainer2.current);

    // Create a custom control
    var CustomButton = L.Control.extend({
      options: {
          position: 'topright'
      },

      onAdd: function (map) {
          var container = L.DomUtil.create('div', 'leaflet-control-custom');
          var button = L.DomUtil.create('button', 'btn btn-primary', container);
          button.innerHTML = '&nbsp; Add to Map &nbsp;';
          L.DomEvent.on(button, 'click', function () {
            const isEqual = (a, b, epsilon = 1e-10) => Math.abs(a - b) < epsilon;
            if (layer_workbench.length > 0){
              for (let i = 0; i < layer_workbench.length; i++) {
                if(parseFloat(layer_workbench[i].id) == parseFloat(current_datatset.current.id)){
                  boolCheck.current = true;
                  break;
                }
                else{
                  boolCheck.current = false;
                }
            }
            }
            if (!boolCheck.current){
              fetchData(dataset_list,current_datatset.current.layer_information);
              //console.log(get_Data)
             // console.log(current_datatset.current.layer_information)
            dispatch(hideModal())
            //dispatch(setLayer(current_datatset.current))
            //dispatch(addMapLayer(current_datatset.current));
            }
            else{
              handleClick()
            }
          });
          return container;
      }
  });

  // Add the custom control to the map
  new CustomButton().addTo(mapContainer2.current);
      }
  
  return (
    <div>
         {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
     <div id="map2" style={{width:"100%", height:"200px",Zindex: "auto"}}></div>
    </div>
  );
};

export default SmallMap;
