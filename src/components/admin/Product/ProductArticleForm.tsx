import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core/'
import { registerImage } from '../../../biz/StorageAccessor'
import { ProductArticleInterface } from '../../../biz/Definition/Interfaces'
import { InputChangeEvent } from '../../../biz/Definition/Types'
import ImageUploadButton from '../Form/ImageUpload';
import ContentTextField from '../Form/ContentTextField';
import CustomTextField from '../Form/CustomTextField';
import SubmitButton from '../Form/SubmitButton';
import MarkdownPreviewField from '../Form/MarkdownPreviewField';

// プロダクト記事
function ProductArticleForm(props: {initArticle: ProductArticleInterface, submit: (article: ProductArticleInterface) => void }) { 
  // state init
  const [values, setValues] = useState({ ...props.initArticle });

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
        registerImage(saveFile, values.productId).then((url) => {
          setValues({
            ...values,
            content: values.content + `\n![${saveFile.name}](${url})`
          });
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
            label="記事ID"
            id="articleId"
            margin="dense"
            variant="outlined"
            onChange={handleChange('articleId')}
            value={values.articleId}
            InputLabelProps={{ shrink: true }}
            placeholder="英字で。大文字OK"
            InputProps={{
              readOnly: props.initArticle.articleId !== '',
            }}
          />
          <TextField
            label="表示順"
            id="order"
            margin="dense"
            variant="outlined"
            onChange={handleChange('order')}
            value={values.order}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fieldName="articleTitle"
            labelName="タイトル"
            value={values.articleTitle}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ImageUploadButton handleChangeImage={handleChangeImage} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ContentTextField content={values.content} handleChange={handleChange('content')} />
            </Grid>
            <Grid item xs={6}>
              <MarkdownPreviewField content={values.content} />
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

export default ProductArticleForm