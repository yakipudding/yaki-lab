import React, { useState, useEffect } from 'react';
import Marked from 'marked'
import { Card, CardHeader, CardContent, Grid, Typography } from '@material-ui/core/';
import renderer from '../../../biz/Renderer/MarkdownRenderer'
import { getAbout } from '../../../biz/DBAccessor/AboutTable'
import AboutStyle from './AboutStyle'
import '../../../style/MarkDownPreview.css';

// ABOUTページ
const About = () => {
  const classes = AboutStyle();
  const [values, setValues] = useState<null | string>(null);

  // 初期処理：記事取得
  useEffect(() => {
    // firebaseから取得
    getAbout().then((about) => {
      setValues(about)
    })
  }, []);

  if (values) {
    // Markdown解析
    const tokens = Marked.lexer(values);
    const marked_html = Marked.parser(tokens, { renderer: renderer })

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader />
            <CardContent>
              <Grid item xs={12}>
                <Typography variant="h2" className={classes.title}>
                  このサイトについて
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* Markdown */}
                <div dangerouslySetInnerHTML={{ __html: marked_html }} className="article" />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
  else {
    return null
  }
}

export default About;