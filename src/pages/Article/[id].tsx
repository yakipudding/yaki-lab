import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Grid, Typography } from '@material-ui/core/';
import { getArticle, getArticleIds } from '../../biz/DBAccessor/ArticleTable'
import { ArticleInterface, ArticleParamsInterface } from '../../biz/Definition/Interfaces'
import TagLink from '../../components/Link/TagLink'
import Toc from '../../components/Link/Toc'
import Markdown from '../../components/Markdown/Markdown'
import { makeStyles } from '@material-ui/core/styles';

// 記事ページ
const ArticleStyle = makeStyles(theme => ({
  date: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: '1em',
  },
  title: {
    margin: 0,
  },
  toc: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export const getStaticPaths = async() => {
  const articleIds = await getArticleIds()

  return {
    paths: articleIds,
    fallback: false,
  }
}

export const getStaticProps = async (params: ArticleParamsInterface) => {
  const articleId = params.params.id
  const article = await getArticle(articleId)

  return {
    props: {
      article: article,
    }
  }
}

const Article = (props: { article: ArticleInterface }) => {
  const article = props.article
  const classes = ArticleStyle();
  const router = useRouter();

  const tagFilter = (tag: string) => {
    router.push("/?tagParam=" + tag)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={9}>
        <Typography variant="h1" className={classes.title}>
          {article.title}
        </Typography>
        {article.tags ? <TagLink tags={article.tags.split(' ')} tagFilter={tagFilter} /> : null}
        <Typography className={classes.date}>
          {article.date}
        </Typography>
        <Markdown mdText={article.content} />
      </Grid>
      <Grid item xs={12} sm={3} className={classes.toc}>
        <Toc mdText={article.content} />
      </Grid>
    </Grid>
    );
}

export default Article;