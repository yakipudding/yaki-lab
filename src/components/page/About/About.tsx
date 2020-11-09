import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core/';
import { getAbout } from '../../../biz/DBAccessor/AboutTable'
import Markdown from '../../common/Markdown/Markdown';
import { makeStyles } from '@material-ui/core/styles';

// ABOUTページ
const AboutStyle = makeStyles(theme => ({
  title: {
    margin: 0,
  },
}));

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