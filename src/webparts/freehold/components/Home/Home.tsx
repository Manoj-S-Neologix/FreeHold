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
import ViewProjectByID from '../ViewProjects/ViewProjectByID';
import EditProjectByID from '../ViewProjects/EditProjectByID';
import ViewClientByID from '../ViewClient/ViewClientByID';
import EditClientByID from '../ViewClient/EditClientByID';

const colorCodes = {
    primary: "#125895",
    secondary: "#dba236"
};

const Home = (props: IFreeholdProps) => {

    return (
        <React.Fragment>
            <ThemeProvider primary={colorCodes.primary} secondary={colorCodes.secondary}>
                <HashRouter basename='/'>
                    <Header props={props.userDisplayName} />
                    <Search spContext={props.context} siteUrl={props.siteUrl} />
                    <Routes>
                        <Route path='/'
                            element={
                                <>
                                    <div>
                                        <SideNavBar spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />
                                    </div>
                                    <div>
                                        <ProjectsClients spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />
                                    </div>
                                </>}
                        />
                        <Route
                            path='/ViewClient'
                            element={<ViewClient spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />}
                        />
                        <Route
                            path='/ViewClient/:cId'
                            element={<ViewClientByID spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />}
                        />
                        <Route
                            path='/EditClient/:cId'
                            element={<EditClientByID spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />}
                        />
                        <Route
                            path='/ViewProject'
                            element={<ViewProjects spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />}
                        />
                        <Route
                            path='/ViewProject/:pId'
                            element={<ViewProjectByID spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />}
                        />
                        <Route
                            path='/EditProject/:pId'
                            element={<EditProjectByID spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />}
                        />
                        <Route
                            path='/ChecklistValidation'
                            element={<ChecklistValidation spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />}
                        />
                        <Route
                            path='/ChecklistConfiguration'
                            element={<ChecklistConfiguration spContext={props.context} siteUrl={props.siteUrl} userRole={props.userRole} />}
                        />
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </React.Fragment >
    );
};

export default Home;

