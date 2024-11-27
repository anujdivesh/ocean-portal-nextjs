"use client" // client side rendering 

// library 
import { useEffect } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
// react bootstrap 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SideBar from '../sidebar/sidebar';
// css 
import '@/components/navbar/navbar.css'
import '@/components/navbar/sidebar.css'
import '@/components/css/app.css'
import '@/components/css/map.css'
// icon 
import { IoMdPerson } from "react-icons/io";
import { Row, Col } from 'react-bootstrap';

function Navigationbar({topContent,mainContent}) {
    const pathname = usePathname();
    const isLoggedin = false;

    useEffect(() => {

        if (pathname === '/') {
            document.body.classList.remove('no-sidebar', 'navt2');
            document.body.classList.add('navt');
        } else {
            document.body.classList.add('no-sidebar', 'navt2');
            document.body.classList.remove('navt');
        }
        /*if (pathname === '/aboutus' || pathname === '/login') {
            document.body.classList.add('no-sidebar', 'navt2');
            document.body.classList.remove('navt');
        } else {
            document.body.classList.remove('no-sidebar', 'navt2');
            document.body.classList.add('navt');
        }*/
    }, [pathname]);  

    const activateLasers = (e) => {
                e.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
                e.currentTarget.blur()
      }
    return (
        <div className="d-flex" id="wrapper">

        <div id="hidden">
       <div id="sidebar-wrapper" style={{backgroundColor:'#FFF5EE'}}>
  <div className="sidebar-heading" style={{"paddingBottom":13, "color": "#FFF", "backgroundColor":"#3f51b5"}}>Pacific Ocean Portal</div>
  <div className="list-group list-group-flush">

      <div className="col-2-5">
      <SideBar/>
      </div>
      </div>
      </div>
  </div>
  <div id="page-content-wrapper">
  <nav className="navbar navbar-expand-lg navbar-dark" style={{"backgroundColor":"#3f51b5"}}>

 <Navbar.Brand id="navtitle" style={{paddingLeft:20, fontSize:19.2}}> Pacific Ocean Portal</Navbar.Brand>
          <div className="container-fluid">
          <button className="btn btn-primary" style={{"backgroundColor":"#3f51b5"}} id="sidebarToggle" onClick={activateLasers}><span className="navbar-toggler-icon"></span></button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
         
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                      <li className="nav-item active">
                      <Link className={pathname == "/" ? "active-nav nav-link" : "nav-link"} href="/"> Explorer</Link>
                      </li>
                      <li className="nav-item">
                      <Link className={pathname == "/library" ? "active-nav nav-link" : "nav-link"} href="/library"> Library</Link>
                          </li>
                          <Link className={pathname == "/experts" ? "active-nav nav-link" : "nav-link"} href="/experts"> Experts</Link>
                      <li className="nav-item">
                      <Link className={pathname == "/aboutus" ? "active-nav nav-link" : "nav-link"} href="/aboutus"> About us</Link>
                          </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</a>
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{zIndex:3000}}>
                          <Link className="dropdown-item" href="/login"> Login</Link>

                          <Link className="dropdown-item" href="/signup"> Signup</Link>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
      <div className="container-fluid">
      
 {mainContent}
      </div>
  </div>
    </div>
    );
}

export default Navigationbar;