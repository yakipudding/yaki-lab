import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core/';
import { getAbout } from '../../../biz/DBAccessor/AboutTable'
import AboutStyle from './AboutStyle'
import Markdown from '../../common/Markdown/Markdown';

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
    return (
      <>
        <Typography variant="h2" className={classes.title}>
          このサイトについて
        </Typography>
        <Markdown mdText={values} />
      </>
    );
  }
  else {
    return null
  }
}

export default About;