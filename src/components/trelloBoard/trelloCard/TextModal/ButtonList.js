import styled from 'styled-components';
import Button from '@mui/material/Button';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

const Container = styled.div`
padding-left: 10px;
display:flex;
flex-direction: column;
gap: 10px;

`

const SectionContainer = styled.div`
display: inline-box;
min-width: 120px;
transition: 0.15s padding ease-out;

:hover {
    padding-left: 8px;
}
`

export default function ButtonList() {

    const HandlerOcClick = (action = null) => (e) => {
        e.stopPropagation();
        if (action)
            action()
    }
    const Section = (props) => {
        return (
            <SectionContainer>
                <Button 

                    sx={{
                        fontSize: '14px',
                        background: 'rgba(0,0,0,.5)',
                        '&:hover': {
                            background: 'rgba(0,0,0,1)'
                        }
                    }}
                    
                    {...props}
                >
                    {props.children}
                </Button>
            </SectionContainer>
        )
    }

    const OpenCard = () => {
        return (
            <Section>Open Card</Section>
        )
    }

    const EditLabels = () => {
        return (
            <Section onClick={HandlerOcClick()} startIcon={<LocalOfferOutlinedIcon/>}>Edit Labels</Section>
        )
    }

    const Move = () => {
        return (
            <Section onClick={HandlerOcClick()} startIcon={<ArrowForwardRoundedIcon/>}>Move</Section>
        )
    }

    const Archive = () => {
        return (
            <Section onClick={HandlerOcClick()} startIcon={<ArchiveOutlinedIcon/>}>Archive</Section>
        )
    }
    return(
        <Container>
            <OpenCard/>
            <EditLabels/>
            <Move/>
            <Archive/>
        </Container>
    )
}