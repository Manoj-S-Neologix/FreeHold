import { Button as MuiButton } from "@mui/material";
import React from 'react';

interface ButtonProps {
    message: string;
    color?: any;
    Icon?: any;
    style?: any;
}

const Button = ({ message, Icon, color, style }: ButtonProps) => {

    return (
        <MuiButton style={style} startIcon={Icon} color={color} variant="contained">
            {message}
        </MuiButton>
    );
};

export default Button;