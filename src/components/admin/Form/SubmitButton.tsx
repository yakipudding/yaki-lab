import React from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

// 投稿ボタン

const useStyles = makeStyles(theme => ({
  submitbutton: {
    width: '100%',
  },
}));

const SubmitButton = (props: { handleSubmit: () => void } ) => {
  const classes = useStyles()
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.submitbutton}
      onClick={props.handleSubmit}
      type="button"
    >
      投稿
    </Button>
  )
}
export default SubmitButton