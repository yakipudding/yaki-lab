import React, { useState } from 'react';
import { Checkbox, Grid, FormControlLabel } from '@material-ui/core/'
import { registerImage } from '../../../biz/StorageAccessor'
import TagsField from '../TagsField'
import { ArticleInterface } from '../../../biz/Definition/Interfaces'
import { InputChangeEvent, SelectChangeEvent } from '../../../biz/Definition/Types'
import CustomTextField from '../Form/CustomTextField';
import CategorySelect from '../Form/CategorySelect';
import ImageUploadButton from '../Form/ImageUpload';
import ContentTextField from '../Form/ContentTextField';
import SubmitButton from '../Form/SubmitButton';
import MarkdownPreviewField from '../Form/MarkdownPreviewField';

// 記事フォーム
function ArticleForm(props: {initArticle : ArticleInterface, submit: (article: ArticleInterface, tags: Array<string>) => void }) {
  let initTags = props.initArticle.tags ? props.initArticle.tags.split(' ') : []
  
  // state init
  const [articleValues, setArticleValues] = useState({ ...props.initArticle });
  const [tagValues, setTagValues] = useState(
  { 
    input: '',
    newTagKey: initTags.length,
    tags: initTags,
  });

  // action
  const handleChange = (name: string) => (event: InputChangeEvent) => {
    setArticleValues({ ...articleValues, [name]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setArticleValues({ ...articleValues, category: event.target.value as number});
  };

  const handleChangeCheckbox = (event: InputChangeEvent) => {
    setArticleValues({ ...articleValues, private: event.target.checked });
  };

  const handleChangeImage = (event: InputChangeEvent) => {
    if(event.target.files){
      const file = event.target.files.item(0);
      //storageに保存
      if(file){
        const saveFile = file as File
        registerImage(saveFile, 'Article').then((url) => {
          setArticleValues({
            ...articleValues,
            content: articleValues.content + `\n![${saveFile.name}](${url})`
          });
        })
      }
    }
  };

  const handleSubmit = () => {
    // tags 重複の削除
    let registerTags = tagValues.tags
                        .filter((x, i, self) => { return self.indexOf(x) === i;});
    let article = {
      ...articleValues,
      tags: registerTags.length === 0 ? null : registerTags.join(' ')
    }
    props.submit(article, registerTags);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <CustomTextField
            fieldName="title"
            labelName="タイトル"
            value={articleValues.title}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CategorySelect category={articleValues.category} handleSelectChange={handleSelectChange} />
            </Grid>
            <Grid item xs={6}>
              <TagsField tagValues={tagValues} setTagValues={setTagValues} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CustomTextField
                fieldName="url"
                labelName="記事URL"
                value={articleValues.url}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={articleValues.private} onChange={handleChangeCheckbox} name="private" />}
                label="非公開"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ImageUploadButton handleChangeImage={handleChangeImage} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ContentTextField content={articleValues.content} handleChange={handleChange('content')} />
            </Grid>
            <Grid item xs={6}>
              <MarkdownPreviewField content={articleValues.content} />
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

export default ArticleForm