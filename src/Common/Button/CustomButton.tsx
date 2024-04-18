import { Button as MuiButton } from "@mui/material";
import React from 'react';

interface ButtonProps {
    message: string;
    color?: any;
    Icon?: any;
    style?: any;
    handleClick?: any;
    disabled?: any;
}

const Button = ({ message, Icon, color, style, handleClick, disabled }: ButtonProps) => {

    return (
        <MuiButton disabled={disabled} onClick={handleClick} style={style} startIcon={Icon} color={color} variant="contained">
            {message}
        </MuiButton>
    );
};

export default Button;