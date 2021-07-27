import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import Home from './components/Home';
import CourseDetails from './components/CourseDetails';
import CourseTopic from './pages/instructor/courseTopic/Index';
import Course from './pages/instructor/course/Index';
import CourseContent from './pages/instructor/courseContent/Index';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
    const userExists = localStorage.getItem('user');
    const isAuthenticated = userExists;

    return (
        <div className="app">
            <div className="app_body">
                <Switch>
                    <Route exact path={'/'}>
                        <Redirect
                            to={isAuthenticated ? '/home' : '/login'}
                        ></Redirect>
                    </Route>
                    <Route path={'/login'} component={LoginPage} />
                    <Route path={'/home'} component={Home} />
                    <Route path={'/createCourse'} component={Course} />
                    <Route
                        path={'/createCourseTopic'}
                        component={CourseTopic}
                    />
                    <Route
                        path={'/createCourseContent'}
                        component={CourseContent}
                    />
                    <Route path={'/courseDetails'} component={CourseDetails} />
                    <Route path={'/cart'} component={Cart} />
                    <Route path={'/checkout'} component={Checkout} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
