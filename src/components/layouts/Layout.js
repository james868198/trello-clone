import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import { Routes, Route, Link, Outlet } from "react-router-dom"
import styled from "styled-components"

export const Main = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const Layout = () => {
    return (
        <Main>
            <Header />
            {/* <div className="content"> */}
            <Outlet />
            {/* </div> */}
            {/* <Footer /> */}
        </Main>
    )
}
export default Layout
