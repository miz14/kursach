import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom";

const Default = () => {
    
    return(
        <>
        <header className="header_bg">
            <div className='default_container'>
                <nav className="header_nav">
                    <NavLink className="header_navlink" to="/">Главная</NavLink>
                    <NavLink className="header_navlink" to="/aboutus">О нас</NavLink>
                    {/* <a href="">Главная</a>
                    <a href="">О нас</a> */}
                </nav>
            </div>
        </header>
        <Outlet/>
        </>
    )
}

export {Default};