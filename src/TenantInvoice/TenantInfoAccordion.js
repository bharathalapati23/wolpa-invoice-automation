import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

const TenantInfoAccordion = ({ index, tenantInfoArr, setTenantInfoArr }) => {
    const classes = useStyles()

    const handleChange = (e, type) => {
        let tempTenantInfoArr = JSON.parse(JSON.stringify(tenantInfoArr))

        switch (type) {
            case 'name':
                tempTenantInfoArr[index].name = e.target.value
                setTenantInfoArr(tempTenantInfoArr)
                break;
            case 'dob':
                tempTenantInfoArr[index].dob = e.target.value
                setTenantInfoArr(tempTenantInfoArr)
                break;
            case 'profOrDegree':
                tempTenantInfoArr[index].profOrDegree = e.target.value
                setTenantInfoArr(tempTenantInfoArr)
                break;
            case 'compOrInstitute':
                tempTenantInfoArr[index].compOrInstitute = e.target.value
                setTenantInfoArr(tempTenantInfoArr)
                break;
            default:
            // code block
        }

    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Tenant Info {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.root}>
                    <TextField label="Name" value={tenantInfoArr[index].name} onChange={(e) => handleChange(e, 'name')} />
                    <Typography>DOB</Typography>
                    <TextField type="date" value={tenantInfoArr[index].dob} onChange={(e) => handleChange(e, 'dob')}/>
                    <TextField label="Profession or Degree" value={tenantInfoArr[index].profOrDegree} onChange={(e) => handleChange(e, 'profOrDegree')}/>
                    <TextField label="Company or Institute" value={tenantInfoArr[index].compOrInstitute} onChange={(e) => handleChange(e, 'compOrInstitute')}/>

                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default TenantInfoAccordion
