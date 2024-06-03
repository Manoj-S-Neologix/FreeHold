import * as React from 'react';
import type { IFreeholdProps } from './IFreeholdProps';
import Home from "./Home/Home";
import { Toaster } from 'react-hot-toast';
import SPService, { SPServiceType } from '../Services/Core/SPService';
import _ from 'lodash';

export interface IState {
  userRole: string;
}

const spServiceInstance: SPServiceType = SPService;

export default class FreeHold extends React.Component<IFreeholdProps, IState> {

  constructor(props: IFreeholdProps) {
    super(props);

    this.state = {
      userRole: ""
    }
  }

  public async componentDidMount() {

    const loggedInUserGroups: string[] = [];
    let userRoleVal: string = "staff";

    spServiceInstance.getLoggedInUserGroups().then((response) => {
      //console.log("Current user site groups : ", response);

      _.forEach(response, function (group: any) {
        loggedInUserGroups.push(group.Title);
      });

      if (_.indexOf(loggedInUserGroups, "DMS Superuser") > -1) {
        userRoleVal = "superuser";
      } else if (_.indexOf(loggedInUserGroups, "DMS Managers") > -1) {
        userRoleVal = "manager";
      } else if (_.indexOf(loggedInUserGroups, "DMS Staffs") > -1) {
        userRoleVal = "staff";
      }

      //alert("userRole : " + userRoleVal);
      this.setState({
        userRole: userRoleVal
      });

    });
    
  }

  public render(): React.ReactElement<IFreeholdProps> {

    return (
      <>
        <Toaster position="top-right" />
        <Home
          userDisplayName={this.props.userDisplayName}
          context={this.props.context}
          spHttpClient={this.props.spHttpClient}
          siteUrl={this.props.siteUrl}
          userRole={this.state.userRole}
        />

      </>
    );
  }

}
