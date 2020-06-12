import React, { useState, useEffect } from 'react';
import Marked from 'marked'
import { Card, CardContent, Grid, Typography, IconButton } from '@material-ui/core/';
import GitHubIcon from '@material-ui/icons/GitHub';
import { rendererProject } from '../../../biz/Renderer/MarkdownRenderer'
import { getProduct } from '../../../biz/DBAccessor/ProductTable'
import { ProductInterface, ProductArticleInterface } from '../../../biz/Definition/Interfaces'
import { ProductPageProps } from '../../../biz/Definition/Types'
import PageLink from '../../common/Link/PageLink'
import TagLink from '../../common/Link/TagLink'
import Toc from '../../../biz/Renderer/Toc'
import ProductStyle from './ProductStyle'
import '../../../style/ProductMarkDownPreview.css';

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
    // Markdown解析
    const tokens = Marked.lexer(values.product.content);
    //先にtocのHTMLを作成
    const toc_html = Toc(tokens, 2)
    const marked_html = Marked.parser(tokens, { renderer: rendererProject })

    return (
      <Grid container spacing={3}>
        <Grid item sm={9} xs={12}>
          <Card>
            <CardContent className={classes.header}>
              <Grid item xs={12}>
                <Typography className={classes.date}>
                  {product.date}
                  </Typography>
                <Typography variant="h2" gutterBottom>
                  {product.name}
                  </Typography>
                <Typography variant="body2" className={classes.description} component="span">
                  {product.description}
                </Typography>
                { product.repository ?   
                  <IconButton aria-label="repository" size="small" href={product.repository} target="_blank">
                    <GitHubIcon fontSize="inherit" />
                  </IconButton>
                : null}
              </Grid>
              <Grid item xs={12}>
                {product.tags ? <TagLink tags={product.tags.split(' ')} tagFilter={tagFilter} /> : null}
              </Grid>
            </CardContent>
            <CardContent>
              <Grid item xs={12}>
                <Typography variant="h3" className={classes.articleTitle} gutterBottom>
                  {product.articleTitle}
                </Typography>
                {/* Markdown */}
                <div dangerouslySetInnerHTML={{ __html: marked_html }} className="article" />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3} xs={12}>
          <PageLink 
            productName={product.name}
            stemUrl={"/Product/" + product.productId} 
            pages={values.pages}
            tocDom={<div dangerouslySetInnerHTML={{ __html: toc_html }} className="toc" />}
            />
        </Grid>
      </Grid>
    );
  }
  else {
    return null
  }
}

export default Product;