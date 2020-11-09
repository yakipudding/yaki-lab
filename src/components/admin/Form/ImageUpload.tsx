import React from 'react';
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { InputChangeEvent } from '../../../biz/Definition/Types';

// 画像アップロードボタン

const useStyles = makeStyles(theme => ({
  imageButtonField: {
    marginTop: 5,
    marginBottom: 5,
  },
  imageButtonHidden: {
    display: 'none',
  },
}));

const ImageUploadButton = (props: { handleChangeImage: (event: InputChangeEvent) => void } ) => {
  const classes = useStyles()
  return (
    <div className={classes.imageButtonField}>
      <input
        className={classes.imageButtonHidden}
        id="contained-button-file"
        multiple
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        onChange={props.handleChangeImage}
      />
      <label htmlFor="contained-button-file">
        <Button 
          size="small"
          variant="contained" 
          component="span" 
          color="primary"
          startIcon={<CloudUploadIcon />}>
          画像アップロード
        </Button>
      </label>
    </div>
  )
}
export default ImageUploadButton