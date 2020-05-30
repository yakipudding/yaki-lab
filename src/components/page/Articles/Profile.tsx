import React from 'react'
import { Card, CardMedia, Link, Typography, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import ProfileStyle from '././ProfileStyle'

// プロフィール
const Profile = () => {
  const classes = ProfileStyle();

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        PROFILE
      </Typography>
      <Card className={classes.iconCard}>
        <CardMedia
          className={classes.icon}
          image="/profile_icon.png"
          title="icon"
        />
      </Card>
      <Typography variant="subtitle1">
        焼きぷでぃんぐ
      </Typography>
      <Typography variant="body1" gutterBottom className={classes.profileText}>
        機械学習やWEB開発系のエンジニア<br />
        ここは技術メモや個人開発したもの、思いつきの記事をまとめています<br />
      </Typography>
      <IconButton aria-label="twitter" size="small" href="https://twitter.com/yakipudding" target="_blank">
        <TwitterIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="repository" size="small" href="https://github.com/yakipudding/" target="_blank">
        <GitHubIcon fontSize="inherit" />
      </IconButton>
      <Typography variant="body1" gutterBottom className={classes.profileText}>
        詳しくは<Link href="/About" color="textSecondary">About</Link>参照
      </Typography>
    </div>
  );
}
export default Profile