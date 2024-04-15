import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../../../Common/Header/Header';
import Search from '../../../../Common/Search/Search';
import Sidenav from '../SideNavBar/Sidenav';
import ProjectsClient from '../../../../Common/ProjectsClient/ProjectsClient';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Addclient from '../ViewClient/ViewClient';
import ViewProjects from '../ViewProjects/ViewProjects';


const Home = (props: any) => {
    return (
        <React.Fragment>
            <HashRouter basename='/'>
                <Header props={props} />
                <Search props={props} />
                <Routes>
                    <Route path='/'
                        element={
                            <>
                                <Sidenav props={props} />
                                <ProjectsClient props={props} />
                            </>}
                    />
                    <Route
                        path='/Addclient'
                        element={<Addclient />}
                    />
                       <Route
                        path='/ViewProjects'
                        element={<ViewProjects />}
                    />
                </Routes>
            </HashRouter>

        </React.Fragment>
    );
};

export default Home;

