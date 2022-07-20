
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'

const TextFieldContainer = styled.input`
position: relative;
width: 100%;
box-sizing: border-box;
font-weight: ${({fontWeight})=> fontWeight ? fontWeight : 'Normal'};
font-size:${({fontSize})=> fontSize ? fontSize : '22px'};
color: #2d2d2d;
cursor: pointer;
border-radius: 3px;
&:focus {
    cursor: text;
}
${({variant})=> {
    if (variant === 'Normal') {
        return `
        background-color: white;
        &:focus {
          background-color: white;
          cursor: text;
        }`
    } else if (variant === 'Outlined') {
        return `
        border: 2px solid #e4e4e4;
        background-color: #fafbfc;
        padding-left: 10px;
        &:hover {
            background-color: #e4e4e4;
        }
        &:focus {
          background-color: white;
          cursor: text;
        }`
    } else {
        return `
        border: none;
        background-color: transparent;
        cursor: pointer;
        &:focus {
          background-color: white;
          cursor: text;
        }`
    }


}};
`
export default function TextField({text, handleTextFieldOnBlur,focus, ...props}) {
    const inputRef = useRef(null)
    
    useEffect(() => {
        if (inputRef && focus)
            inputRef.current.focus()
        else
            inputRef.current.blur()
    },[focus]);

    useEffect(() => {        
        if (inputRef)
            inputRef.current.value = text
                
    },[text]);
    
    const handleOnBlur = (e) => {
        e.stopPropagation() 
        // e.preventDefault();
        if(handleTextFieldOnBlur != null && inputRef && inputRef.current && inputRef.current.value)
            handleTextFieldOnBlur(inputRef.current.value) 
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          if (e.target)
            e.target.blur()
        }
    }
 
    return (
        <TextFieldContainer 
            ref={inputRef}
            onBlur={event => handleOnBlur(event)} 
            onKeyDown={event => handleKeyDown(event)}
            variant={props.variant}
            fontSize={props.fontSize}
            fontWeight={props.fontWeight}
        />
    )

} 