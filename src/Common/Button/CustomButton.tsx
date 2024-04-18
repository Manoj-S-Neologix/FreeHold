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
    const buttonClass = disabled ? "disabled-button" : "";

    return (
        <MuiButton
            disabled={disabled}
            onClick={handleClick}
            style={disabled ? undefined : style} // Apply style only if not disabled
            startIcon={Icon}
            color={disabled ? undefined : color} // Apply color only if not disabled
            variant="contained"
            className={buttonClass}
        >
            {message}
        </MuiButton>
    );
};

export default Button;
