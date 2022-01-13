import React from 'react';
import Home from '../pages/home/Index';
import Header from './header/Header';
import userServices from '../services/userServices';
import { useHistory } from 'react-router-dom';

function HomePage() {
    const history = useHistory();
    const User = localStorage.getItem('user');
    const user = User ? JSON.parse(User) : undefined;
    const logout = async () => {
        try {
            await userServices.logout();
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    };
    if (!user) {
        return <>Loading...</>;
    }
    return (
        <div>
            <Header />
            <Home />
        </div>
    );
}

export default HomePage;
