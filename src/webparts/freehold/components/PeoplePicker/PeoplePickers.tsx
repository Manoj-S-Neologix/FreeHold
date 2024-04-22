import React from 'react';
import { Stack } from "@fluentui/react";
import './PeoplePickers.css';


const PeoplePickers = ({ props }: any) => {
    console.log(props.props.context, "props.context.props.context");

    return (
        <div className="creative-container">

            <Stack tokens={{ childrenGap: 10 }}>


            </Stack>


        </div>

    );
};
export default PeoplePickers;