import React from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';



const OtherItemsInput = ({ index, otherItemsArr, setOtherItemsArr }) => {
    const handleChange = (e, type) => {
        let tempOtherItemsArr = JSON.parse(JSON.stringify(otherItemsArr))

        switch (type) {
            case 'name':
                tempOtherItemsArr[index].name = e.target.value
                setOtherItemsArr(tempOtherItemsArr)
                break;
            case 'fee':
                tempOtherItemsArr[index].fee = e.target.value
                setOtherItemsArr(tempOtherItemsArr)
                break;
            default:
                break
        }

    }
    return (
        <div>
            <Typography>Other Item {index + 1}</Typography>
            <TextField label="Name" value={otherItemsArr[index].name} onChange={(e) => handleChange(e, 'name')} />
            <TextField label="Fee" type='number' value={otherItemsArr[index].fee} onChange={(e) => handleChange(e, 'fee')} />
        </div>
    )
}

export default OtherItemsInput
