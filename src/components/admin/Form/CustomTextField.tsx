import React from 'react';
import { InputChangeEvent } from '../../../biz/Definition/Types';
import TextField from '@material-ui/core/TextField';

// テキストフィールド
const CustomTextField = (props: { fieldName: string, labelName: string, value:string | null, handleChange: (name: string) => (event: InputChangeEvent) => void } ) => {
  return (
    <TextField
      label={props.labelName}
      id={props.fieldName}
      margin="dense"
      variant="outlined"
      fullWidth
      onChange={props.handleChange(props.fieldName)}
      value={props.value}
      InputLabelProps={{ shrink: true }}
    />
  )
}
export default CustomTextField