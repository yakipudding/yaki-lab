import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputChangeEvent } from '../../../biz/Definition/Types';
import TextField from '@material-ui/core/TextField';

// 画像アップロードボタン

const useStyles = makeStyles(theme => ({
  contentField: {
    width: '100%',
  },
}));

const ContentTextField = (props: { content:string, handleChange: (event: InputChangeEvent) => void } ) => {
  const classes = useStyles()
  return (
    <TextField
      label="コンテンツ"
      id="content"
      multiline
      rows={25}
      className={classes.contentField}
      margin="dense"
      variant="outlined"
      onChange={props.handleChange}
      value={props.content}
      InputProps={{
        classes: {
          root: classes.contentField,
          input: classes.contentField,
        },
      }}
      InputLabelProps={{ shrink: true }}
    />
  )
}
export default ContentTextField