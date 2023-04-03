import React from 'react'
import HeaderComponent from '../HeaderComponent'
import SideNav from '../SideNavigation'
import FooterComponent from '../FooterComponent'
import { Outlet } from 'react-router-dom'

const PanelComponent = () => {
  return (
    <>
        <HeaderComponent/>
        <div style={{position: "relative", top: "50px"}}>
            <Outlet/>
        </div>
        <SideNav/>
        <FooterComponent/>
    </>
  )
}

export default PanelComponent