import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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

const DefaultItemsCheckBox = () => {
    const classes = useStyles()

    const [isCallingBellIncluded, setIsCallingBellIncluded] = React.useState(false)
    const [callingBellQuantity, setCallingBellQuantity] = React.useState('')
    const [isLedSquareBulbIncluded, setIsLedSquareBulbIncluded] = React.useState(false)
    const [ledSquareBulbQuantity, setLedSquareBulbQuantity] = React.useState('')
    const [isLedRoundBulbIncluded, setIsLedRoundBulbIncluded] = React.useState(false)
    const [ledRoundBulbQuantity, setLedRoundBulbQuantity] = React.useState('')
    const [isCurtainRodIncluded, setIsCurtainRodIncluded] = React.useState(false)
    const [curtainRodQuantity, setCurtainRodQuantity] = React.useState('')
    const [isCurtainIncluded, setIsCurtainIncluded] = React.useState(false)
    const [curtainQuantity, setCurtainQuantity] = React.useState('')
    const [isCeilingFanIncluded, setIsCeilingFanIncluded] = React.useState(false)
    const [ceilingFanQuantity, setCeilingFanQuantity] = React.useState('')
    const [isExhaustFanIncluded, setIsExhaustFanIncluded] = React.useState(false)
    const [exhaustFanQuantity, setExhaustFanQuantity] = React.useState('')


    const handleCallingBell = (e) => {
        setIsCallingBellIncluded((prevState => !prevState))
    }
    const handleCallingBellQuantity = (e) => {
        setCallingBellQuantity(e.target.value)
    }
    const handleLedSquareBulb = (e) => {
        setIsLedSquareBulbIncluded((prevState => !prevState))
    }
    const handleLedSquareBulbQuantity = (e) => {
        setLedSquareBulbQuantity(e.target.value)
    }
    const handleLedRoundBulb = (e) => {
        setIsLedRoundBulbIncluded((prevState => !prevState))
    }
    const handleLedRoundBulbQuantity = (e) => {
        setLedRoundBulbQuantity(e.target.value)
    }
    const handleCurtainRod = (e) => {
        setIsCurtainRodIncluded((prevState => !prevState))
    }
    const handleCurtainRodQuantity = (e) => {
        setCurtainRodQuantity(e.target.value)
    }
    const handleCurtain = (e) => {
        setIsCurtainIncluded((prevState => !prevState))
    }
    const handleCurtainQuantity = (e) => {
        setCurtainQuantity(e.target.value)
    }
    const handleCeilingFan = (e) => {
        setIsCeilingFanIncluded((prevState => !prevState))
    }
    const handleCeilingFanQuantity = (e) => {
        setCeilingFanQuantity(e.target.value)
    }
    const handleExhaustFan = (e) => {
        setIsExhaustFanIncluded((prevState => !prevState))
    }
    const handleExhaustFanQuantity = (e) => {
        setExhaustFanQuantity(e.target.value)
    }

    return (
        <div className={classes.root}>
            <div><FormControlLabel control={<Checkbox defaultChecked />} label="Calling Bell" checked={isCallingBellIncluded} onChange={handleCallingBell} />
                {isCallingBellIncluded && <TextField label="Quantity" type='number' onChange={handleCallingBellQuantity} value={callingBellQuantity} />}</div>
            <div><FormControlLabel control={<Checkbox defaultChecked />} label="LED Square Bulb" checked={isLedSquareBulbIncluded} onChange={handleLedSquareBulb} />
                {isLedSquareBulbIncluded && <TextField label="Quantity" type='number' onChange={handleLedSquareBulbQuantity} value={ledSquareBulbQuantity} />}</div>
            <div><FormControlLabel control={<Checkbox defaultChecked />} label="LED Round Bulb" checked={isLedRoundBulbIncluded} onChange={handleLedRoundBulb} />
                {isLedRoundBulbIncluded && <TextField label="Quantity" type='number' onChange={handleLedRoundBulbQuantity} value={ledRoundBulbQuantity} />}</div>
            <div><FormControlLabel control={<Checkbox defaultChecked />} label="Curtain Rod" checked={isCurtainRodIncluded} onChange={handleCurtainRod} />
                {isCurtainRodIncluded && <TextField label="Quantity" type='number' onChange={handleCurtainRodQuantity} value={curtainRodQuantity} />}</div>
            <div><FormControlLabel control={<Checkbox defaultChecked />} label="Curtain" checked={isCurtainIncluded} onChange={handleCurtain} />
                {isCurtainIncluded && <TextField label="Quantity" type='number' onChange={handleCurtainQuantity} value={curtainQuantity} />}</div>
            <div><FormControlLabel control={<Checkbox defaultChecked />} label="Ceiling Fan" checked={isCeilingFanIncluded} onChange={handleCeilingFan} />
                {isCeilingFanIncluded && <TextField label="Quantity" type='number' onChange={handleCeilingFanQuantity} value={ceilingFanQuantity} />}</div>
            <div><FormControlLabel control={<Checkbox defaultChecked />} label="Exhaust Fan" checked={isExhaustFanIncluded} onChange={handleExhaustFan} />
                {isExhaustFanIncluded && <TextField label="Quantity" type='number' onChange={handleExhaustFanQuantity} value={exhaustFanQuantity} />}</div>
        </div>
    )
}

export default DefaultItemsCheckBox;