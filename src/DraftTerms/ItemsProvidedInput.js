import React from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const ItemsProvidedInput = ({ index, itemProvidedArr, setItemProvidedArr }) => {
    const handleChange = (e, type) => {
        let tempItemsProvidedArr = JSON.parse(JSON.stringify(itemProvidedArr))

        switch (type) {
            case 'name':
                tempItemsProvidedArr[index].name = e.target.value
                setItemProvidedArr(tempItemsProvidedArr)
                break;
            case 'qty':
                tempItemsProvidedArr[index].qty = e.target.value
                setItemProvidedArr(tempItemsProvidedArr)
                break;
            default:
                break
        }

    }
    return (
        <div>
            <Typography>Other Item {index + 1}</Typography>
            <TextField label="Name" value={itemProvidedArr[index].name} onChange={(e) => handleChange(e, 'name')} />
            <TextField label="Quantity" value={itemProvidedArr[index].qty} onChange={(e) => handleChange(e, 'qty')} />
        </div>
    )
}

export default ItemsProvidedInput
