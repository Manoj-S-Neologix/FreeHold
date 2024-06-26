import {
  SPHttpClient
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFreeholdProps {
  userDisplayName: string;
  context: WebPartContext;
  spHttpClient: SPHttpClient;
  siteUrl: any;
  userRole: string;
}
