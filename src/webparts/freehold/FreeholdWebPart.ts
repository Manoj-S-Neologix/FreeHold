/* eslint-disable @microsoft/spfx/pair-react-dom-render-unmount */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import Freehold from './components/Freehold';
import { IFreeholdProps } from './components/IFreeholdProps';
import "../../assets/global.module.scss";
import { setup } from 'sp-pnp-js';

export interface IFreeholdWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class FreeholdWebPart extends BaseClientSideWebPart<IFreeholdWebPartProps> {

  protected async onInit(): Promise<void> {

    setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      }
    });

    return super.onInit();

  }

  public render(): void {
    const element: React.ReactElement<IFreeholdProps> = React.createElement(
      Freehold,
      {
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        userRole: ""
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

}
