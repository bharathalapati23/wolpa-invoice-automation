import React from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SecondPartInfoAccordion from './SecondPartInfoAccordion';
import ItemsProvidedInput from './ItemsProvidedInput';
import PDFHeader from '../PDFHeder';
import exportedObject from '../AutoTables';
import DefaultItemsCheckBox from './DefaultItemsCheckBox';
import { Switch } from '@material-ui/core';

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
const InitialsecondPartyInfo = {
    name: '',
    collegeIdNumber: '',
    collegeName: '',
    address: ''
}
const initialOtherItemObj = {
    name: '',
    qty: ''
}

const DraftTermsInvoice = () => {
    const doc = new jsPDF();
    const classes = useStyles()
    const leftMargin = 30
    const rightMargin = 15
    const pdfInMM = 210


    const generatePdf = () => {
        //variables
        let lDate = new Date(leaseDate)
        let startDate = new Date(leaseStartDate)
        let endDate = new Date(leaseEndDate)
        const DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        let leaseDateFormat = lDate.toLocaleDateString('en-US', DATE_OPTIONS)
        let lStartDate = startDate.toLocaleDateString('en-US', DATE_OPTIONS)
        let lEndDate = endDate.toLocaleDateString('en-US', DATE_OPTIONS)
        let yCoord2 = (secondPartyInfoArr.length * 15) + 46.5
        let itemsTableList = []
        for (let j = 0; j < itemProvidedArr.length; j++) {
            itemsTableList.push([j + 1, itemProvidedArr[j].name, itemProvidedArr[j].qty])
        }
        let yCoord3 = 100 + (5 * (itemProvidedArr.length + 1)) + (2 * itemProvidedArr.length)
        let converter = require('number-to-words');
        let agreementPeriodWord = converter.toWords(agreementPeriod)
        agreementPeriodWord = agreementPeriodWord.charAt(0).toUpperCase() + agreementPeriodWord.slice(1);
        let securityDepositWord = converter.toWords(securityDeposite)
        let rentWord = converter.toWords(rent)
        if (itemProvidedArr.length > 23) {
            yCoord3 = (((itemProvidedArr.length % 23) + 1) * 7) + 50
        }

        //jspsf
        PDFHeader({ doc })
        doc.setFont("Calibri", "bold")
        doc.setFontSize(12);
        doc.text("Rental Agreement for " + agreementPeriodWord + " Months", 30, 57)
        doc.setFont("Calibri", "normal")
        doc.text("This agreement of lease dated " + leaseDateFormat + ", between", 30, 62)
        let firstPartyInfo = doc.splitTextToSize("1." + firstPartyName + ", " + firstPartyAddress, (pdfInMM - leftMargin - rightMargin))
        doc.text(firstPartyInfo, leftMargin, 69)
        doc.text('hereinafter called the ', 30, firstPartyInfo.length * 5 + 69)
        doc.setFont("Calibri", "bold")
        doc.setFontSize(12);
        doc.text('“The First Party”', 67, firstPartyInfo.length * 5 + 69)
        doc.setFont("Calibri", "normal")
        doc.text("- AND -", 30, firstPartyInfo.length * 5 + 79)
        for (let i = 0; i < secondPartyInfoArr.length; i++) {
            let yCoord = 95 + i * 15
            let secondPersonInfo = doc.splitTextToSize((i + 1) + ". " + secondPartyInfoArr[i].name + ", " + secondPartyInfoArr[i].collegeIdNumber + ", " + secondPartyInfoArr[i].collegeName + "\nC/O " + secondPartyInfoArr[i].address, (pdfInMM - leftMargin - rightMargin))
            doc.text(secondPersonInfo, leftMargin, yCoord)
        }
        console.log(secondPartyInfoArr.length)
        doc.text('hereinafter called the ', 30, secondPartyInfoArr.length * 2.5 + yCoord2 + 43)
        doc.setFont("Calibri", "bold")
        doc.setFontSize(12);
        doc.text('“The Second Party”', 67, secondPartyInfoArr.length * 2.5 + yCoord2 + 43)
        doc.text("Terms and Conditions", 30, yCoord2 + 60)
        doc.setFont("Calibri", "normal")
        doc.text("1. The First Party has to lease out the said flat to the Second Party for the period of " + agreementPeriod + " (" + agreementPeriodWord + ")", 30, yCoord2 + 67)
        doc.text("  months commencing from " + lStartDate + " till " + lEndDate, 33, yCoord2 + 72)
        doc.text("2. A security deposit of INR " + securityDeposite + "/- (Rupees " + securityDepositWord + " only) has been paid to the", 30, yCoord2 + 77)
        doc.text("  first party in respect of said residential house by the second party at the time of\n  surrendering vacant possession of the said residential flat by the Second Party in favour of\n  the First Party free of interest subject to the deduction of agreed dues from the Second\n  Party towards monthly rent, if any and anticipated electric bill or any agreed damages etc.", 33, yCoord2 + 82)
        doc.text("3. The Second Party has to pay rent of INR " + rent + "/- (Rupees " + rentWord + " only) per ", 30, yCoord2 + 102)
        doc.text("  month to the First Party.", 33, yCoord2 + 107)
        doc.text("4. The Second Party has agreed to pay the rent of " + rent + "/- (Rupees " + rentWord + " only)", 30, yCoord2 + 112)
        doc.text("  every month through account transfer by the last working day of every month.", 33, yCoord2 + 117)
        doc.text("5. All the electricity and gas charges will be paid by the Second Party.", 30, yCoord2 + 122)
        doc.text("6. Air conditioner maintenance charges if any required during the period would be deducted", 30, yCoord2 + 127)
        doc.text("  from the security deposit.", 33, yCoord2 + 132)
        doc.text("7. Any damages caused to the flat by the negligence of the Second Party during the period", 30, yCoord2 + 137)
        doc.text("  of occupancy shall be repaired by the Second Party or in the absence of which shall be made \n  good by the Second Party allowing reasonable wear and tear. The Second Party shall be fully \n  responsible for any kind of damages caused to the Furniture & Electronic items and fixtures, \n  paints, etc., the First Party has the right to reimburse the full amount from the Second Party.", 33, yCoord2 + 142)
        if (isClauseIncluded === true) {
            let clauseDescription = doc.splitTextToSize("8. " + clause, (pdfInMM - leftMargin - rightMargin))
            doc.text(clauseDescription, leftMargin, yCoord2 + 162)
        }
        doc.addPage()
        doc.setFont("Calibri", "bold")
        doc.text("Description of Schedule Premises", 30, 30)
        doc.setFont("Calibri", "normal")
        let premisesDescription = doc.splitTextToSize("One Residential Flat Premises bearing Flat No. " + flatNumber + " measuring " + premisesDimention + " sq. ft. super built up area with car parking slot No. " + parkingSlot + " bearing Muncipal Door No. " + muncipalDoorNumber + ", of Udupi City Muncipality situated in the " + floorNumber + " Floor of " + premisesAddress, (pdfInMM - leftMargin - rightMargin))
        doc.text(premisesDescription, leftMargin, 35)
        doc.setFont("Calibri", "bold")
        doc.text("Schedule of Fittings, Furnishings and all Fixtures", 30, 60)
        doc.setFont("Calibri", "normal")
        let tableDescription = doc.splitTextToSize("Fittings & Movables provided to the residential house by name Flat Number " + flatNumber + ", " + premisesAddress + " include the below.", (pdfInMM - leftMargin - rightMargin))
        doc.text(tableDescription, leftMargin, 65)
        exportedObject.AutoTableDraftTermsInvoice({ doc, itemsTableList })
        doc.text("IN WITNESS WHEREOF, the parties hereunto signed on the day and the year first above written ", 30, yCoord3)
        doc.text("Signature of Lessor", 30, yCoord3 + 10)
        doc.text("Signature of Lessee", 150, yCoord3 + 10)
        doc.setFont("Calibri", "bold")
        doc.text("Witnesses", 30, yCoord3 + 42)
        doc.save("Draft Terms.pdf");
    }

    //States
    const [agreementPeriod, setAgreementPeriod] = React.useState('')
    const [leaseDate, setLeaseDate] = React.useState('')
    const [firstPartyName, setFirstPartyName] = React.useState('')
    const [firstPartyAddress, setFirstPartyAddress] = React.useState('')
    const [secondPartyInfoArr, setsecondPartyInfoArr] = React.useState([])
    const [leaseStartDate, setLeaseStartDate] = React.useState('')
    const [leaseEndDate, setLeaseEndDate] = React.useState('')
    const [securityDeposite, setSecurityDeposit] = React.useState('')
    const [rent, setRent] = React.useState('')
    const [itemProvidedArr, setItemProvidedArr] = React.useState([])
    const [flatNumber, setFlatNumber] = React.useState('')
    const [premisesDimention, setPremisesDimention] = React.useState('')
    const [parkingSlot, setParkingSlot] = React.useState('')
    const [muncipalDoorNumber, setMuncipalDoorNumber] = React.useState('')
    const [floorNumber, setFloorNumber] = React.useState('')
    const [premisesAddress, setPremisesAddress] = React.useState('')
    const [isClauseIncluded, setIsClauseIncluded] = React.useState(false)
    const [clause, setClause] = React.useState('')

    //Handle Events
    const handleAgreementPeriod = (e) => {
        setAgreementPeriod(e.target.value)
    }
    const handleLeaseChange = (e) => {
        setLeaseDate(e.target.value)
    }
    const handleFirstPartyName = (e) => {
        setFirstPartyName(e.target.value)
    }
    const handleFirstPartyAddress = (e) => {
        setFirstPartyAddress(e.target.value)
    }
    const handleSecondPartyNumberChange = (e) => {
        if (e.target.value < 7) {
            const secondPartyInfoArr = []
            for (let i = 0; i < e.target.value; i++) {
                secondPartyInfoArr.push(InitialsecondPartyInfo)
            }
            setsecondPartyInfoArr(secondPartyInfoArr)
        }
    }
    const handleLeaseStartDate = (e) => {
        setLeaseStartDate(e.target.value)
    }
    const handleLeaseEndDate = (e) => {
        setLeaseEndDate(e.target.value)
    }
    const handleSecurityDeposit = (e) => {
        setSecurityDeposit(e.target.value)
    }
    const handleRent = (e) => {
        setRent(e.target.value)
    }
    const handleItemProvidedChange = (e) => {
        const tempItemProvidedArr = []
        for (let i = 0; i < e.target.value; i++) {
            tempItemProvidedArr.push(initialOtherItemObj)
        }
        setItemProvidedArr(tempItemProvidedArr)
    }
    const handleFlatNumber = (e) => {
        setFlatNumber(e.target.value)
    }
    const handlePremisesDimention = (e) => {
        setPremisesDimention(e.target.value)
    }
    const handleParkingSlot = (e) => {
        setParkingSlot(e.target.value)
    }
    const handleMuncipalDoorNumber = (e) => {
        setMuncipalDoorNumber(e.target.value)
    }
    const handleFloorNumber = (e) => {
        setFloorNumber(e.target.value)
    }
    const handlePremisesAddress = (e) => {
        setPremisesAddress(e.target.value)
    }
    const handleClauseChange = (e) => {
        setIsClauseIncluded(prevState => !prevState)
    }
    const handleClause = (e) => {
        setClause(e.target.value)
    }

    return (
        <div className={classes.root}>
            <Typography variant="h7" component="h7"></Typography>
            Agreement Period
            <TextField label="Agreement Period" type='number' onChange={handleAgreementPeriod} value={agreementPeriod} />
            <Typography variant="h7" component="h7">
                Agreement lease Date
            </Typography>
            <TextField type='date' onChange={handleLeaseChange} value={leaseDate} />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>First Party Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.root}>
                        <Typography>First Party Name</Typography>
                        <TextField label="First Party Name" value={firstPartyName} onChange={handleFirstPartyName} />
                        <Typography>Permanent Adress</Typography>
                        <TextField label="Permanent Address" value={firstPartyAddress} onChange={handleFirstPartyAddress} />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Typography variant="h7" component="h7">
                Number of Second Party
            </Typography>
            <TextField label="No. of Second Party" type='number' onChange={handleSecondPartyNumberChange} value={secondPartyInfoArr.length} />
            {secondPartyInfoArr.map((ele, index) => {
                return (
                    <SecondPartInfoAccordion index={index} secondPartyInfoArr={secondPartyInfoArr} setsecondPartyInfoArr={setsecondPartyInfoArr} key={`secondpartyinfoaccordion${index}`} />
                )
            })}
            <Typography variant="h7" component="h7">
                Lease Period
            </Typography>
            <TextField type='date' onChange={handleLeaseStartDate} value={leaseStartDate} />
            <Typography variant="h7" component="h7">
                To
            </Typography>
            <TextField type='date' onChange={handleLeaseEndDate} value={leaseEndDate} />
            <Typography variant="h7" component="h7">
                Security Deposit
            </Typography>
            <TextField label="Security Deposite" onChange={handleSecurityDeposit} value={securityDeposite} />
            <Typography variant="h7" component="h7">
                Rent
            </Typography>
            <TextField label="Rent" type='number' onChange={handleRent} value={rent} />
            <Typography variant="h7" component="h7">
                Extra Clause
            </Typography>
            <Switch
                checked={isClauseIncluded}
                onChange={handleClauseChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {isClauseIncluded && <TextField label="Clause" type='text' onChange={handleClause} value={clause} />}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Description of Premises</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.root}>
                        <Typography>Flat Number</Typography>
                        <TextField label="Flat Number" value={flatNumber} onChange={handleFlatNumber} />
                        <Typography>Dimentions Of Premises</Typography>
                        <TextField label="Premises Dimentions(sq. ft.)" value={premisesDimention} onChange={handlePremisesDimention} />
                        <Typography>Parking Slot Number</Typography>
                        <TextField label="Parking Slot Number" value={parkingSlot} onChange={handleParkingSlot} />
                        <Typography>Muncipal Door Number</Typography>
                        <TextField label="Muncipal Door Number" value={muncipalDoorNumber} onChange={handleMuncipalDoorNumber} />
                        <Typography>Floor Number</Typography>
                        <TextField label="Floor Number(words)" value={floorNumber} onChange={handleFloorNumber} />
                        <Typography>Premises Adress</Typography>
                        <TextField label="Premises Address" value={premisesAddress} onChange={handlePremisesAddress} />
                    </div>
                </AccordionDetails>
            </Accordion>
            <DefaultItemsCheckBox />
            <Typography variant="h9" component="h9">
                No. of Schedule of Fittings, Furnishings and all Fixtures
            </Typography>
            <TextField label="Items Number" type='number' onChange={handleItemProvidedChange} value={itemProvidedArr.length} />
            {itemProvidedArr.map((ele, index) => {
                return (
                    <ItemsProvidedInput index={index} itemProvidedArr={itemProvidedArr} setItemProvidedArr={setItemProvidedArr} key={`itemprovidedarr${index}`} />
                )
            })}
            <button onClick={generatePdf} className={classes.generateButtonStyle}>
                Generate PDF
            </button>
        </div>
    )

}
export default DraftTermsInvoice