import React, { useState } from 'react';
import { Button, Checkbox, Grid, TextField, FormControl, FormControlLabel, InputLabel, Select, MenuItem } from '@material-ui/core/'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { registerImage } from '../../../biz/StorageAccessor'
import TagsField from '../TagsField'
import ArticleFormStyle from './ArticleFormStyle'
import { ArticleInterface } from '../../../biz/Definition/Interfaces'
import { InputChangeEvent, SelectChangeEvent } from '../../../biz/Definition/Types'
import Markdown from '../../common/Markdown/Markdown';

function ArticleForm(props: {initArticle : ArticleInterface, submit: (article: ArticleInterface, tags: Array<string>) => void }) {
  const classes = ArticleFormStyle();
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
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            label="タイトル"
            id="title"
            margin="dense"
            variant="outlined"
            fullWidth
            onChange={handleChange('title')}
            value={articleValues.title}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-label" shrink={true}>カテゴリ</InputLabel>
                <Select
                  labelId="select-label"
                  id="select-input-label"
                  value={articleValues.category}
                  onChange={handleSelectChange}
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
            </Grid>
            <Grid item xs={6}>
              <TagsField
                tagValues={tagValues}
                setTagValues={setTagValues}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="記事URL"
                id="url"
                margin="dense"
                variant="outlined"
                fullWidth
                onChange={handleChange('url')}
                value={articleValues.url}
                InputLabelProps={{ shrink: true }}
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
                onChange={handleChange('content')}
                value={articleValues.content}
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
              <Markdown mdText={articleValues.content} />
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

export default ArticleForm