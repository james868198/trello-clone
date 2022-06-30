
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCardTitle } from '../../../store/slice/trelloListSlice';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




export const Status = styled.div`
position: relative;
width: 100%;
margin: 5px;
`

export const StatusIcon = styled.div`
position: relative;
`

export const Section = styled.div`
position: relative;
width: 100%;
height: 30px;
padding-left:10px;
padding-right:10px;
flex-wrap: nowrap;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const TitleContainer = styled.span`
position: relative;
width: 80%;
text-overflow: ellipsis;
white-space: nowrap;
overflow:hidden;
text-align:left;
`


export const IconContainer = styled.span`
position: relative;
border-radius: 3px;
margin-right: 15px;
display: none;
:hover {
    background-color: #FCFCFC;
}
`

export const Modal = styled.div`
position: absolute; /* Stay in place */
z-index: 2; /* Sit on top */
width: 100%; /* Full width */
height: 100%; /* Full height */
`

export const ModalBackground = styled.div`
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.6); /* Black w/ opacity */
`

export const ModalDialog = styled.div`
position: relative;
z-index: 999; /* Sit on top */
width: 110%; /* Full width */
transform: translateX(-5%);

`

const CssTextField = styled(TextField)`
position: relative;
width: 100%;
  & .MuiOutlinedInput-root {
    position: relative;
    width: 100%;
    background-color: white;
    
    color: black;
    border: none;
    // &.Mui-focused fieldset {
    //   border: none;
    // }
  }
`

const CssButton = styled.div`
position: relative;
margin-top: 2px;
width: 100%;
text-align: left;
`

export const CardContainer = styled.div`
position: relative;
width: 100%;
border-radius: 3px;
background-color: #ffffff;
box-shadow: 0 1px 3px #8C8C8C;
cursor: pointer;
display: flex;
flex-direction: column;
justify-content: space-around;

&:hover {
    background-color: #EDEDED; 
}

&:hover ${IconContainer} {
    display: inline;
}

`

export default function TrelloCard({card, ...props}) {

    const [showEditTitleModal, setShowEditTitleModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const {order, listOrder, MouseIn} = props

    const dispatch = useDispatch();  
    
    if (!card)
        return null


    const handleShowCardDetail = (e) => {
        if(showEditTitleModal)
            return
        console.log('handleShowCardDetail', e)
    }

    const handleShowEditTitleModal = (e) => {
        e.stopPropagation(); // prevent triggering handleShowCardDetail
        setShowEditTitleModal(true)
        console.log('handleShowEditTitleModal')
    }

    const handleCloseEditTitleModal = (e) => {
        e.stopPropagation(); // prevent triggering handleShowCardDetail
        console.log('handleCloseEditTitleModal')
        setShowEditTitleModal(false)
        if (newTitle !== "") 
            setNewTitle("")
    }

    const handleEditTitle = (e) => {
        // console.log('handleEditTitle', e.target.value, order)
        // if (e.target.value !== newTitle) 
        //     setNewTitle(e.target.value)
        setNewTitle(e.target.value)
    }

    const handleChangeTitle = () => {
        console.log('handleChangeTitle', newTitle)
        const inputData = {
            listOrder: listOrder,
            cardOrder: order,
            cardId: card.id,
            title: newTitle
        }
        dispatch(updateCardTitle(inputData))
        if(showEditTitleModal)
            setShowEditTitleModal(false)
    }
    
    const StatusList = () => {
        if(!card.status) {
            return
        }

        const StatusIcons = card.status.map((status) => {
            return <StatusIcon></StatusIcon>
        })
        return (
        <Section>
            <Status>
                <StatusIcons/>
            </Status>
        </Section>
        )
    }

    const Title = () => {

        return (
        
        <Section>  
            <TitleContainer>
                {card.title}
            </TitleContainer>
            <IconContainer className="showIcon" onClick={handleShowEditTitleModal}>
                <EditIcon/>
            </IconContainer>
            
        </Section>)
    }

    const EditTitleModal = () => {
        if(!showEditTitleModal)
            return

        return (
            <Modal>
                <ModalBackground onClick={handleCloseEditTitleModal}></ModalBackground>
                <ModalDialog>
                    <CssTextField value={newTitle} onChange={handleEditTitle} autoFocus/>
                    <CssButton><Button  variant="contained" onClick={handleChangeTitle}>Save Change</Button></CssButton>
                </ModalDialog>
            </Modal>
        )
    }
    return (
        <CardContainer key={order} onClick={handleShowCardDetail}>
            <EditTitleModal/>
            {/* <CssTextField value={newTitle} onChange={handleEditTitle}/> */}
            <Title/>
            <StatusList/>
        </CardContainer>
    )
    
}