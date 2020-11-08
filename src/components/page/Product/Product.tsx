import React, { useState, useEffect } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core/';
import GitHubIcon from '@material-ui/icons/GitHub';
import { getProduct } from '../../../biz/DBAccessor/ProductTable'
import { ProductInterface, ProductArticleInterface } from '../../../biz/Definition/Interfaces'
import { ProductPageProps } from '../../../biz/Definition/Types'
import PageLink from '../../common/Link/PageLink'
import TagLink from '../../common/Link/TagLink'
import Toc from '../../common/Link/Toc'
import Markdown from '../../common/Markdown/Markdown'
import ProductStyle from './ProductStyle'

// プロダクトページ
const Product = (props: ProductPageProps) => {
  const classes = ProductStyle();
  const productId = props.match.params.productId
  const articleId = props.match.params.articleId
  const [values, setValues] = useState<{ product: ProductInterface, pages: ProductArticleInterface[] } | null>(null)

  // 初期処理：プロダクト取得
  useEffect(() => {
    if (productId) {
      // firebaseから取得
      getProduct(productId, articleId).then((productFromDB) => {
        setValues(productFromDB)
      })
    }
  }, [productId, articleId]);

  const tagFilter = (tag: string) => {
    props.history.push("/Products/" + tag)
  }

  if (values) {
    const product = values.product

    return (
      <Grid container spacing={3}>
        <Grid item sm={9} xs={12}>
          <header>
            <div className={classes.productHeader}>
              <Typography variant="subtitle1" className={classes.productName}>
                {product.name}
                { product.repository ?   
                  <IconButton aria-label="repository" size="medium" href={product.repository} target="_blank">
                    <GitHubIcon fontSize="inherit" />
                  </IconButton>
                : null}
              </Typography>
              <Typography variant="subtitle2" className={classes.description} component="span">
                {product.description}
              </Typography>
              {product.tags ? <TagLink tags={product.tags.split(' ')} tagFilter={tagFilter} /> : null}
              <Typography className={classes.date}>
                {product.date}
              </Typography>
            </div>
            <Typography variant="h1" className={classes.articleTitle} gutterBottom>
              {product.articleTitle}
            </Typography>
          </header>          
          <Markdown mdText={product.content} />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Grid container spacing={3} className={classes.tocSticky}>
            <Grid item xs={12}>
              <PageLink 
                productName={product.name}
                stemUrl={"/Product/" + product.productId} 
                pages={values.pages}
              />
            </Grid>
            <Grid item xs={12} className={classes.toc}>          
              <Toc mdText={product.content} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  else {
    return null
  }
}

export default Product;