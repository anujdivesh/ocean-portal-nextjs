'use client'
import React from 'react'
import { Container } from 'react-bootstrap'
import '@/components/css/login.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import Navbar from 'react-bootstrap/Navbar';

const Aboutus = () => {
    const pathname = usePathname();
    return (
        <>
       <main id="bodyWrapper" >
        <div id="mapWrapper" >
        <div id="map33" >
        <div
        className="sign-in__wrapper"
     
      >
            <Container>
            <h2 className='text-center mt-2'>
            Experts
            </h2>
            </Container>
            </div>
            </div>
            </div>
            </main>
       
        </>
       
    )
}

export default Aboutus