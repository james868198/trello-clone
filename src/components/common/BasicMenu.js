import * as React from 'react';
import styled from 'styled-components';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

const FONTSIZE = '18px'

const Container = styled(Menu)`
font-size: ${FONTSIZE};
.MuiMenu-paper {
    background-color: #ffffff;

}
`

const MenuContainer = styled.div`
width: 320px; 
`

const MenuTitleContainer = styled.div`
text-align: center;
color: #6d6d6d;
display:flex;
flex-direction:row;
justify-content: center;
align-items: center;
height: 46px;
`
const CloseButtonContainer = styled.div`
position: absolute;
right: 22px;
top: 22px;
`

export default function MoreMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {items, title} = props
  const handleClick = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (callback = null) => (e) =>{
    e.stopPropagation(); 
    e.preventDefault();
    setAnchorEl(null);
    if (callback)
      callback()
  };

  // components

  const MenuTitle = () => {
    if (title)
      return (
        <MenuTitleContainer>{title}</MenuTitleContainer>

      )
  }
  const MenuItems = () => {
    if (Array.isArray(items))
      return items.map(item => 
        <MenuItem 
            sx={{
                fontSize: '16px'
            }}
            key={item.name} 
            onClick={handleClose(item.handler)}>
                {item.name}
        </MenuItem>)
  }
  const CloseButton = () => {
    return (
        <CloseButtonContainer onClick={handleClose()}>
            <CloseIcon sx={{cursor: 'pointer', fontSize: '20px', color: '#757575'}}/>
        </CloseButtonContainer>
    )
  }
  return (
    <>
      <div
       aria-controls={open ? 'basic-menu' : undefined}
       aria-haspopup="true"
       aria-expanded={open ? 'true' : undefined}
       onClick={handleClick}
      >
        {props.children}
      </div>
      <Container
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuContainer>
            <CloseButton/>
            <MenuTitle/>
            <Divider/>
            <MenuItems/>
        </MenuContainer>
      </Container>
    </>
  );
}
