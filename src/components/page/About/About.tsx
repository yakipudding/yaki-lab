import React, { useState, useEffect } from 'react';
import Marked from 'marked'
import { Typography } from '@material-ui/core/';
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
      <>
        <Typography variant="h2" className={classes.title}>
          このサイトについて
        </Typography>
        {/* Markdown */}
        <div dangerouslySetInnerHTML={{ __html: marked_html }} className="article" />
      </>
    );
  }
  else {
    return null
  }
}

export default About;