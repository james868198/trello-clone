import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

// mui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilterListIcon from '@mui/icons-material/FilterList';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export const Container = styled.div`
position: relative;
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
align-items:center;

`

export const ContainerLeft = styled.div`
position: relative;
width: 50%;
display: inline-flex;
flex-direction: row;
justify-content: flex-start;
align-items: inherit;
`
export const ContainerRight = styled.div`
position: relative;
width: 40%;
display: inline-flex;
flex-direction: row;
justify-content: flex-end;
align-items: inherit;
`

export const Section = styled.div`
display: inline-flex;
position: relative;
margin: 5px;
`

export default function TrelloBoardNav({title, ...props}) {

    // states

    const [titleEditable, setTitleEditable] = useState(false)


    // componentssx={{
    
    const BoardDivider = (props) => {
        return (
            <Section>
                <Divider sx={{width: '20px', color: 'black'}} orientation="vertical" variant="middle" flexItem/>
            </Section>
        );
    };

    const BoardNavBtn = (props) => {
        return (
            <Section>
                <Button 
                    size="large"
                    sx={{
                        backgroundColor: 'primary.light',
                        color: 'white', 
                        textTransform: 'capitalize',
                        fontFamily: 'Helvetica Neue',
                        maxHeight: '2.5rem',
                        '&:hover': {
                            backgroundColor: 'info.light',
                        }, 
                    }} 
                    {...props}>
                {props.children}
                </Button>
            </Section>
        );
    };

    const BoardTemplate = () => {
        return (
            <BoardNavBtn endIcon={<KeyboardArrowDownIcon />}>Board</BoardNavBtn>
        );
    };

    const Title = () => {
        let Content = () => <h3>{title}</h3>;
        return (                
            
            <Section>
                <Content/>
            </Section>
        );
    };

    const Star = () => {
        return (
            <Section><StarOutlineIcon/></Section>
        );
    };

    const PrivacySector = () => {

    };

    const Profile = () => {

    };

    const Share = () => {

    };

    const AddOn = () => {
        return (
            <BoardNavBtn startIcon={<RocketLaunchIcon />}>Power-Ups</BoardNavBtn>
        );
    };

    const Automation = () => {
        return (
            <BoardNavBtn startIcon={<FlashOnIcon />}>Automation</BoardNavBtn>
        );
    };

    const Filter = () => {
        return (
            <BoardNavBtn startIcon={<FilterListIcon />} >Filter</BoardNavBtn>
        );
    };

    const ShowMenu = () => {
        return (
            <BoardNavBtn startIcon={<MoreHorizIcon />} >Show menu</BoardNavBtn>
        );
    };

    // handlers

    const handleEditTitle = () => {

    };

    return (
        <Container>
            <ContainerLeft>
                <BoardTemplate/>
                <Title/>
                <Star/>
                <BoardDivider/>
            </ContainerLeft>
            <ContainerRight>
                <AddOn/>
                <Automation/>
                <BoardDivider/>
                <Filter/>
                <ShowMenu/>
            </ContainerRight>
        </Container>
    );
}

