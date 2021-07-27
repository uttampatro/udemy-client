import React from 'react';
import './Header.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { useHistory } from 'react-router';

function Header() {
    const history = useHistory();

    const createCourse = () => {
        try {
            history.push('/createCourse');
        } catch (error) {
            console.log(error);
        }
    };

    const cart = () => {
        try {
            history.push('/cart');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="header">
            <div className="header_body">
                <div>
                    <a href="" className="logo">
                        <img
                            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                            alt="Udemy"
                        />
                    </a>
                </div>
                <div className="header_para">
                    <p>Categories</p>
                </div>
                <div className="header_search">
                    <form>
                        <div className="header_searchContainer">
                            <SearchOutlined />
                            <input
                                placeholder="Search for anything"
                                type="text"
                            />
                        </div>
                    </form>
                </div>

                <div onClick={createCourse} className="header_para">
                    <p>Instructor</p>
                </div>

                <div className="header_icon">
                    <FavoriteBorderIcon />
                </div>
                <div onClick={cart} className="header_icon">
                    <ShoppingCartOutlinedIcon />
                </div>
                <div className="header_icon">
                    <NotificationsNoneOutlinedIcon />
                </div>
                <div className="header_icon">
                    <Avatar />
                </div>
            </div>
        </div>
    );
}

export default Header;
