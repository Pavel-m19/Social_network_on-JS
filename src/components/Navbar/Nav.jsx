import React from "react";
import n from './Nav.module.css'
import { NavLink } from "react-router-dom";
import '../../assets/main-style.css';

const Nav = (props) => {    
  return <nav className={n.nav}>
    <NavLink to={`/Profile/my`} className={navData => navData.isActive ? n.activeLink : n.item}>profile</NavLink>
    <NavLink to='/Dialog' className={navData => navData.isActive ? n.activeLink : n.item}>massages</NavLink>
    <NavLink to='/News' className={navData => navData.isActive ? n.activeLink : n.item}>news</NavLink>
    <NavLink to='/Applications/krestiki' end={false} className={navData => navData.isActive ? n.activeLink : n.item}>Applications</NavLink>
    <div className={n.item}></div>
    <NavLink to='/Users' className={navData => navData.isActive ? n.activeLink : n.item}>users</NavLink>
  </nav>
}

export default Nav