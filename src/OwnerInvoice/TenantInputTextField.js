import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

const TenantInputTextField = ({ index, tenantInfoArr, setTenantInfoArr }) => {
    const classes = useStyles()

    const handleChange = (e, type) => {
        let tempTenantInfoArr = JSON.parse(JSON.stringify(tenantInfoArr))

        switch (type) {
            case 'name':
                tempTenantInfoArr[index].name = e.target.value
                setTenantInfoArr(tempTenantInfoArr)
                break;

            default:
            // code block
        }

    }

    return (

        <div className={classes.root}>
            <TextField label="Name" value={tenantInfoArr[index].name} onChange={(e) => handleChange(e, 'name')} />
        </div>

    )
}

export default TenantInputTextField