import React from 'react';
import './Header.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import userServices from '../../services/userServices';

function Header() {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
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
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = async () => {
        try {
            await userServices.logout();
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="header">
            <div className="header_body">
                <div>
                    <Link to={'/home'}>
                        <a href="" className="logo">
                            <img
                                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                                alt="Udemy"
                            />
                        </a>
                    </Link>
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
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar />
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar style={{ marginRight: '10px' }} /> Profile
                        </MenuItem>
                        <hr />
                        <MenuItem
                            style={{ paddingRight: '10px' }}
                            onClick={logout}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
