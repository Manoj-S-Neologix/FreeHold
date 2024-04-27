import * as React from 'react';
import type { IFreeholdProps } from './IFreeholdProps';
import Home from "./Home/Home";
import { Toaster } from 'react-hot-toast';

const FreeHold: React.FC<IFreeholdProps> = (props: any) => {
  //console.log(props, "propsprops");


  return (
    <>
      <Toaster position="top-right" />
      <Home props={props} />


    </>
  );
};
export default FreeHold;
