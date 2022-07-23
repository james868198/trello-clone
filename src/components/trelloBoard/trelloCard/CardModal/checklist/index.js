import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import CheckCard from './CheckCard'
import TextField from '../../../../common/TextField'
import BasicMenu from '../../../../common/BasicMenu'
import Button from '@mui/material/Button'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {UpdateChecklist, RemoveChecklist, AddTask} from '../../../DataFetch'

const ChecklistContainer = styled.div`
margin-top: 20px;

position: 
width: 100%;
`

const Header = styled.div`
position: relative;
width: 100%;
margin-bottom: 20px;
`

const Body = styled.div`
position: relative;
width: 100%;
margin-top: 5px;
margin-bottom: 5px;
`

const Bottom = styled.div`

`

const TitleContainer = styled.div`
position: relative;
box-sizing: border-box;
padding-right:150px;
`

const LabelIconContainer = styled.div`
position: absolute;
left: -40px;
top: 0;
color: #333333;
`


const DeleteBtnContainer = styled.div`
position: absolute;
right: 0px;
top: -2px; 
`

export default function Checklist({checklist, index}) {


    if(checklist == null)
        return

    // handler

    const handleUpdateName = (text)=> {
        UpdateChecklist(text, checklist.cardId, index)
    }

    const handleAddBtnOnClick = (e)=> {
        e.stopPropagation()
        AddTask(checklist.cardId, index, "default")
    }

    const handleRemoveBtnOnClick = (e)=> {
        e.stopPropagation()
        RemoveChecklist(checklist.cardId, index)
    }

    // components

    const Title = ()=> {
        return(
            <TitleContainer>
                <LabelIconContainer><CheckBoxOutlinedIcon/></LabelIconContainer>
                <TextField fontWeight={'Bold'} text={checklist.name} handleTextFieldOnBlur={handleUpdateName}/>
            </TitleContainer>
            )
    }

    const DeleteBtn = ()=> {
        return(
            <DeleteBtnContainer>
                <Button size="small" variant="contained" color="secondary" onClick={e=>handleRemoveBtnOnClick(e)}>Delete</Button>
            </DeleteBtnContainer>
        )
    }

    const AddBtn = ()=> {
        return(
            <Button size="small" variant="contained" color="secondary" onClick={e=>handleAddBtnOnClick(e)}>Add an item</Button>
        )
    }

    return (
        <ChecklistContainer>
            <Header>
                <Title/>
                <DeleteBtn/>
            </Header>
            <Body>
                {checklist.tasks.map((task, taskIndex) => <CheckCard key={taskIndex} task={task} cardId={checklist.cardId} checklistIndex={index} index={taskIndex}/>)}
            </Body>
            <Bottom>
                <AddBtn/>
            </Bottom>
        </ChecklistContainer>
    )
}