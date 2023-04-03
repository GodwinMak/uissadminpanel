import React from 'react'
import "../../assets/css/styles.css"


const HeaderComponent = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{position: "fixed", width: "100vw"}}>
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <span className="nav-link" data-widget="pushmenu"  role="button"><i className="fas fa-bars" /></span>
    </li>
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto"></ul>
</nav>

  )
}

export default HeaderComponent