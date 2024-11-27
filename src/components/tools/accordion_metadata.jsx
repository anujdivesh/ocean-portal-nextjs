import Accordion from 'react-bootstrap/Accordion';
import React, { useState } from 'react';
import { CiFolderOn } from "react-icons/ci";
import { FaRegFolderOpen } from "react-icons/fa";
import '@/components/css/accordion.css'
import SmallMap from '../map/small_map';
import { useAppSelector, useAppDispatch, useAppStore } from '@/app/GlobalRedux/hooks'
import { hideModal,showModaler } from '@/app/GlobalRedux/Features/modal/modalSlice';
function AccordionMetadata() {
    const [open, setOpen] = useState(null);

  const dataset_list = useAppSelector(state => state.dataset_list.value)
  const dispatch = useAppDispatch();
    return (
        <>
         {dataset_list.length === 0 ? (
            <>
                <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'100px'}}>
                <div className="item">Select a dataset to see a preview</div>
                </div>
                <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'100px',marginTop:'-20px'}}>
                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill w-10" style={{padding:'8px', marginLeft:'5px'}} onClick={()=>{ dispatch(hideModal())}}>&nbsp;Go to the Map&nbsp;</button>
                </div>
                </>
            
            ) : 
            (
            <>

        <SmallMap/>

        <div style={{paddingLeft:10,paddingTop:8, fontSize:'14px'}}>
            <p style={{ fontSize:'18px'}}>{dataset_list.name}</p>
            <p>{dataset_list.copyright}</p>
        {dataset_list.metadata_one_id !=="" ? ( 
            <Accordion key={dataset_list.metadata_one_id} flush>
            <Accordion.Item>
            <Accordion.Header onClick={(e) => e.currentTarget.blur()} aria-expanded={open ===dataset_list.metadata_one_id}>{dataset_list.metadata_one_id}</Accordion.Header>
                <Accordion.Body style={{paddingLeft:20, paddingRight:0}}>
                <p>{dataset_list.metadata_one_value}</p>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            ): null}

               {dataset_list.metadata_two_id !=="" ? ( 
            <Accordion key={dataset_list.metadata_two_id} flush>
            <Accordion.Item>
            <Accordion.Header onClick={(e) => e.currentTarget.blur()} aria-expanded={open ===dataset_list.metadata_two_id}>{dataset_list.metadata_two_id}</Accordion.Header>
                <Accordion.Body style={{paddingLeft:20, paddingRight:0}}>
                <p>{dataset_list.metadata_two_value}</p>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            ): null}
               {dataset_list.metadata_three_id !=="" ? ( 
            <Accordion key={dataset_list.metadata_three_id} flush>
            <Accordion.Item>
            <Accordion.Header onClick={(e) => e.currentTarget.blur()} aria-expanded={open ===dataset_list.metadata_three_id}>{dataset_list.metadata_three_id}</Accordion.Header>
                <Accordion.Body style={{paddingLeft:20, paddingRight:0}}>
                <p>{dataset_list.metadata_three_value}</p>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            ): null}
               {dataset_list.metadata_four_id !=="" ? ( 
            <Accordion key={dataset_list.metadata_four_id} flush>
            <Accordion.Item>
            <Accordion.Header onClick={(e) => e.currentTarget.blur()} aria-expanded={open ===dataset_list.metadata_four_id}>{dataset_list.metadata_four_id}</Accordion.Header>
                <Accordion.Body style={{paddingLeft:20, paddingRight:0}}>
                <p>{dataset_list.metadata_four_value}</p>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            ): null}
            {dataset_list.metadata_five_id !=="" ? ( 
            <Accordion key={dataset_list.metadata_five_id} flush>
            <Accordion.Item>
            <Accordion.Header onClick={(e) => e.currentTarget.blur()} aria-expanded={open ===dataset_list.metadata_five_id}>{dataset_list.metadata_five_id}</Accordion.Header>
                <Accordion.Body style={{paddingLeft:20, paddingRight:0}}>
                <p>{dataset_list.metadata_five_value}</p>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            ): null}
            {dataset_list.metadata_six_id !=="" ? ( 
            <Accordion key={dataset_list.metadata_six_id} flush>
            <Accordion.Item>
            <Accordion.Header onClick={(e) => e.currentTarget.blur()} aria-expanded={open ===dataset_list.metadata_six_id}>{dataset_list.metadata_six_id}</Accordion.Header>
                <Accordion.Body style={{paddingLeft:20, paddingRight:0}}>
                <p>{dataset_list.metadata_six_value}</p>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            ): null}
            

            </div>

         
        
            
            </>
        )}
        </>
      );
}

export default AccordionMetadata;