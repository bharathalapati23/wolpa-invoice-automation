import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

const SecondPartInfoAccordion = ({ index, secondPartyInfoArr, setsecondPartyInfoArr }) => {
    const classes = useStyles()

    const handleChange = (e, type) => {
        let tempsecondPartyInfoArr = JSON.parse(JSON.stringify(secondPartyInfoArr))

        switch (type) {
            case 'name':
                tempsecondPartyInfoArr[index].name = e.target.value
                setsecondPartyInfoArr(tempsecondPartyInfoArr)
                break;
            case 'collegeId':
                tempsecondPartyInfoArr[index].collegeIdNumber = e.target.value
                setsecondPartyInfoArr(tempsecondPartyInfoArr)
                break;
            case 'collegeName':
                tempsecondPartyInfoArr[index].collegeName = e.target.value
                setsecondPartyInfoArr(tempsecondPartyInfoArr)
                break;
            case 'address':
                tempsecondPartyInfoArr[index].address = e.target.value
                setsecondPartyInfoArr(tempsecondPartyInfoArr)
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
                <Typography>Second Party Info {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.root}>
                    <Typography>Second Party Name</Typography>
                    <TextField label="Name" value={secondPartyInfoArr[index].name} onChange={(e) => handleChange(e, 'name')} />
                    <Typography>College ID or Designation</Typography>
                    <TextField label="College ID/Designation" value={secondPartyInfoArr[index].collegeIdNumber} onChange={(e) => handleChange(e, 'collegeId')} />
                    <Typography>College or Profession Name</Typography>
                    <TextField label="College/Profession Name" value={secondPartyInfoArr[index].collegeName} onChange={(e) => handleChange(e, 'collegeName')} />
                    <Typography>Address</Typography>
                    <TextField label="Address" value={secondPartyInfoArr[index].address} onChange={(e) => handleChange(e, 'address')} />

                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default SecondPartInfoAccordion