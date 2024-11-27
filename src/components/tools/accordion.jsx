import Accordion from 'react-bootstrap/Accordion';
import React, { useState,useEffect } from 'react';
import { CiFolderOn } from "react-icons/ci";
import { FaRegFolderOpen } from "react-icons/fa";
import NestedAccordion from './nested_accordion';
import { useAppSelector, useAppDispatch, useAppStore } from '@/app/GlobalRedux/hooks'
import { get_url } from '@/components/json/urls';
function MyAccordion() {
    const accordion_val = useAppSelector((state) => state.accordion.value);

 /*   
    const data = [
        {
            id: '1',
            title: 'Forecast',
            content: [],
            children: [
                {
                    id: '1-1',
                    title: 'Fiji',
                    content:  [],
                    children: [
                        {
                            id: '1-1-1',
                            title: 'Ocean',
                            content: 
                            [
                                {
                                    id:100,
                                    parent_id:'1-1-1',
                                    name:"Wave Watch 3 Forecast Funafuti",
                                    copyright:"Please contact the provider of this data for more information, including information about usage rights and constraints.",
                                    has_bbox:true,
                                    bbox_type:"rectangle",
                                    bounding_box:[{
                                        westBoundLongitude:"120",
                                        eastBoundLongitude:"260",
                                        southBoundLatitude:"-45.0625",
                                        northBoundLatitude:"45.0625"
                                    }],
                                    accordion:[
                                        {
                                        id:123,
                                        name: "Contact",
                                        value:"divesha@spc.int"
                                        },
                                        {
                                        id:1233,
                                        name: "Created",
                                        value:"2019-10-20"
                                        },
                                        {
                                            id:1232,
                                            name: "Dataset Custodian",
                                            value:"National Meteorological Office."
                                        },
                                        {
                                            id:1234,
                                            name: "Dataset Description",
                                            value:"Hourly wave forecast."
                                        },
                                        {
                                            id:1235,
                                            name: "License",
                                            value:"Open Data License"
                                        },
                                        {
                                            id:1236,
                                            name: "Access URL",
                                            value:"https://pacificdata.org/data/dataset/91eba2fd-d8fa-43c5-a524-252de18e0757/resource/82634f90-3950-461a-a9d0-7f34214100f4/download/ck_eez_pol_june2022.zip"
                                        }
                                    ],
                                    layer_information:{
                                        id:12,
                                        enabled:true,
                                        zoomToLayer:true,
                                        url:"https://dev-oceanportal.spc.int/thredds/wms/POP/model/regional/bom/forecast/hourly/wavewatch3/latest.nc",
                                        layer_title:"Wave Watch 3 Forecast",
                                        layer_type: "WMS",
                                        is_timeseries:true,
                                        format: 'image/png',
                                        layer_name:'sig_wav_ht',
                                        transparent:true,
                                        style: 'raster/x-Sst',
                                        colormin:0,
                                        colormax:4,
                                        colorscalerange: '0, 4',
                                        abovemaxcolor: "extend",
                                        belowmincolor: "transparent",
                                        numcolorbands: 250,
                                        timeInterval: '2024-08-21T12:00:00.000Z/2024-08-28T12:00:00.000Z',
                                        period: "PT6H",
                                        opacity:'0.9',
                                        legend:"https://dev-oceanportal.spc.int/thredds/wms/POP/model/regional/bom/forecast/hourly/wavewatch3/latest.nc?REQUEST=GetLegendGraphic&PALETTE=default&LAYERS=mn_wav_dir&STYLES=raster/x-Sst&COLORSCALERANGE=0,4"
                                    }
                                },
                                {
                                    id:200,
                                    parent_id:'1-1-1',
                                    name:"Salinity Forecast Nanumaga",
                                    copyright:"Please contact the provider of this data for more information, including information about usage rights and constraints.",
                                    has_bbox:true,
                                    bbox_type:"rectangle",
                                    bounding_box:[{
                                        westBoundLongitude:"120",
                                        eastBoundLongitude:"260",
                                        southBoundLatitude:"-45.0625",
                                        northBoundLatitude:"45.0625"
                                    }],
                                    accordion:[
                                        {
                                        id:1232,
                                        name: "Contact",
                                        value:"herved@spc.int"
                                        },
                                        {
                                        id:1233,
                                        name: "Created",
                                        value:"2024-10-20"
                                        },
                                        {
                                            id:12323,
                                            name: "Dataset Custodian",
                                            value:"Disaster Management office."
                                        },
                                        {
                                            id:12343,
                                            name: "Dataset Description",
                                            value:"Hourly salinity forecast."
                                        },
                                        {
                                            id:12353,
                                            name: "License",
                                            value:"Open Data License"
                                        },
                                        {
                                            id:12336,
                                            name: "Access URL",
                                            value:"https://pacificdata.org/data/dataset/91eba2fd-d8fa-43c5-a524-252de18e0757/resource/82634f90-3950-461a-a9d0-7f34214100f4/download/ck_eez_pol_june2022.zip"
                                        }
                                        ],
                                    layer_information:{
                                        id:13,
                                        enabled:true,
                                        zoomToLayer:true,
                                        url:"https://dev-oceanportal.spc.int/thredds/wms/POP/model/regional/copernicus/forecast/daily/phytoplankton/cmems_mod_glo_bgc-bio_anfc_0.25deg_P1D-m20240725_20240725.nc",
                                        layer_title:"Salanity Forecast",
                                        layer_type: "WMS",
                                        is_timeseries:false,
                                        format: 'image/png',
                                        layer_name:'o2',
                                        transparent:true,
                                        style: 'default',
                                        colormin:160,
                                        colormax:280,
                                        colorscalerange: '160, 280',
                                        abovemaxcolor: "extend",
                                        belowmincolor: "transparent",
                                        numcolorbands: 250,
                                        timeInterval: '2024-07-25T00:00:00.000Z/2024-08-01T00:00:00.000Z',
                                        time: '2024-07-25T00:00:00.000Z',
                                        period: "P1D",
                                        opacity:'0.9',
                                        legend:"https://dev-oceanportal.spc.int/thredds/wms/POP/model/regional/bom/forecast/hourly/wavewatch3/latest.nc?REQUEST=GetLegendGraphic&PALETTE=default&LAYERS=mn_wav_dir&STYLES=raster/x-Sst&COLORSCALERANGE=0,4"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: '2',
            title: 'Hindcast',
            content: [],
            children: [
                {
                    id: '2-2',
                    title: 'Tonga',
                    content:  [],
                    children: [
                        {
                            id: '2-2-2',
                            title: 'Forecast',
                            content: 
                            [
                                {
                                    id:'2.1',
                                    parent_id:'2-2-2',
                                    name:"Wave Watch 3 Forecast",
                                    copyright:"Please contact the provider of this data for more information, including information about usage rights and constraints.",
                                    has_bbox:true,
                                    bbox_type:"rectangle",
                                    bounding_box:[{
                                        westBoundLongitude:"175.9708637472084",
                                        eastBoundLongitude:"181.97255105015114",
                                        southBoundLatitude:"-20.3034175184893",
                                        northBoundLatitude:"-15.241789855961722"
                                    }],
                                    accordion:[
                                        {
                                        id:123,
                                        name: "Contact",
                                        value:"divesha@spc.int"
                                        },
                                        {
                                        id:1233,
                                        name: "Created",
                                        value:"2019-10-20"
                                        },
                                        {
                                            id:1232,
                                            name: "Dataset Custodian",
                                            value:"National Meteorological Office."
                                        },
                                        {
                                            id:1234,
                                            name: "Dataset Description",
                                            value:"Hourly wave forecast."
                                        },
                                        {
                                            id:1235,
                                            name: "License",
                                            value:"Open Data License"
                                        },
                                        {
                                            id:1236,
                                            name: "Access URL",
                                            value:"https://pacificdata.org/data/dataset/91eba2fd-d8fa-43c5-a524-252de18e0757/resource/82634f90-3950-461a-a9d0-7f34214100f4/download/ck_eez_pol_june2022.zip"
                                        }
                                    ],
                                    layer_information:{
                                        layer_title:"Wave Watch 3 Forecast",
                                        layer_type: "WMS",
                                        format: 'image/png',
                                        layer_name:'Depth',
                                        transparent:true,
                                        style: 'default-scalar/div-Spectral-inv',
                                        colorscalerange: '0, 2',
                                        abovemaxcolor: "extend",
                                        belowmincolor: "transparent",
                                        numcolorbands: 250,
                                        time: '2022-06-14T00:00:00.000Z',
                                    }
                                },
                                {
                                    id:'2.2',
                                    parent_id:'2-2-2',
                                    name:"Salinity Forecast",
                                    copyright:"Please contact the provider of this data for more information, including information about usage rights and constraints.",
                                    has_bbox:true,
                                    bbox_type:"rectangle",
                                    bounding_box:[{
                                        westBoundLongitude:"179.01497962365056",
                                        eastBoundLongitude:"179.2083177134926",
                                        southBoundLatitude:"-8.65125139918286",
                                        northBoundLatitude:"-8.419821547084887"
                                    }],
                                    accordion:[
                                        {
                                        id:1232,
                                        name: "Contact",
                                        value:"herved@spc.int"
                                        },
                                        {
                                        id:1233,
                                        name: "Created",
                                        value:"2024-10-20"
                                        },
                                        {
                                            id:12323,
                                            name: "Dataset Custodian",
                                            value:"Disaster Management office."
                                        },
                                        {
                                            id:12343,
                                            name: "Dataset Description",
                                            value:"Hourly salinity forecast."
                                        },
                                        {
                                            id:12353,
                                            name: "License",
                                            value:"Open Data License"
                                        },
                                        {
                                            id:12336,
                                            name: "Access URL",
                                            value:"https://pacificdata.org/data/dataset/91eba2fd-d8fa-43c5-a524-252de18e0757/resource/82634f90-3950-461a-a9d0-7f34214100f4/download/ck_eez_pol_june2022.zip"
                                        }
                                        ],
                                    layer_information:{
                                        layer_type: "WMS",
                                        format: 'image/png',
                                        layer_name:'Depth',
                                        transparent:true,
                                        style: 'default-scalar/div-Spectral-inv',
                                        colorscalerange: '0, 2',
                                        abovemaxcolor: "extend",
                                        belowmincolor: "transparent",
                                        numcolorbands: 250,
                                        time: '2022-06-14T00:00:00.000Z',
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
*/
//const data=[];

const [data, setData] = useState([]); 
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(get_url('root_menu')); // Replace with your API URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
    
   
    return (
        <>
        <div>
        <NestedAccordion data={data} openIds={accordion_val}/>
    </div>
        </>
      );
}

export default MyAccordion;