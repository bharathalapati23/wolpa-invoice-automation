import React from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import TenantInputTextField from './TenantInputTextField';
import imageUrl from '../images/ImageUrl';

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
}


const OwnerInvoice = (props) => {
    const doc = new jsPDF();
    const classes = useStyles()
    
    const generatePdf = () => {
        const table1List = []
        const charges = []
        let tenantName=[]
        let totalCharge=Number(serviceFee)+Number(securityDeposit)
        let date = new Date(transactionDate)
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        let transactionDateFormat=date.toLocaleDateString('en-US', DATE_OPTIONS)
        

        for (let i = 0; i < tenantInfoArr.length; i++) {
            tenantName.push(tenantInfoArr[i].name)
        }
            
        //pushing elements for the autotable
        table1List.push(['Tenants',tenantName.join('\r\n')])
        table1List.push(['Homeowner',ownerName])
        table1List.push(['Adress',ownerAdress])
        table1List.push(['Rent','INR '+rent])
        table1List.push(['Maintenance',maintenanceFee])
        table1List.push(['Deposit','INR '+deposit])
        table1List.push(['Number of occupants',tenantInfoArr.length])
        charges.push([1,' Service Fee including viewing charges for Service Fee including viewing charges for '+bedroomNumber+'-Bedroom Home ',serviceFee])
        charges.push([2,'Blocking amount towards Security Deposit',securityDeposit])
        charges.push([' ','Total','INR '+totalCharge])
        let yCoord=(3*tenantInfoArr.length)+10
        let yCoordOwnerAdress=Math.floor((ownerAdress.length)/33)
        if(ownerAdress.length>33){
            yCoord=(yCoordOwnerAdress*6)+yCoord
        }
        
        //jspdf
        doc.addImage(imageUrl,"PNG", 30, 15, 30, 30);
        doc.setFont("Calibri", "bold")
        doc.setFontSize(16);
        doc.text("Wolpa Accomodation Services", 70, 19);
        doc.setFontSize(14);
        doc.setFont("Calibri", "normal")
        doc.text("Manipal - 576104", 70, 26);
        doc.text("P: +91 9591798639 | ", 70, 34)
        doc.setTextColor("blue");
        doc.text("E: hello@wolpa.in",115,34)
        doc.setDrawColor(0, 0, 255);
        doc.line(115, 35, 152, 35);
        doc.setTextColor("black");
        doc.text("www.wolpa.in", 70, 42)
        doc.setFontSize(12);
        doc.setFont("Calibri", "normal")
        doc.text("Congratulations on booking your new home in Manipal! Hope you’ll enjoy your stay in",30,60)
        doc.text("Manipal during this tenure.",30,67)
        doc.autoTable({ html: '#my-table',})
        doc.autoTable({
            theme : 'grid',
            tableWidth: 100,
            styles:{textColor:[0,0,0],lineColor:[0,0,0],lineWidth: 0.3,},
            body: table1List,
            startY: 77,
            margin: 30,
            
        })
        doc.setFont("Calibri", "bold")
        doc.setFontSize(18);
        doc.text("Scope of Work before move-in",30,yCoord+133)
        doc.setFont("Calibri", "normal")
        doc.setFontSize(12);
        doc.text("1. Cleaning of entire home, where applicable.",33,yCoord+140)
        doc.text("2. Rental agreement to be executed",33,yCoord+145)
        doc.setFontSize(18);
        doc.setFont("Calibri", "bold")
        doc.text("Quotation",30,yCoord+157)
        doc.autoTable({ html: '#my-table2',})
        doc.autoTable({
            theme : 'grid',
            styles:{textColor:[0,0,0],lineColor:[0,0,0],lineWidth: 0.3,},
            columnStyles:{2:{cellWidth: 27},},
            body: charges,
            startY: yCoord+164,
            margin: 30,
        })
        doc.setFontSize(18);
        doc.text("Next Steps",30,yCoord+205,)
        doc.setFont("Calibri", "normal")
        doc.setFontSize(12);
        doc.text("1. Please share the Aadhar Card and College ID cards for generation of rental",33,yCoord+213)
        doc.text("    agreement",33,yCoord+218)
        doc.text("2. Complete the above transaction on or before "+transactionDateFormat,33,yCoord+223)
        doc.text("3. Rental Agreement to be signed off and Deposit to be paid five days prior to move-in.",33,yCoord+228)
        doc.text("4. Final snag check along with Wolpa representative, to identify any defects or repairs",33,yCoord+233)
        doc.text("    required.",33,yCoord+238)
        if(yCoord+253>278)
        {
            doc.addPage()
            doc.text("5. Post the Snag Check and tenant approval, the tenants will move-in. If any repairs /",33,30)
        doc.text("    defects identified thereafter, Wolpa shall extend its full assistance during the tenure,",33,35)
        doc.text("    but at the tenants own cost.",33,40)
        doc.setFontSize(12);
        doc.text("6. Remaining terms and conditions of the Rental Accommodation to be read in full as",33,45)
        doc.text("    part of the Renal Agreement.",33,50)
        doc.text("Thank you.",33,64)
        doc.text("Wolpa Team",33,69)
        doc.text("Follow us for updates:",30,170)
        doc.setTextColor("blue");
        doc.text("https://www.instagram.com/wolpa.in",30,175)
        doc.setDrawColor(0, 0, 255);
        doc.line(30, 176, 94, 176);
        doc.text("https://www.facebook.com/wolpamanipal",30,180)
        doc.setDrawColor(0, 0, 255);
        doc.line(30, 181, 102, 181);
            
        }
        else{
        doc.text("5. Post the Snag Check and tenant approval, the tenants will move-in. If any repairs /",33,yCoord+243)
        doc.text("    defects identified thereafter, Wolpa shall extend its full assistance during the tenure,",33,yCoord+248)
        doc.text("    but at the tenants own cost.",33,yCoord+253)
        doc.addPage();
        doc.setFont("Calibri", "normal")
        doc.setFontSize(12);
        doc.text("6. Remaining terms and conditions of the Rental Accommodation to be read in full as",33,30)
        doc.text("    part of the Renal Agreement.",33,35)
        doc.text("Thank you.",33,49)
        doc.text("Wolpa Team",33,54)
        doc.text("Follow us for updates:",30,170)
        doc.setTextColor("blue");
        doc.text("https://www.instagram.com/wolpa.in",30,175)
        doc.setDrawColor(0, 0, 255);
        doc.line(30, 176, 94, 176);
        doc.text("https://www.facebook.com/wolpamanipal",30,180)
        doc.setDrawColor(0, 0, 255);
        doc.line(30, 181, 102, 181);
        }
        doc.save("Scope of work and Quotation.pdf");
    }

    //states
    const [ownerName, setOwnerName] = React.useState('')
    const [ownerAdress, setOwnerAdress] = React.useState('')
    const [rent, setRent] = React.useState('')
    const [deposit, setDeposit] = React.useState('')
    const [bedroomNumber, setBedroomNumber] = React.useState('')
    const [serviceFee, setServiceFee] = React.useState('')
    const [securityDeposit, setSecurityDeposit] = React.useState('')
    const [transactionDate, setTransactionDate] = React.useState('')
    const [isMaintenanceIncluded, setIsMaintenanceIncluded] = React.useState(false)
    const [maintenanceFee, setMaintenanceFee] = React.useState('')
    const [tenantInfoArr, setTenantInfoArr] = React.useState([])
    
    
    //On Change Handlers
    const handleOwnersName = (e) => {
        setOwnerName(e.target.value)
    }
    const handleOwnersAdress = (e) => {
        setOwnerAdress(e.target.value)
    }
    const handleRent = (e) => {
        setRent(e.target.value)
    }
    const handleMaintenanceFeeChange = (e) => {
        setMaintenanceFee(e.target.value)
    }
    const handleDeposit = (e) => {
        setDeposit(e.target.value)
    }
    const handleBedroomNumber = (e) => {
        setBedroomNumber(e.target.value)
    }
    const handleServiceFee = (e) => {
        setServiceFee(e.target.value)
    }
    const handleSecurityDeposit = (e) => {
        setSecurityDeposit(e.target.value)
    }
    const handleTransactionDate = (e) => {
        setTransactionDate(e.target.value)
    }
    const handleMaintenanceChange = (e) => {
        setIsMaintenanceIncluded(prevState => !prevState)
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


  return (
    <div className={classes.root}>
        <Typography variant="h7" component="h7">
            Number of Tenants
        </Typography>
        <TextField label="No. of tenants" type='number' onChange={handleTenantNumberChange} value={tenantInfoArr.length} />
            {tenantInfoArr.map((ele, index) => {
                return (
                    <TenantInputTextField index={index} tenantInfoArr={tenantInfoArr} setTenantInfoArr={setTenantInfoArr} key={`tenantinfoaccordion${index}`} />
                )
            })}
        <Typography variant="h7" component="h7"></Typography> 
            Home Owner's Name
        <TextField label="Owner Name" type='text' onChange={handleOwnersName} value={ownerName}/>
        <Typography variant="h7" component="h7"></Typography> 
            Owner's Adress
        <TextField label="Owner Adress" type='text' onChange={handleOwnersAdress} value={ownerAdress}/>
        <Typography variant="h7" component="h7">
            Rent ammount
        </Typography> 
        <TextField label="Rent" type='number' onChange={handleRent} value={rent}/>
        <Typography variant="h7" component="h7">
            Maintenance Charges
         </Typography>
            <Switch
                 checked={isMaintenanceIncluded}
                 onChange={handleMaintenanceChange}
                 color="primary"
                 name="checkedB"
                 inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {isMaintenanceIncluded && <TextField label="Maintenance Charges" type='number' onChange={handleMaintenanceFeeChange} value={maintenanceFee} />}
        <Typography variant="h7" component="h7">
                Deposit ammount
        </Typography> 
        <TextField label="Deposit" type='number'  onChange={handleDeposit} value={deposit}/>
        <Typography variant="h7" component="h7">
                Number of Bedrooms 
        </Typography> 
        <TextField label="Bedrooms" type='number' onChange={handleBedroomNumber} value={bedroomNumber}/>
        <Typography variant="h7" component="h7">
                Service Fees for the appartment 
        </Typography> 
        <TextField label="Service" type='number'  onChange={handleServiceFee} value={serviceFee}/>
        <Typography variant="h7" component="h7">
                Security Deposit 
        </Typography> 
        <TextField label="Security Deposit" type='number'  onChange={handleSecurityDeposit} value={securityDeposit}/>
        <Typography variant="h7" component="h7">
            On or before transaction Day 
        </Typography> 
        <TextField type='date' onChange={handleTransactionDate} value={transactionDate}/>
         <button onClick={generatePdf} className={classes.generateButtonStyle}>
            Generate PDF
        </button>
    </div>
  );
};

export default OwnerInvoice;