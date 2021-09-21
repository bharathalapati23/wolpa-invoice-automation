import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1300px',
        alignItems: 'center'

    },
    generateButtonStyle: {
        marginTop: '10px'
    }

}));

const HomePage = () =>{
    const classes = useStyles()
    const history = useHistory();

    const handleClick = () => history.push('/tenantinvoice');
    const handleOwnerInfo = () => history.push('/ownerinvoice');
    
    return(
        <div className={classes.root}>
            <Box m={8} pt={12}>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Tenant Info
            </Button>
            </Box>
            <Box m={4} pt={6}>
            <Button variant="contained" color="primary" onClick={handleOwnerInfo}>
                Owner Info
            </Button>
            </Box>
        </div>
    )
}
export default HomePage