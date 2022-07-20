import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateCardDescription, getCardById } from '../../../../store/slice/trelloCardSlice';

import styled from 'styled-components';
import Description from './Description';
import Checklist from './Checklist'
import Operations from './Operations'
import CloseIconButton from '../../../common/buttons/CloseIconButton';
// mui
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';

// icons
import NotesIcon from '@mui/icons-material/Notes';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

const Container = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
max-height: 900px;
overflow-y: scroll;
`
const ContainerInner = styled.div`
position: relative;
background-color: #f5f5f7;
display: flex;
flex-direction: column;
border-radius: 3px;
border: 1px solid #000;
`
const ContainerMargin = styled.div`
margin-left: 60px;
margin-right: 30px;
margin-top: 30px;
`
const TopContainer = styled(ContainerMargin)`
display: inline-box;


`

const BottomContainer = styled(ContainerMargin)`
position: relative;
display: inline-flex;
flex-direction: row;
justify-content: space-between;
`

const BottomContainerLeft = styled.div`
position: relative;
width: 500px;
margin-right: 15px;
display: inline-flex;
flex-direction: column;
`

const BottomContainerRight = styled.div`
position: relative;
min-width: 200px;
display: inline-flex;
flex-direction: column;
`

const LabelContainer = styled.div`
position: relative;
width: 100%;
height: 30px;
color: #212121;
font-weight: bold;
font-size: 1.3rem;
margin-bottom: 16px;
`
const CloseButtonContainer = styled.div`
position: absolute;
right: 7px;
top: 7px;

`

const LabelIconContainer = styled.div`
position: absolute;
left: -40px;
top: 0;
color: #333333;
`

const Section = styled.div`
position: relative;
width: 100%;
margin-bottom: 20px;
`


export default function CardModal({cardId, open, handleCloseModal}) {
    const [showTextField, setShowTextField] = useState(false)
    const card = useSelector(getCardById(cardId))
    const dispatch = useDispatch()
    
    if (card == null) 
        return

    // handlers

    const handleUpdateDescription = (text) => {
        const inputData = {
            cardId: cardId,
            description: text
        }
        dispatch(updateCardDescription(inputData))
    }

    const handleCloseModalOnClick = (e) => {
        e.stopPropagation()
        handleCloseModal()
    }
    
    // components
    const LabelIcon = (props) => {
        return (
            <LabelIconContainer>
                {props.children}
            </LabelIconContainer>
        )
    }

    const CloseButton = () => {
        return (
            <CloseButtonContainer onClick={event => handleCloseModalOnClick(event)}>
                <CloseIconButton/>
            </CloseButtonContainer>
        )
    }
    
    const Label = (props) => {
        return(
            <LabelContainer>
                {props.children}
            </LabelContainer>
            )
    }
    const Title = () => {
        return(
            <Section>
                <Label>
                    <LabelIcon><StickyNote2Icon/></LabelIcon>
                    #{card.id}
                </Label>
                <Label>
                    {card.title}
                </Label>
            </Section>
        )
    }
    const DescriptionSection = () => {
        return(
            <Section> 
                <Label>
                    <LabelIcon><NotesIcon/></LabelIcon>
                    Description
                </Label>
                <Description
                    showTextField={showTextField} 
                    updateShowTextField={setShowTextField} 
                    description={card.description} 
                    handleUpdateDescription={handleUpdateDescription}
                    />
            </Section>
        )
    }
    const ChecklistSection = () => {
        if (card.checklist == null || card.checklist.length === 0)
            return 

        return(
            <Section>
                {card.checklist.map((checklist, index) => {
                    return (<Checklist key={checklist.id} index={index} checklist={checklist}/>)
                })}
            </Section>
        )
    }
    const CommentSection = () => {
        return(
            <Section>
                <Label>
                    <LabelIcon><FormatListBulletedIcon/></LabelIcon>
                    Comment
                </Label>
            </Section>
        )
    }
    const ActivitySection = () => {
        return(
            <Section>
                <Label>
                    <LabelIcon><HistoryToggleOffIcon/></LabelIcon>
                    Activity
                </Label>
            </Section>
        )
    }

    return (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={event => handleCloseModalOnClick(event)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Container>
                <ContainerInner>
                    <TopContainer>
                        <Title/>
                    </TopContainer>
                    <BottomContainer>
                        <BottomContainerLeft>
                            <DescriptionSection/>
                            <ChecklistSection/>
                            <CommentSection/>
                            <ActivitySection/>
                        </BottomContainerLeft>
                        <BottomContainerRight>
                            <Operations cardId={cardId}/>
                        </BottomContainerRight>
                    </BottomContainer>
                    <CloseButton/>
                </ContainerInner>
            </Container>
          </Modal>
      );
}