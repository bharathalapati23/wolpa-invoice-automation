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
        chargesList.push(['', 'Total', totalFees])


        // Generate PDF stuff
        doc.addImage("data:image/png;base64,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",
            "PNG", 10, 10, 40, 60);
        doc.text("Wolpa Accomodation Services", 55, 10);
        doc.text("Manipal - 576104", 55, 20);
        doc.text("P: +91 9591798639 | E: hello@wolpa.in", 55, 30)
        doc.text("www.wolpa.in", 55, 40)

        for (let i = 0; i < tenantInfoArr.length; i++) {
            let yCoord = 90 + i * 60
            doc.text(10, yCoord, `Tenant ${i + 1}`)
            doc.text(10, yCoord + 10, `Name: ${tenantInfoArr[i].name}`)
            doc.text(10, yCoord + 20, `DOB: ${tenantInfoArr[i].dob}`)
            doc.text(10, yCoord + 30, `${isStudent ? 'Degree' : 'Profession'}: ${tenantInfoArr[i].profOrDegree}`)
            doc.text(10, yCoord + 40, `${isStudent ? 'Institute' : 'Company'}: ${tenantInfoArr[i].compOrInstitute}`)
        }

        doc.text(10, 90 + (tenantInfoArr.length * 60), 'Quotation')
        doc.autoTable({ html: '#my-table' })
        doc.autoTable({
            body: chargesList,
            startY: 90 + (tenantInfoArr.length * 60) + 20,
        })
        doc.save("a4.pdf");
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
