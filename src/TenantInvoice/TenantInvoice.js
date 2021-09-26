import React from 'react'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import TenantInfoAccordion from './TenantInfoAccordion'
import OtherItemsInput from './OtherItemsInput'
import PDFHeader from '../PDFHeder';
import exportedObject from '../AutoTables';


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

const initialTenantInfo = {
    name: '',
    dob: '',
    profOrDegree: '',
    compOrInstitute: ''
}

const initialOtherItemObj = {
    name: '',
    fee: ''
}

const TenantInvoice = () => {
    const doc = new jsPDF();
    const classes = useStyles()

    const generatePdf = () => {
        const chargesList = []
        let totalFees = Number(serviceFee)
        chargesList.push([1, 'Service Fee', serviceFee])
        if (isCleaningIncluded) {
            chargesList.push([2, 'Cleaning Fee', cleaningFee])
            totalFees += Number(cleaningFee)
        }
        if (otherItemsArr.length) {
            const startIndex = isCleaningIncluded ? 3 : 2
            otherItemsArr.forEach((otherItem, index) => {
                chargesList.push([startIndex + index, otherItem.name, otherItem.fee])
                totalFees += Number(otherItem.fee)
            })
        }


        // Generate PDF stuff
        PDFHeader({ doc })
        doc.setFont("Calibri", "bold")
        doc.setFontSize(18);
        doc.text("Tenant Profile", 30, 60)
        doc.setFont("Calibri", "normal");
        for (let i = 0; i < tenantInfoArr.length; i++) {
            let yCoord = 75 + i * 60
            if (i > 0) {
                yCoord = yCoord - i * 30
            }
            doc.setFont("Calibri", "bold");
            doc.setFontSize(12);
            doc.text(30, yCoord, `Tenant ${i + 1}`)
            doc.setFont("Calibri", "normal");
            doc.text(30, yCoord + 6, `Name: ${tenantInfoArr[i].name}`)
            doc.text(30, yCoord + 11, `DOB: ${tenantInfoArr[i].dob}`)
            doc.text(30, yCoord + 16, `${isStudent ? 'Degree' : 'Profession'}: ${tenantInfoArr[i].profOrDegree}`)
            doc.text(30, yCoord + 21, `${isStudent ? 'Institute' : 'Company'}: ${tenantInfoArr[i].compOrInstitute}`)

        }
        doc.setFont("calibri", "bold");
        doc.setFontSize(18);
        if (tenantInfoArr.length > 0) {
            doc.text(30, 85 + ((tenantInfoArr.length) * 30), 'Quotation')
        }
        else {
            doc.text(30, 70 + (tenantInfoArr.length * 50), 'Quotation')
        }
        exportedObject.AutoTableTenantInvoice({ doc, chargesList, tenantInfoArr, totalFees })
        doc.save("Tenant Quotation.pdf");
    }

    // States
    const [tenantInfoArr, setTenantInfoArr] = React.useState([])
    const [otherItemsArr, setOtherItemsArr] = React.useState([])
    const [isStudent, setIsStudent] = React.useState(true)
    const [serviceFee, setServiceFee] = React.useState('')
    const [isCleaningIncluded, setIsCleaningIncluded] = React.useState(false)
    const [cleaningFee, setCleaningFee] = React.useState('')

    const handleIsStudentChange = (e) => {
        setIsStudent(e.target.value === 'student')
    }

    const handleServiceFeeChange = (e) => {
        setServiceFee(e.target.value)
    }

    const handleCleaningFeeChange = (e) => {
        setCleaningFee(e.target.value)
    }

    const handleTenantNumberChange = (e) => {
        if (e.target.value < 7) {
            const tenantArr = []
            for (let i = 0; i < e.target.value; i++) {
                tenantArr.push(initialTenantInfo)
            }
            setTenantInfoArr(tenantArr)
        }
    }

    const handleOtherItemsChange = (e) => {
        if (e.target.value < 7) {
            const tempOtherItemsArr = []
            for (let i = 0; i < e.target.value; i++) {
                tempOtherItemsArr.push(initialOtherItemObj)
            }
            setOtherItemsArr(tempOtherItemsArr)
        }
    }

    const handleCLeaningChange = (e) => {
        setIsCleaningIncluded(prevState => !prevState)
    }
    return (
        <div className={classes.root}>
            <RadioGroup name="studentOrProfessional" value={isStudent ? 'student' : 'professional'} onChange={handleIsStudentChange}>
                <FormControlLabel value="student" control={<Radio />} label="Student" />
                <FormControlLabel value="professional" control={<Radio />} label="Professional" />
            </RadioGroup>
            <Typography variant="h7" component="h7">
                Enter number of tenants
            </Typography>
            <TextField label="No. of tenants" type='number' onChange={handleTenantNumberChange} value={tenantInfoArr.length} />
            {tenantInfoArr.map((ele, index) => {
                return (
                    <TenantInfoAccordion index={index} tenantInfoArr={tenantInfoArr} setTenantInfoArr={setTenantInfoArr} key={`tenantinfoaccordion${index}`} />
                )
            })}
            <Typography variant="h7" component="h7">
                Service Fee
            </Typography>
            <TextField label="Service Fee" type='number' onChange={handleServiceFeeChange} value={serviceFee} />
            <Typography variant="h7" component="h7">
                Cleaning Charges
            </Typography>
            <Switch
                checked={isCleaningIncluded}
                onChange={handleCLeaningChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {isCleaningIncluded && <TextField label="Cleaning Charges" type='number' onChange={handleCleaningFeeChange} value={cleaningFee} />}
            <Typography variant="h7" component="h7">
                Enter number of other items
            </Typography>
            <TextField label="No. of other items" type='number' onChange={handleOtherItemsChange} value={otherItemsArr.length} />
            {otherItemsArr.map((ele, index) => {
                return (
                    <OtherItemsInput index={index} otherItemsArr={otherItemsArr} setOtherItemsArr={setOtherItemsArr} key={`otheritemarr${index}`} />
                )
            })}
            <button onClick={generatePdf} className={classes.generateButtonStyle}>
                Generate PDF
            </button>

        </div>
    )
}

export default TenantInvoice
