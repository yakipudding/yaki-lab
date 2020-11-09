import React, { useState } from 'react';
import { Grid } from '@material-ui/core/'
import { registerImage } from '../../../biz/StorageAccessor'
import { InputChangeEvent } from '../../../biz/Definition/Types'
import ImageUploadButton from '../Form/ImageUpload';
import ContentTextField from '../Form/ContentTextField';
import SubmitButton from '../Form/SubmitButton';
import MarkdownPreviewField from '../Form/MarkdownPreviewField';

// Aboutフォーム

function AboutForm(props: {initContent : string, submit: (content: string) => void }) {
  // state init
  const [values, setValues] = useState(props.initContent);

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
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <ImageUploadButton handleChangeImage={handleChangeImage} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ContentTextField content={values} handleChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <MarkdownPreviewField content={values} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SubmitButton handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </form>
  );
}

export default AboutForm