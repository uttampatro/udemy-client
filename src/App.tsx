import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import HomePage from './components/Home';
import CourseDetailsPage from './components/CourseDetails';
import CourseTopic from './pages/instructor/courseTopic/Index';
import Course from './pages/instructor/createCourse/Index';
import CourseContent from './pages/instructor/courseContent/Index';
import CartPage from './components/Cart';
import CheckoutPage from './components/Checkout';

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
                    <Route path={'/home'} component={HomePage} />
                    <Route path={'/createCourse'} component={Course} />
                    <Route
                        path={'/createCourseTopic'}
                        component={CourseTopic}
                    />
                    <Route
                        path={'/createCourseContent/:topicId'}
                        component={CourseContent}
                    />
                    <Route
                        path={'/courseDetails/:courseId'}
                        component={CourseDetailsPage}
                    />
                    <Route path={'/cart'} component={CartPage} />
                    <Route path={'/checkout'} component={CheckoutPage} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
