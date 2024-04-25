import * as React from 'react';
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
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const colorCodes = {
    primary: "#125895",
    secondary: "#dba236"
};

const Home = (props: any) => {
    return (
        <React.Fragment>
            {/* <ToastContainer /> */}
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
                            element={<ViewClient props={props} />}
                        />
                        <Route
                            path='/ViewProjects'
                            element={<ViewProjects props={props} />}
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
        </React.Fragment >
    );
};

export default Home;

