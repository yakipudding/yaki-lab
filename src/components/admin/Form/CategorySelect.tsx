import React from 'react';
import { SelectChangeEvent } from '../../../biz/Definition/Types';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

// カテゴリ選択
const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    marginTop: 8,
  },
  select: {
    paddingTop: 10.5,
    paddingBottom: 10.5,
  },
}));

const CategorySelect = (props: { category:number, handleSelectChange: (event: SelectChangeEvent) => void } ) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="select-label" shrink={true}>カテゴリ</InputLabel>
      <Select
        labelId="select-label"
        id="select-input-label"
        value={props.category}
        onChange={props.handleSelectChange}
        label="カテゴリ"
        inputProps={{
          classes: {
            root: classes.select,
          },
        }}
      >
        <MenuItem value={10}>技術</MenuItem>
        <MenuItem value={20}>仕事</MenuItem>
        <MenuItem value={30}>生活</MenuItem>
      </Select>
    </FormControl>
  )
}
export default CategorySelect