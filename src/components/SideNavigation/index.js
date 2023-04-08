import React from 'react'
import { Link } from 'react-router-dom'
import {SlChart, SlRocket, SlCalender} from "react-icons/sl"
import {TbUsers} from "react-icons/tb"
import {FaUsers} from "react-icons/fa"
import {FiTool} from "react-icons/fi"
import {GiBookshelf} from "react-icons/gi"
import {BiLogOut} from "react-icons/bi"
import DefaultPic from "../../assets/images/defaultPic.png"

const SideNav = () => {
  const [userValue, setUserValue] = React.useState([]); 
    React.useEffect(()=>{
      const fetchData= async ()=>{
        setUserValue(await JSON.parse(localStorage.getItem('uservalues')))
      }
      fetchData();
    },[])
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4 " style={{position: "fixed", height: "100vh"}}>
  {/* Brand Logo */}
  <a href="/dashboard" className="brand-link" style={{padding: "10px"}}>
    <span className="brand-text font-weight-bold" style={{fontSize: "20px"}}>UISS</span>
    <span className='brand-text' style={{fontSize: "10px",}}>Admin panel</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src={DefaultPic} className="img-circle elevation-2" alt="User" />
      </div>
      <div className="info">
        <Link to="/dashboard" className="d-block">{userValue.name}</Link>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item">
          <Link to="/dashboard"  className="nav-link active">
            <SlChart className="nav-icon" />
            <p>
              Dashboard
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link">
            <TbUsers className="nav-icon" />
            <p>
              Members
            </p>
          </Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/dashboard/members"  className="nav-link">
                <TbUsers className="nav-icon" />
                <p>Members</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/leaders"  className="nav-link">
                <TbUsers className="nav-icon" />
                <p>Leaders</p>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link  className="nav-link">
            <FaUsers className="nav-icon" />
            <p>
              Programs
            </p>
          </Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/dashboard/programs"  className="nav-link">
                <FaUsers className="nav-icon" />
                <p>Programs</p>
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link  className="nav-link">
                <SlLayers className="nav-icon" />
                <p>Categories</p>
              </Link> */}
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link  className="nav-link">
            <SlRocket className="nav-icon" />
            <p>
              Projects
            </p>
          </Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/dashboard/projects"  className="nav-link">
                <FiTool className="nav-icon" />
                <p>Projects</p>
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link  className="nav-link">
                <TbUsers className="nav-icon" />
                <p>Owners</p>
              </Link> */}
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link  className="nav-link">
            <SlCalender className="nav-icon" />
            <p>
              Events
            </p>
          </Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/dashboard/events"  className="nav-link">
                <GiBookshelf className="nav-icon" />
                <p>Events</p>
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link">
                <TbUsers className="nav-icon" />
                <p>Hosts</p>
              </Link> */}
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to='/dashboard/users'  className="nav-link">
            <TbUsers className="nav-icon" />
            <p>
              Users
            </p>
          </Link>
        </li>
        <li className="nav-item" style={{position: "fixed", bottom: "0"}}>
          <Link to='/'  className="nav-link">
            <BiLogOut className="nav-icon" />
            <p>
              LogOut
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</aside>

    </>
  )
}

export default SideNav