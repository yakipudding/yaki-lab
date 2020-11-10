import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Grid, Link, IconButton, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { getAbout } from '../../../biz/DBAccessor/AboutTable'
import Markdown from '../../common/Markdown/Markdown';
import { AboutInterface } from '../../../biz/Definition/Interfaces';

// ABOUTページ
const AboutStyle = makeStyles(theme => ({
  aboutCard: {
    backgroundColor: '#eee',
  },
  title: {
    fontSize: '1rem',
    color: '#424242',
  },
  text: {
    fontSize: '0.9rem',
    color: '#616161',
  },
  icon: {
    width: 150,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const About = () => {
  const classes = AboutStyle();
  const [values, setValues] = useState<null | AboutInterface>(null);

  // 初期処理：記事取得
  useEffect(() => {
    // firebaseから取得
    getAbout().then((about) => {
      setValues(about)
    })
  }, []);

  if (values) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card className={classes.aboutCard}>
            <CardContent>
              <Typography className={classes.title}>
                このサイトについて
              </Typography>
              <Typography className={classes.text}>
                {values.description}
                仕組みについて詳しくは<Link color="secondary" href="/Product/YakiLab/Top">こちら</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.aboutCard}>
            <CardContent>
              <Typography className={classes.title}>
                焼きぷでぃんぐ
              </Typography>
              <div>
                <img src={values.icon} className={classes.icon} />
              </div>
              <IconButton href={values.github} component="a" target="_blank" aria-label="GitHub" className={classes.margin}>
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton href={values.twitter} component="a" target="_blank" aria-label="Twitter" className={classes.margin}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <Button href={values.qiita} component="a" target="_blank" className={classes.margin}>
                Qiita
              </Button>
              <Typography className={classes.text}>
                {values.content}
              </Typography>
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