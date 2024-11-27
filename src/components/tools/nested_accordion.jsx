// components/NestedAccordion.jsx
'use client';
import React, { useState,useEffect } from 'react';
import { Accordion,Spinner } from 'react-bootstrap';
import '@/components/css/accordion.css'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useAppSelector, useAppDispatch, useAppStore } from '@/app/GlobalRedux/hooks'
import { setDataset } from '@/app/GlobalRedux/Features/dataset/dataSlice';

const NestedAccordion = ({ data, openIds }) => {

const dispatch = useAppDispatch()


  const handleClick = (contentItem) => {
      dispatch(setDataset(contentItem))
  };
    // Recursive function to determine which items should be open
    const getActiveKeys = (items, openIds) => {
       const activeKeys = [];
        if (openIds == '0'){
            activeKeys.push('0')
        }
    else{
    const findActiveKeys = (items, targetId) => {
        items.forEach((item) => {
            if (item.id === targetId) {
                activeKeys.push(item.id);
            }

            if (item.children && item.children.length > 0) {
                // Check if any child matches the targetId or if targetId is a child of this item
                if (item.children.some(child => child.id === targetId)) {
                    activeKeys.push(item.id); // Open the parent item if it has the targetId as a child
                    activeKeys.push(targetId); // Ensure the targetId itself is included
                } else {
                    // Recursively find in children
                    findActiveKeys(item.children, targetId);
                }
            }
        });
    };

    findActiveKeys(items, openIds);
    }

    return Array.from(new Set(activeKeys));
    };
//testtt
// Recursive function to find the path and reverse it
const findPathToRoot = (node, targetId) => {
    if (node.content && node.content.some(item => item.id === targetId)) {
        return [node.id, targetId];
    }
    
    if (node.children) {
        for (const child of node.children) {
            const result = findPathToRoot(child, targetId);
            if (result) {
                return [node.id, ...result];
            }
        }
    }
    
    return null;
};

// Find the path from the root node to the target ID
const findIdsPath = (data, targetId) => {
    for (const rootNode of data) {
        const result = findPathToRoot(rootNode, targetId);
        if (result) {
            return result.reverse(); // Reverse to get the correct order
        }
    }
    return null;
};
var activeKeys = [];
if (data.length !== 0){
    if(openIds !== ''){
    activeKeys = findIdsPath(data, openIds);
    }
if (activeKeys.length !== 0){
    activeKeys.shift(); 
    activeKeys = [...activeKeys].reverse(); //
}
}

  //end test
    
    //console.log(data)
    //var activeKeys =[3,2,3];
    //var activeKeystmp = [2,1,1];
    /*
    if (data.length !== 0){
    activeKeystmp = getActiveKeys(data, openIds);
  //  console.log(openIds)
    if (activeKeystmp.length !== 0){
    activeKeystmp.unshift(activeKeystmp[0].charAt(0));
    activeKeys = activeKeystmp.filter((item, index) => activeKeystmp.indexOf(item) === index);
    
    }
    }*/

    const renderAccordionItems = (items) => {
        return items.map((item) => (
            <Accordion.Item eventKey={item.id} key={item.id} style={{ borderRadius: 0 }}>
                <Accordion.Header
                    onClick={(e) => e.currentTarget.blur()}
                >
                    {item.display_title}
                </Accordion.Header>
                <Accordion.Body style={{ paddingLeft: 20, paddingRight: 0, backgroundColor: '#F8F8F8' }}>
                    {item.content.map((contentItem) => (
                        <div className="flex-container" key={contentItem.id} onClick={(e) =>handleClick(contentItem)}>
                            <div className="item">{contentItem.name}</div>
                            <div className="item">
                                <IoMdAddCircleOutline size={22} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    ))}
                    {item.children && item.children.length > 0 && (
                        <Accordion flush defaultActiveKey={activeKeys}>
                            {renderAccordionItems(item.children)}
                        </Accordion>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        ));
    };

    
    return (
        <>
        {data.length === 0 ? (
      
      <Spinner animation="border" variant="primary" style={{marginLeft:150, marginTop:50}}/>
        ):(
            
        <Accordion flush defaultActiveKey={activeKeys}>
            {renderAccordionItems(data)}
        </Accordion>
        )}

</>
        
    );
};

export default NestedAccordion;
