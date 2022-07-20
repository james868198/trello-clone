import React, { useRef, useState } from 'react';
import styled from 'styled-components'
import ChecklistMenu from './Checklist/ChecklistMenu'

// mui
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider';

// icons
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';

const LABEL_COLOR = '#474747'
const BTN_BG_COLOR = '#dfdfdf'
const BTN_HOVER_BG_COLOR = '#c8c8c8'

const Container = styled.div`
position: relative;
width: 100%;
box-sizing: border-box;
padding: 5px;
display: flex;
flex-direction: column;
`

const Section = styled.div`
position: relative;
width: 100%;
display: inline-flex;
flex-direction: column;
gap: 10px;
margin-bottom: 25px;
`
const Item = styled.div`
position: relative;
width: 100%;
display: inline-box;
`

const Label = styled(Item)`
color: ${LABEL_COLOR};
font-size; 10px;
font-weight: bold;
`

export default function Operations({cardId}) {

    const ModalBtn = (props) => {
        return (
            <Item>
                <Button
                    sx={{
                        justifyContent: "flex-start",
                        fontSize: '14px',
                        paddingLeft: '15px',
                    }}
                    variant="contained" 
                    color="secondary"
                    fullWidth
                    {...props}
                >
                {props.children}
                </Button>
            </Item>
        )
    }

    const Checklist = () => {
        const button = <ModalBtn startIcon={<CheckBoxOutlinedIcon/>}>Checklist</ModalBtn>
 
        return (
            <ChecklistMenu cardId={cardId} button={button}/>
        )
    }
    
    const AddToCards = () => {

        return (
            <Section>
                <Label>Add to card</Label>
                <ModalBtn startIcon={<AccountCircleOutlinedIcon/>}>Members</ModalBtn>
                <ModalBtn startIcon={<BookmarkBorderOutlinedIcon/>}>Labels</ModalBtn>
                <Checklist/>
                <ModalBtn startIcon={<ScheduleOutlinedIcon/>}>Dates</ModalBtn>
                <ModalBtn startIcon={<AttachmentOutlinedIcon/>}>Attachment</ModalBtn>
            </Section>
        )
    }
    const Actions = () => {
        return (
            <Section>
                <Label>Actions</Label>
                <ModalBtn>Move</ModalBtn>
                <ModalBtn>Copy</ModalBtn>
                <ModalBtn>Make template</ModalBtn>
                <ModalBtn>Watch</ModalBtn>
                <Divider/>
                <ModalBtn>Archive</ModalBtn>
                <ModalBtn>Share</ModalBtn>
            </Section>
        )
    }
    return (
        <Container>
            <AddToCards/>
            <Actions/>
        </Container>
    )
}
