import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFreeholdChildProps {
  spContext: WebPartContext;
  siteUrl: string;
  userRole: string;
  setLocationPath: Function;
}
