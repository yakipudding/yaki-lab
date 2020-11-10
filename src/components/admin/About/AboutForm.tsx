import React, { useState } from 'react';
import { Grid } from '@material-ui/core/'
import { registerImage } from '../../../biz/StorageAccessor'
import { AboutInterface } from '../../../biz/Definition/Interfaces'
import { InputChangeEvent } from '../../../biz/Definition/Types'
import ImageUploadButton from '../Form/ImageUpload';
import SubmitButton from '../Form/SubmitButton';
import CustomTextField from '../Form/CustomTextField';
import TextField from '@material-ui/core/TextField/TextField';

// Aboutフォーム

function AboutForm(props: {init : AboutInterface, submit: (about: AboutInterface) => void }) {
  // state init
  const [values, setValues] = useState(props.init);

  // action
  const handleChange = (name: string) => (event: InputChangeEvent) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeImage = (event: InputChangeEvent) => {
    if(event.target.files){
      const file = event.target.files.item(0);
      //storageに保存
      if(file){
        const saveFile = file as File
        registerImage(saveFile, 'About').then((url) => {
          setValues({ ...values, icon: url });
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
          <TextField
            label="このサイトの説明"
            id="description"
            margin="dense"
            variant="outlined"
            fullWidth
            multiline
            onChange={handleChange('description')}
            value={values.description}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <ImageUploadButton handleChangeImage={handleChangeImage} />
          <img src={values.icon} width="120px" />
          <p>
            {values.icon}
          </p>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fieldName="github"
            labelName="GitHubレポジトリ"
            value={values.github}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fieldName="twitter"
            labelName="Twitter"
            value={values.twitter}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fieldName="qiita"
            labelName="Qiita"
            value={values.qiita}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="プロフィール"
            id="content"
            margin="dense"
            variant="outlined"
            fullWidth
            multiline
            onChange={handleChange('content')}
            value={values.content}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </form>
  );
}

export default AboutForm