import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: '100%',
    },
}));

export default function SimpleSelect(props) {
    const classes = useStyles();

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">House</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.house}
                    onChange={props.onChange}
                    label="Age"
                    fullWidth
                >
                    <MenuItem value={'Gryffindor'}>Gryffindor</MenuItem>
                    <MenuItem value={'Hufflepuff'}>Hufflepuff</MenuItem>
                    <MenuItem value={'Ravenclaw'}>Ravenclaw</MenuItem>
                    <MenuItem value={'Slytherin'}>Slytherin</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
