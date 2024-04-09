import * as React from 'react';
import type { IFreeholdProps } from './IFreeholdProps';
import Home from "./Home/Home";

const FreeHold: React.FC<IFreeholdProps> = (props) => {

  return (
    <Home props={props} />
  );
};
export default FreeHold;
