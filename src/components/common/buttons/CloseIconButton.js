import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function CloseIconButton() {

    return (
        <IconButton sx={{
            color: '#6c6c6c',
            '&:hover': {
                backgroundColor: '#ebebeb',
            }, 
        }}>
            <CloseIcon fontSize='small'/>
        </IconButton>
    )
}