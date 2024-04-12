import React, { useEffect } from "react"
import { Header } from "../header/header"
import { Container } from "../container/container"
import { NavBar } from "../navbar/navbar"
import { Outlet, useNavigate } from "react-router-dom"
import { selectIAuthnticated, selectUser } from "../../features/user/userSlice"
import { useSelector } from "react-redux"

export const Layout = () => {
  const isAuth = useSelector(selectIAuthnticated)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth")
    }
  }, [])
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p=4">
          <Outlet />
        </div>
        <div>.....</div>
      </Container>
    </>
  )
}
