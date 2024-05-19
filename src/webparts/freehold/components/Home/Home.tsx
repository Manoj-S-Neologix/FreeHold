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
import { IFreeholdProps } from '../IFreeholdProps';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const colorCodes = {
    primary: "#125895",
    secondary: "#dba236"
};

const Home = (props: IFreeholdProps) => {
    return (
        <React.Fragment>
            {/* <ToastContainer /> */}
            <ThemeProvider primary={colorCodes.primary} secondary={colorCodes.secondary}>

                <HashRouter basename='/'>
                    <Header props={props.userDisplayName} />
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
                            element={<ViewClient spContext={props.context} siteUrl={props.siteUrl} />}
                        />
                        <Route
                            path='/ViewClient/:viewClientId'
                            element={<ViewClient spContext={props.context} siteUrl={props.siteUrl} />}
                        />
                        <Route
                            path='/EditClient/:editClientId'
                            element={<ViewClient spContext={props.context} siteUrl={props.siteUrl} />}
                        />
                        <Route
                            path='/ViewProjects'
                            element={<ViewProjects spContext={props.context} siteUrl={props.siteUrl} />}
                        />
                        <Route
                            path='/ChecklistValidation'
                            element={<ChecklistValidation spContext={props.context} siteUrl={props.siteUrl} />}
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

