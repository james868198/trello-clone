// [TODO]: move button out of basicMenu

import React, { useRef, useState } from 'react';
import styled from 'styled-components'
import TextField from '../../../../common/TextField';
import BasicMenu from '../../../../common/BasicMenu'
import Button from '@mui/material/Button'

const ChecklistMenuSection = styled.div`
position: relative:
max-width: 100%;
margin-top: 8px;
`

export default function ChecklistMenu({button}) {
    const [newTitle, setNewTitle] = useState(null)
    const [textFieldFocus, setTextFieldFocus] = useState(true)

    const handleSaveOnClick = (e) => {
        e.stopPropagation() 
        console.log('handleSaveOnClick', newTitle)
        setNewTitle(null)
        setTextFieldFocus(false)
    }

    const handleTextFieldOnBlur = (text) => {
        if (text)
            setNewTitle(text)
    }

    return(
        <BasicMenu 
            title={'Add checklist'}
            button={button}
        >
        <div>
            <ChecklistMenuSection>
                <TextField text={newTitle} variant='Outlined' handleTextFieldOnBlur={handleTextFieldOnBlur} focus={textFieldFocus} reset/>
            </ChecklistMenuSection>
            <ChecklistMenuSection>
                <Button variant="contained" size="small" fontSize="16px" onClick={(e)=> handleSaveOnClick(e)}>Save</Button>
            </ChecklistMenuSection>
        </div>
        </BasicMenu>
    )
}