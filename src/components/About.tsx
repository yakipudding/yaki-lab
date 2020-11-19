import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Grid, Link, IconButton, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { getAbout } from '../biz/DBAccessor/AboutTable'
import { AboutInterface } from '../biz/Definition/Interfaces';

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
}));

const About = (props: { about: AboutInterface }) => {
  const classes = AboutStyle();
  const about = props.about

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.aboutCard}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              このサイトについて
            </Typography>
            <Typography className={classes.text}>
              {about.description}
              仕組みについて詳しくは<Link color="secondary" href="/Product/YakiLab/Top.html">こちら</Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.aboutCard}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              焼きぷでぃんぐ
            </Typography>
            <div>
              <img src={about.icon} className={classes.icon} />
            </div>
            <IconButton href={about.github} component="a" target="_blank" aria-label="GitHub">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton href={about.twitter} component="a" target="_blank" aria-label="Twitter">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <Button href={about.qiita} component="a" target="_blank">
              Qiita
            </Button>
            <Typography className={classes.text}>
              {about.content}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default About;