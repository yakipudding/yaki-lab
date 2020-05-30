import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core/'
import TagsField from '../TagsField'
import { insertProduct } from '../../../biz/DBAccessor/ProductTable'
// import ArticleForm from './ProductArticleForm'
import { ProductInterface } from '../../../biz/Definition/Interfaces'
import { PageProps, InputChangeEvent } from '../../../biz/Definition/Types'

// 新規プロダクト記事
const AdminNewProduct = (props: PageProps) => {
  const [productValues, setProductValues] = useState<ProductInterface>(
  {
    productId: '',
    date: '',
    name: '',
    tags: null,
    description: '',
    repository: '',
    articleId: '',
    articleTitle: '',
    content: '',
    private: false,
  });
  const [tagValues, setTagValues] = useState(
  { 
    input: '',
    newTagKey: 0,
    tags: [] as string[],
  });
  
  // action
  const handleChange = (name: string) => (event: InputChangeEvent) => {
    setProductValues({ ...productValues, [name]: event.target.value });
  };

  const handleChangeCheckbox = (event: InputChangeEvent) => {
    setProductValues({ ...productValues, private: event.target.checked });
  };
  
  const handleSubmit = () => {
    // tags 重複の削除
    let registerTags = tagValues.tags
                        .filter((x, i, self) => { return self.indexOf(x) === i;});
    let product = {
      ...productValues,
      tags: registerTags.length === 0 ? null : registerTags.join(' ')
    }
    //firebaseに登録
    insertProduct(product).then(() => {
      props.history.push(('/AdminProductDashBoard'))
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="プロダクトID"
                id="productId"
                margin="dense"
                variant="outlined"
                fullWidth
                onChange={handleChange('productId')}
                value={productValues.productId}
                InputLabelProps={{ shrink: true }}
                placeholder="英語で。大文字OK"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={productValues.private} 
                onChange={handleChangeCheckbox} 
                name="private" />}
                label="非公開"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="プロダクト名"
            id="name"
            margin="dense"
            variant="outlined"
            fullWidth
            onChange={handleChange('name')}
            value={productValues.name}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="説明"
            id="description"
            margin="dense"
            variant="outlined"
            fullWidth
            onChange={handleChange('description')}
            value={productValues.description}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TagsField
            tagValues={tagValues}
            setTagValues={setTagValues}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="レポジトリ"
            id="repository"
            margin="dense"
            variant="outlined"
            fullWidth
            onChange={handleChange('repository')}
            value={productValues.repository}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
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

export default AdminNewProduct;