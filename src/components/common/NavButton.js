import Button from '@mui/material/Button';

export default function NavButton(props) {
    return (
        <Button 
            size="large"
            sx={{
                backgroundColor: 'primary.main',                
                '&:hover': {
                    backgroundColor: 'info.light',
                }, 
            }} 
            {...props}>
        {props.children}
        </Button>
    );
};