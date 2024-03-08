import React, {useState} from 'react';
import Logo from "../../static/img/logo.png";
import {Outlet, Link, useNavigate, NavLink} from "react-router-dom";
import Like from "../../static/img/heart-line.svg";
import User from "../../static/img/user-fill.svg";
import HeaderDropDown from "../../components/HeaderDropdown/HeaderDropDown";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../features/authenticatedSlice";
import {nav__links} from "../../routesData/routes.config";
import "./header.scss";


const Header = ({isOpen, setIsOpen}) => {

    const [headerDropdown, setHeaderDropdown] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {data: authMe, isAuthenticated} = useSelector(state => state.auth);

    const goLogin = () => {
        return navigate("/login")
    }

    const onClickLogout = () => {
        window.localStorage.removeItem("token")
        dispatch(authActions.logout())
    }

    return (
        <header className="header">
            <div className="container">
                <div className="navigation">
                    <div className="logo">
                        <Link to="/">
                            <img className="logo__img" src={Logo} alt=""/>
                        </Link>
                    </div>
                    <nav onClick={() => setIsOpen(false)} className={`menu ${isOpen && "open"}`}>
                        <ul className="menu__item">
                            {
                                nav__links.map((el,idx )=> (
                                    <li key={idx} className="menu__link">
                                        <NavLink className={(navClass) => navClass.isActive ? "menu__title active" : "menu__title"} to={el.path}>{el.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <div className="panel">
                        <ul className="panel__items">
                            <li className="panel__item panel__like-item">
                                <Link className="panel__navigation" to={isAuthenticated ? "/favorite" : "/login"}>
                                    {
                                        authMe && isAuthenticated && authMe?.wishList.length ? <span
                                            className="panel__quantity">{authMe?.wishList.length}</span> : ""
                                    }
                                    <img className="panel__like" src={Like} alt=""/>
                                </Link>
                            </li>
                            <li className="panel__item user">
                                <div className={isAuthenticated ? "panel__user-roller" : ""}
                                     onClick={isAuthenticated ? () => setHeaderDropdown(!headerDropdown) : () => goLogin()}>
                                    <div className={isAuthenticated ? "panel__user-wrapper close" : "panel__user-wrapper"}>
                                        <img className="panel__user" src={User} alt=""/>
                                    </div>
                                    {
                                        isAuthenticated && (
                                            <div className="user__info">
                                                <p className="user__name">{authMe?.firstName.charAt(0)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        headerDropdown && <HeaderDropDown user={authMe} onClickLogout={onClickLogout}/>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={`nav-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                        <div className="bar">

                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </header>
    );
};

export default Header;