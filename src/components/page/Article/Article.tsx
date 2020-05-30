import React, { useState, useEffect } from 'react';
import Marked from 'marked'
import { Card, CardHeader, CardContent, Grid, Typography } from '@material-ui/core/';
import renderer from '../../../biz/Renderer/MarkdownRenderer'
import { getArticle } from '../../../biz/DBAccessor/ArticleTable'
import { ArticleInterface } from '../../../biz/Definition/Interfaces'
import { IdPageProps } from '../../../biz/Definition/Types'
import Toc from '../../../biz/Renderer/Toc'
import TagLink from '../../common/Link/TagLink'
import ArticleStyle from './ArticleStyle'
import '../../../style/MarkDownPreview.css';

// 記事ページ
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
    // Markdown解析
    const tokens = Marked.lexer(values.content);
    //先にtocのHTMLを作成
    const toc_html = Toc(tokens)
    const marked_html = Marked.parser(tokens, { renderer: renderer })

    return (
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Card>
            <CardHeader className={classes.categoryTech} />
            <CardContent>
              <Grid item xs={12}>
                <Typography className={classes.date}>
                  {values.date}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h2" className={classes.title}>
                  {values.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {values.tags ? <TagLink tags={values.tags.split(' ')} tagFilter={tagFilter} /> : null}
              </Grid>
              <Grid item xs={12}>
                {/* Markdown */}
                <div dangerouslySetInnerHTML={{ __html: marked_html }} className="article" />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          {/* Toc */}
          <div dangerouslySetInnerHTML={{ __html: toc_html }} className="toc" />
        </Grid>
      </Grid>
    );
  }
  else {
    return null
  }
}

export default Article;