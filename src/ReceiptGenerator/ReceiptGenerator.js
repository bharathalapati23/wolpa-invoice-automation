import React from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { makeStyles } from '@material-ui/styles';
import PDFHeader from '../PDFHeder';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



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

const ReceiptGenerator = () => {
    const doc = new jsPDF();
    const classes = useStyles()

    const generatereceipt = () => {
        let pDate = new Date(paymentDate)
        const DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        let paymentDateFormat = pDate.toLocaleDateString('en-US', DATE_OPTIONS)
        PDFHeader({ doc })
        doc.setFont("Calibri", "bold")
        doc.setFontSize(18);
        doc.text("Receipt", 30, 58)
        doc.setFont("Calibri", "normal")
        doc.setFontSize(12);
        doc.text("Tenant Name: " + tenantName, 30, 68)
        doc.text("Received with thanks ", 30, 80)
        doc.setFont("Calibri", "bold")
        doc.text("INR " + ammountRecieved + "/- ", 67.5, 80)
        doc.setFont("Calibri", "normal")
        doc.text("vide " + transferMode + " Transaction bearing ID No. " + transactionID, 90.5, 80)
        doc.text("dated " + paymentDateFormat + " blocking your stay in Manipal.", 30, 85)
        doc.setFontSize(9);
        doc.text("Note: This a computer generated receipt hence doesn't require signatures. ", 30, 100)
        doc.setFontSize(12);
        doc.text("Thank you.\nWolpa Team", 30, 115)
        doc.text("Follow us for updates:", 30, 185)
        doc.setTextColor("blue");
        doc.text("https://www.instagram.com/wolpa.in", 30, 190)
        doc.setDrawColor(0, 0, 255);
        doc.line(30, 191, 94, 191);
        doc.text("https://www.facebook.com/wolpamanipal", 30, 195)
        doc.setDrawColor(0, 0, 255);
        doc.line(30, 196, 102, 196);
        doc.save("Receipt.pdf")
    }

    const [tenantName, setTenantName] = React.useState('')
    const [ammountRecieved, setAmmountRecieved] = React.useState('')
    const [transactionID, setTransactionID] = React.useState('')
    const [paymentDate, setPaymentDate] = React.useState('')
    const [transferMode, setTransferMode] = React.useState('neft')

    const handleTenantName = (e) => {
        setTenantName(e.target.value)
    }
    const handleAmmountRecieved = (e) => {
        setAmmountRecieved(e.target.value)
    }
    const handleTransactionID = (e) => {
        setTransactionID(e.target.value)
    }
    const handlePaymentDate = (e) => {
        setPaymentDate(e.target.value)
    }

    return (
        <div className={classes.root}>
            <Typography variant="h7" component="h7"></Typography>
            Tenant's Name
            <TextField label="Tenant Name" type='text' onChange={handleTenantName} value={tenantName} />
            <Typography variant="h7" component="h7">
                Ammount Recieved
            </Typography>
            <TextField label="Ammount Recieved" type='Number' onChange={handleAmmountRecieved} value={ammountRecieved} />
            <Typography variant="h7" component="h7">
                Transfer Mode
            </Typography>
            <RadioGroup name="Transaction Mode" value={transferMode} onChange={(e) => setTransferMode(e.target.value)} >
                <FormControlLabel value="NEFT" control={<Radio />} label="Neft" />
                <FormControlLabel value="Wire Transfer" control={<Radio />} label="Wire Transfer" />
                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
            </RadioGroup>
            <Typography variant="h7" component="h7">
                Transaction ID
            </Typography>
            <TextField label="Transaction ID" type='text' onChange={handleTransactionID} value={transactionID} />
            <Typography variant="h7" component="h7">
                Payment Date
            </Typography>
            <TextField type='date' onChange={handlePaymentDate} value={paymentDate} />
            <button onClick={generatereceipt} className={classes.generateButtonStyle}>
                Generate Receipt
            </button>
        </div>
    )
}

export default ReceiptGenerator;