
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCardTitle } from '../../../store/slice/trelloListSlice';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
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

    const [showTextModal, setShowTextModal] = useState(false);
    const [showCardModal, setShowCardModal] = useState(false);

    // [TODO] replace temporary solution by updating redux card slice
    const CardCopy = useMemo(() => Object.assign(card), [card]);

    const {order, listOrder} = props

    const dispatch = useDispatch();  
    
    if (!card)
        return null

    // callback
    const handleShowModal = (e, callback, open = false) => {
        e.stopPropagation(); // prevent triggering handleShowCardDetail
        e.preventDefault();
        if (typeof open !== "boolean")
            return
        callback(open)
    }

    const handleChangeTitle = (title) => {
        // console.log('handleChangeTitle', title)

        if (title == null)
            return

        const inputData = {
            listOrder: listOrder,
            cardOrder: order,
            cardId: card.id,
            title: title
        }
        dispatch(updateCardTitle(inputData))
        if(showTextModal)
            setShowTextModal(false)
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
                <EditIcon/>
            </IconContainer>
        </Section>)
    }

    return (
        <Container key={card.id} onClick={event => handleShowModal(event, setShowCardModal, true)}>
            <TextModal open={showTextModal} handleChangeTitle={handleChangeTitle} handleCloseModal={event => handleShowModal(event, setShowTextModal, false)}/>
            <Title/>
            <StatusList/>
            <CardModal card={CardCopy} open={showCardModal}  handleCloseModal={(event) => (handleShowModal(event, setShowCardModal, false))}/>
        </Container>
    )
    
}