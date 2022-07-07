
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCardTitle } from '../../../store/slice/trelloListSlice';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import TextModal from './TextModal';

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

    const [showEditTitleModal, setShowEditTitleModal] = useState(false);

    const {order, listOrder} = props

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
        e.preventDefault();
        setShowEditTitleModal(true)
        console.log('handleShowEditTitleModal')
    }

    const handleCloseEditTitleModal = (e) => {
        e.stopPropagation(); // prevent triggering handleShowCardDetail
        console.log('handleCloseEditTitleModal')
        setShowEditTitleModal(false)
        // if (newTitle !== "") 
        //     setNewTitle("")
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
            <IconContainer onClick={handleShowEditTitleModal}>
                <EditIcon/>
            </IconContainer>
        </Section>)
    }

    const EditTitleModal = () => {
        if(showEditTitleModal)
            return (<TextModal handleChangeTitle={handleChangeTitle} handleCloseEditTitleModal={handleCloseEditTitleModal}/>)
    }
    return (
        <Container key={order} onClick={handleShowCardDetail}>
            <EditTitleModal/>
            {/* <CssTextField value={newTitle} onChange={handleEditTitle}/> */}
            <Title/>
            <StatusList/>
        </Container>
    )
    
}