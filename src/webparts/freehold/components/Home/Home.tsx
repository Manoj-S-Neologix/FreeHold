import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../../../Common/Header/Header';
import Sidenav from '../SideNavBar/Sidenav';
import ProjectsClient from '../../../../Common/ProjectsClient/ProjectsClient';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ViewProjects from '../ViewProjects/ViewProjects';
import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';
import { ChecklistValidation } from '../ChecklistValidation/ChecklistValidation';
import {ChecklistConfiguration} from '../ChecklistConfiguration/ChecklistConfiguration';
import Search from "../Search/Search";
import ViewClient from '../ViewClient/ViewClient';


const colorCodes = {
    primary: "#125895",
    secondary: "#dba236"
}
const Home = (props: any) => {
    // console.log(props)
    return (
        <React.Fragment>
            <ThemeProvider primary={colorCodes.primary} secondary={colorCodes.secondary}>
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
                        path='/ViewClient'
                        element={<ViewClient/>}
                        />
                        <Route
                            path='/ViewProjects'
                            element={<ViewProjects />}
                        />
                        <Route
                            path='/ChecklistValidation'
                            element={<ChecklistValidation />}
                        />
                        <Route
                            path='/ChecklistConfiguration'
                            element={<ChecklistConfiguration />}
                        />
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default Home;

