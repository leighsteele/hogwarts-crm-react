import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function OutlinedTextFields(props) {
  return (
      <TextField
        label={props.label}
        onChange={props.onChange}
        margin="normal"
        variant="outlined"
        type={props.type}
        value={props.value}
        fullWidth
      />
  );
}
