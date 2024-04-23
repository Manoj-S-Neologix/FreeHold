/* eslint-disable @microsoft/spfx/pair-react-dom-render-unmount */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import Freehold from './components/Freehold';
import { IFreeholdProps } from './components/IFreeholdProps';
import "../../assets/global.module.scss";

export interface IFreeholdWebPartProps {
  description: string;
}

export default class FreeholdWebPart extends BaseClientSideWebPart<IFreeholdWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IFreeholdProps> = React.createElement(
      Freehold,
      {
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }




  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


}
