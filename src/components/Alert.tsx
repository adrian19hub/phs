import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



interface Prop extends AlertProps {
    open: boolean;
    onClose: () => void;
}


const Alert = ({ open, onClose, ...props }: Prop) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={4500}
            open={open}
            onClose={onClose}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={onClose}
                {...props}
            />
        </Snackbar>
    )
}

export default Alert;
