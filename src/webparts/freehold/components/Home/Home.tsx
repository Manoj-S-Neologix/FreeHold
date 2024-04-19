import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Header,
    SideNavBar,
    ChecklistConfiguration,
    ChecklistValidation,
    ProjectsClients,
    ViewProjects,
    Search,
    ViewClient
} from '../Route/index';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';

const colorCodes = {
    primary: "#125895",
    secondary: "#dba236"
};

const Home = (props: any) => {
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
                                    <SideNavBar props={props} />
                                    <ProjectsClients props={props} />
                                </>}
                        />
                        <Route
                            path='/ViewClient'
                            element={<ViewClient />}
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

