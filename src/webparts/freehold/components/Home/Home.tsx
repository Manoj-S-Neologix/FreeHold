import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../../../Common/Header/Header';
import Sidenav from '../SideNavBar/Sidenav';
import ProjectsClient from '../../../../Common/ProjectsClient/ProjectsClient';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Addclient from '../ViewClient/ViewClient';
import ViewProjects from '../ViewProjects/ViewProjects';
import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';
import { ChecklistValidation } from '../ChecklistValidation/ChecklistValidation';
import Search from "../Search/Search";

const colorCodes = {
    primary: "#125895",
    secondary: "#dba236"
}
const Home = (props: any) => {
    return (
        <React.Fragment>
            <ThemeProvider primary={colorCodes.primary} secondary={colorCodes.secondary}>
                <HashRouter basename='/'>
                    <Header props={props} />
                    {/* <Search props={props} /> */}
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
                        <Route
                            path='/ChecklistValidation'
                            element={<ChecklistValidation />}
                        />
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default Home;

