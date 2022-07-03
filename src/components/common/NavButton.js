import Button from '@mui/material/Button';

export default function NavButton(props) {
    return (
        <Button 
            size="large"
            sx={{
                backgroundColor: 'primary.light',
                color: 'white', 
                whiteSpace: 'nowrap',
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
    );
};