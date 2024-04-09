import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../../../Common/Header/Header';
import Search from '../../../../Common/Search/Search';
import Sidenav from '../SideNavBar/Sidenav';
import ProjectsClient from '../../../../Common/ProjectsClient/ProjectsClient';
import Addclient from '../AddClient/Addclient';


const Home = (props:any) => {
    return (
        <React.Fragment>

        <Header props ={props}/>
        <Search props={props}/>
        <Sidenav props={props}/>
        <ProjectsClient props={props}/>
        <Addclient props={props}/>
        </React.Fragment>
    );
}

export default Home;

