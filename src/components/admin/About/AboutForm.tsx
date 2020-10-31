import React, { useState } from 'react';
import Marked from 'marked'
import '../../../style/MarkDownPreview.css';
import { Button, Grid, TextField} from '@material-ui/core/'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { registerImage } from '../../../biz/StorageAccessor'
import renderer from '../../../biz/Renderer/MarkdownRenderer'
import ArticleFormStyle from './AboutFormStyle'
import { InputChangeEvent } from '../../../biz/Definition/Types'

function AboutForm(props: {initContent : string, submit: (content: string) => void }) {
  const classes = ArticleFormStyle();
  
  // state init
  const [values, setValues] = useState(props.initContent);
  
  // Markdown解析
  const tokens = Marked.lexer(values);
  const marked_html = Marked.parser(tokens, { renderer: renderer })

  // action
  const handleChange = (event: InputChangeEvent) => {
    setValues(event.target.value);
  };

  const handleChangeImage = (event: InputChangeEvent) => {
    if(event.target.files){
      const file = event.target.files.item(0);
      //storageに保存
      if(file){
        const saveFile = file as File
        registerImage(saveFile, 'About').then((url) => {
          setValues(values + `\n![${saveFile.name}](${url})`);
        })
      }
    }
  };

  const handleSubmit = () => {
    props.submit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container>
        <Grid item xs={12} className={classes.imageButtonField}>
          <input
            className={classes.imageButtonHidden}
            id="contained-button-file"
            multiple
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            onChange={handleChangeImage}
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
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="コンテンツ"
                id="content"
                multiline
                rows={27}
                className={classes.contentField}
                margin="dense"
                variant="outlined"
                onChange={handleChange}
                value={values}
                InputProps={{
                  classes: {
                    root: classes.contentField,
                    input: classes.contentField,
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6} className={classes.previewField}>
              {/* Markdown */}
              <div dangerouslySetInnerHTML={{ __html: marked_html }} className="Note" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.submitbutton}
            onClick={handleSubmit}
            type="button"
          >
            投稿
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AboutForm