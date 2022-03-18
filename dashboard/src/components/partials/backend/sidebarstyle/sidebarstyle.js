import React,{useEffect, useState} from 'react'
// import React,{useEffect,useState} from 'react'
import { Link,useLocation} from 'react-router-dom'
// import { Link} from 'react-router-dom'
import {Accordion,Button} from 'react-bootstrap'
import Scrollbar from 'smooth-scrollbar'

// import {connect} from "react-redux";
// import {getDarkMode} from '../../../../store/mode'

//img
import logo from '../../../../../src/assets/images/logo.png'


// function mapStateToProps(state) {
//     return {
//         darkMode: getDarkMode(state)
//     };
// }


const minisidbar =() =>{
    document.body.classList.toggle('sidebar-main')
}


const SidebarStyle = (props) => {
    
    //Collapse state
    const[activeMenu,setActiveMenu] = useState(false)
    const[activesubMenu,setSubmenu] = useState(false)
    const[activesubMenu1,setSubmenu1] = useState(false)
    // const[activesubMenu2,setSubmenu2] = useState(false)
    
   
    //location
    let location = useLocation();

//     const urlParams = new URLSearchParams(window.location.search);
//     const sidebar = urlParams.get('sidebar');
//     var variant='';
//     if (sidebar !== null) {
//         variant='';
//         switch (sidebar) {
//             case "0":
//                 variant ='sidebar-dark';
//             break;
//             case "1":
//                 variant ='sidebar-light';
//             break;
//             default:
//                 variant ='';
//                 break;
//         }
//     }
    
//     // Collapse state
//     const[activeMenu,setActiveMenu] = useState(false)
//     const[activesubMenu,setSubmenu] = useState(false)
    useEffect(
    () =>{
        Scrollbar.init(document.querySelector('#sidebar-scrollbar'))  
    }
)
    return(
        <>
            <div className="iq-sidebar">
                <div className="iq-sidebar-logo d-flex justify-content-between">
                    <Link to="/" className="header-logo">
                    <img src={logo} className="img-fluid rounded-normal" alt=""/>
                    <div className="logo-title">
                        <span className="text-primary text-uppercase">Midstream</span>
                    </div>
                    </Link>
                    <div className="iq-menu-bt-sidebar">
                    <div className="iq-menu-bt align-self-center">
                        <div className="wrapper-menu" onClick={minisidbar}>
                            <div className="main-circle"><i className="las la-bars"></i></div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="data-scrollbar" data-scroll="1" id="sidebar-scrollbar">
                    <nav className="iq-sidebar-menu">
                    <Accordion as="ul" id="iq-sidebar-toggle" className="iq-menu" onSelect={(e) => setActiveMenu(e)}>
                        <li className={`${location.pathname === '/' ? 'active' : ''} `}>
                            <Link to="/" className="text-primary">
                                <i className="ri-arrow-right-line"></i>
                                <span>Visit site</span>
                            </Link>
                        </li>
                        <li className={`${location.pathname === '/' ? 'active' : ''} `}>
                            <Link to="/" className="iq-waves-effect">
                                <i className="las la-home iq-arrow-left"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className={`${location.pathname === '/rating' ? 'active' : ''} `}>
                            <Link to="/rating" className="iq-waves-effect">
                                <i className="las la-star-half-alt"></i>
                                <span>Rating </span>
                            </Link>
                        </li>
                        <li className={`${location.pathname === '/comment' ? 'active' : ''} `}>
                            <Link to="/comment" className="iq-waves-effect">
                                <i className="las la-comments"></i>
                                <span>Comment</span>
                            </Link>
                        </li>
                        <li className={`${location.pathname === '/user' ? 'active' : ''} `}>
                            <Link to="/user" className="iq-waves-effect">
                                <i className="las la-user-friends"></i>
                                <span>User</span>
                            </Link>
                        </li>
                        <li className={activeMenu === '0' ? 'active' : ''}>
                            <Accordion.Toggle as={Button} href="#" eventKey="0" variant=" collapsed" data-toggle="collapse" aria-expanded={activeMenu === '0' ? 'true' : 'false'}><i className="las la-list-ul"></i><span>Category</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></Accordion.Toggle>
                            <Accordion.Collapse  className="submenu" eventKey="0">
                            <ul id="category" className="iq-submenu " data-parent="#iq-sidebar-toggle">
                                <li className={`${location.pathname === '/add-category' ? 'active' : ''} `}><Link to="/add-category"><i className="las la-user-plus"></i>Add Category</Link></li>
                                <li className={`${location.pathname === '/category-list' ? 'active' : ''} `}><Link to="/category-list"><i className="las la-eye"></i>Category List</Link></li>
                            </ul>
                            </Accordion.Collapse>
                        </li>
                        <li className={activeMenu === '1' ? 'active' : ''}>
                            <Accordion.Toggle as={Button} href="#" eventKey="1" variant=" collapsed" data-toggle="collapse" aria-expanded="false"><i className="las la-film"></i><span>Movie</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></Accordion.Toggle>
                            <Accordion.Collapse  className="submenu" eventKey="1">
                            <ul id="movie" className="iq-submenu" data-parent="#iq-sidebar-toggle">
                                <li className={`${location.pathname === '/add-movie' ? 'active' : ''} `}><Link to="/add-movie"><i className="las la-user-plus"></i>Add Movie</Link></li>
                                <li className={`${location.pathname === '/movie-list' ? 'active' : ''} `}><Link to="/movie-list"><i className="las la-eye"></i>Movie List</Link></li>
                            </ul>
                            </Accordion.Collapse>
                        </li>
                        <li className={activeMenu === '2' ? 'active' : ''}>
                            <Accordion.Toggle as={Button} href="#" eventKey="2" variant=" collapsed" data-toggle="collapse" aria-expanded="false"><i
                                className="las la-film"></i><span>Show</span><i
                                className="ri-arrow-right-s-line iq-arrow-right"></i>
                            </Accordion.Toggle>
                            <Accordion.Collapse  className="submenu" eventKey="2">
                            <ul id="show" className="iq-submenu" data-parent="#iq-sidebar-toggle">
                                <li className={`${location.pathname === '/add-show' ? 'active' : ''} `}><Link to="/add-show"><i className="las la-user-plus"></i>Add Show</Link></li>
                                <li className={`${location.pathname === '/show-list' ? 'active' : ''} `}><Link to="/show-list"><i className="las la-eye"></i>Show List</Link></li>
                            </ul>
                            </Accordion.Collapse>
                        </li>
                    </Accordion>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default SidebarStyle;
