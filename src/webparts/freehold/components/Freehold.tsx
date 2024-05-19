import * as React from 'react';
import type { IFreeholdProps } from './IFreeholdProps';
import Home from "./Home/Home";
import { Toaster } from 'react-hot-toast';

/* const FreeHold: React.FC<IFreeholdProps> = (props: IFreeholdProps) => {
  //console.log(props, "propsprops");


  return (
    <>
      <Toaster position="top-right" />
      <Home props={props} />

    </>
  );
};
export default FreeHold; */

export default class FreeHold extends React.Component<IFreeholdProps, {}> {

  constructor(props: IFreeholdProps) {
    super(props);
  }

  public render(): React.ReactElement<IFreeholdProps> {


    return (
      <>
        <Toaster position="top-right" />
        <Home
          userDisplayName={this.props.userDisplayName}
          context={this.props.context}
          spHttpClient={this.props.spHttpClient}
          siteUrl={this.props.siteUrl} />

      </>
    );
  }

}
