import React, { useState, useEffect } from 'react';
import Marked from 'marked'
import { Card, CardContent, Grid, Typography, IconButton, CardHeader } from '@material-ui/core/';
import GitHubIcon from '@material-ui/icons/GitHub';
import { rendererProject } from '../../../biz/Renderer/MarkdownRenderer'
import { getProduct } from '../../../biz/DBAccessor/ProductTable'
import { ProductInterface, ProductArticleInterface } from '../../../biz/Definition/Interfaces'
import { ProductPageProps } from '../../../biz/Definition/Types'
import PageLink from '../../common/Link/PageLink'
import TagLink from '../../common/Link/TagLink'
import Toc from '../../../biz/Renderer/Toc'
import ProductStyle from './ProductStyle'
import '../../../style/MarkDownPreview.css';

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
          <header>
            <div className={classes.productHeader}>
              <Typography variant="h2" className={classes.productName}>
                {product.name}
                { product.repository ?   
                  <IconButton aria-label="repository" size="medium" href={product.repository} target="_blank">
                    <GitHubIcon fontSize="inherit" />
                  </IconButton>
                : null}
              </Typography>
              <Typography variant="body2" className={classes.description} component="span">
                {product.description}
              </Typography>
              {product.tags ? <TagLink tags={product.tags.split(' ')} tagFilter={tagFilter} /> : null}
              <Typography className={classes.date}>
                {product.date}
              </Typography>
            </div>
            <Typography variant="h3" className={classes.articleTitle} gutterBottom>
              {product.articleTitle}
            </Typography>
          </header>
          {/* Markdown */}
          <div dangerouslySetInnerHTML={{ __html: marked_html }} className="article" />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Grid container spacing={3} className={classes.tocSticky}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="記事リンク" />
                <CardContent className={classes.tocCardContent}>
                  <PageLink 
                    productName={product.name}
                    stemUrl={"/Product/" + product.productId} 
                    pages={values.pages}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} className={classes.toc}>
              <Card className={classes.tocCard}>
                <CardHeader title="目次" />
                <CardContent className={classes.tocCardContent}>
                  {/* Toc */}
                  <div dangerouslySetInnerHTML={{ __html: toc_html }} className="toc" />
                </CardContent>
              </Card>
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