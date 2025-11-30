import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar/>
    <div className="container my-30">
        <Outlet/>
    </div>
      <Footer/>
    </>
  )
}
