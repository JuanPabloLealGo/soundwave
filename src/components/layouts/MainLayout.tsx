import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../common/Footer"
import Header from "../common/Header"

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout