
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCardById } from '../../../store/slice/trelloCardSlice';
import { useDNDContext }  from '../DNDContext';
import styled from 'styled-components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextModal from './TextModal';
import CardModal from './CardModal';

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
flex-wrap: nowrap;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const TitleContainer = styled.span`
position: relative;
margin-left: 10px;
width: 80%;
text-overflow: ellipsis;
white-space: nowrap;
overflow:hidden;
text-align:left;
`


export const IconContainer = styled.span`
position: absolute;
right: -10px;
border-radius: 3px;
margin-right: 15px;
display: none;

:hover {
    background-color: #FCFCFC;
}
`

export const Container = styled.div`
position: relative;
width: 100%;
height: 36px;
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

export default function TrelloCard({cardId, ...props}) {

    const [showTextModal, setShowTextModal] = useState(false);
    const [showCardModal, setShowCardModal] = useState(false);
    const card = useSelector(getCardById(cardId));
    const {
        draggedCard,
        handleCardOnDragEnter
      } = useDNDContext()
    if (!card)
        return null

    // callback
    const handleShowModal = (e, callback, open = false) => {
        e.stopPropagation(); 
        e.preventDefault();
        if (typeof open !== "boolean")
            return
        callback(open)
    }

    // component
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
            <IconContainer onClick={event => handleShowModal(event, setShowTextModal, true)}>
                <EditOutlinedIcon sx={{fontSize: '22px'}}/>
            </IconContainer>
        </Section>)
    }

    return (
        <Container draggable 
            key={card.id} 
            id={cardId} 
            onDragEnter={event => handleCardOnDragEnter(event, props.index, card.listId)} 
            onClick={event => handleShowModal(event, setShowCardModal, true)}
            >
            <TextModal cardId={cardId} open={showTextModal} handleCloseModal={() => setShowTextModal(false)}/>
            <Title/>
            <StatusList/>
            <CardModal cardId={cardId} open={showCardModal}  handleCloseModal={() => setShowCardModal(false)}/>
        </Container>
    )
    
}