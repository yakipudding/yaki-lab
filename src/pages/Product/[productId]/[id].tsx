import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Grid, Typography, IconButton } from '@material-ui/core/';
import GitHubIcon from '@material-ui/icons/GitHub';
import { getProduct, getProductArticleIds } from '../../../biz/DBAccessor/ProductTable'
import { ProductInterface, ProductArticleInterface, ProductParamsInterface } from '../../../biz/Definition/Interfaces'
import PageLink from '../../../components/Link/PageLink'
import TagLink from '../../../components/Link/TagLink'
import Toc from '../../../components/Link/Toc'
import Markdown from '../../../components/Markdown/Markdown'
import { makeStyles } from '@material-ui/core/styles';

// プロダクトページ
const ProductStyle = makeStyles(theme => ({
  productName: {
    fontSize: '2rem',
    marginBottom: 0,
  },
  productHeader: {
    marginBottom: '1em',
  },
  date: {
    color: '#757575',
    fontSize: 12,
  },
  description: {
    color: "#616161",
    marginRight: 5,
  },
  articleTitle: {
    fontSize: '1.9rem',
  },
  toc: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tocSticky: {
    position: 'sticky',
    top: 40,
  },
}));

export const getStaticPaths = async() => {
  const productArticleIds = await getProductArticleIds()

  return {
    paths: productArticleIds,
    fallback: false,
  }
}

export const getStaticProps = async (params: ProductParamsInterface) => {
  const productId = params.params.productId
  const articleId = params.params.id
  const product = await getProduct(productId, articleId)

  return {
    props: {
      product: product.product,
      pages: product.pages,
    }
  }
}

const Product = (props: { product: ProductInterface, pages: ProductArticleInterface[] }) => {
  const classes = ProductStyle();
  const router = useRouter()

  const tagFilter = (tag: string) => {
    router.push("/Products?tagParam=" + tag)
  }

  const product = props.product

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
              pages={props.pages}
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

export default Product;