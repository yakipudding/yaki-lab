import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core/';
import { getArticle } from '../../../biz/DBAccessor/ArticleTable'
import { ArticleInterface } from '../../../biz/Definition/Interfaces'
import { IdPageProps } from '../../../biz/Definition/Types'
import TagLink from '../../common/Link/TagLink'
import Toc from '../../common/Link/Toc'
import Markdown from '../../common/Markdown/Markdown'
import { makeStyles } from '@material-ui/core/styles';

// 記事ページ
const ArticleStyle = makeStyles(theme => ({
  categoryTech: {
    backgroundColor: "#e3f2fd"
  },
  categoryWork: {
    backgroundColor: "#dcedc8"
  },
  categoryLife: {
    backgroundColor: "#fffde7"
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: '1em',
  },
  title: {
    margin: 0,
  },
  category: {
    color: '#333',
    fontSize: 14,
  },
  toc: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const Article = (props:IdPageProps) => {
  const classes = ArticleStyle();
  const articleId = props.match.params.id
  const [values, setValues] = useState<null | ArticleInterface>(null);

  // 初期処理：記事取得
  useEffect(() => {
    if (articleId) {
      // firebaseから取得
      getArticle(articleId).then((articleFromDB) => {
        setValues(articleFromDB)
      })
    }
  }, [articleId]);

  const tagFilter = (tag: string) => {
    props.history.push("/Articles/" + tag)
  }

  if (values) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <Typography variant="h1" component="h1" className={classes.title}>
            {values.title}
          </Typography>
          {values.tags ? <TagLink tags={values.tags.split(' ')} tagFilter={tagFilter} /> : null}
          <Typography className={classes.date}>
            {values.date}
          </Typography>
          <Markdown mdText={values.content} />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.toc}>
          <Toc mdText={values.content} />
        </Grid>
      </Grid>
    );
  }
  else {
    return null
  }
}

export default Article;