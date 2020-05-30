import React from 'react';
import { Card, CardMedia, Container, Grid, Link, Typography, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import AboutStyle from './AboutStyle'

// 作者ページ
const About = () => {
  const classes = AboutStyle();

    return (
    <Container maxWidth="sm">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h2">
            焼きぷでぃんぐ
          </Typography>
          <Card className={classes.iconCard}>
            <CardMedia
              className={classes.icon}
              image="/profile_icon.png"
              title="icon"
            />
          </Card>
          <Typography variant="body1" className={classes.profileText}>
            機械学習やWEB開発系のエンジニア<br />
            連絡等はTwitterまで。
          </Typography>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <IconButton aria-label="twitter" size="small" href="https://twitter.com/yakipudding" target="_blank">
                <TwitterIcon fontSize="inherit" />
              </IconButton>
            </li>
            <li className={classes.li}>
              <IconButton aria-label="repository" size="small" href="https://github.com/yakipudding/" target="_blank">
                <GitHubIcon fontSize="inherit" />
              </IconButton>
            </li>
            <li className={classes.li}>
              <Link href="https://qiita.com/yakipudding" color="textSecondary" target="_blank">
                Qiita
              </Link>
            </li>
            <li className={classes.li}>
              <Link href="https://yakipudding.qrunch.io/" color="textSecondary" target="_blank">
                Qrunch
              </Link>
            </li>
            <li className={classes.li}>
              <Link href="http://yakipudding.hatenablog.com/" color="textSecondary" target="_blank">
                はてなブログ
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <th className={classes.th}>Windows Application</th>
                <td className={classes.td}>C# WindowsForm WPF</td>
              </tr>
              <tr>
                <th className={classes.th}>Web Application</th>
                <td className={classes.td}>C# ASP.NET MVC<br/>React.js</td>
              </tr>
              <tr>
                <th className={classes.th}>Database</th>
                <td className={classes.td}>SQL Server</td>
              </tr>
              <tr>
                <th className={classes.th}>Machine Learning</th>
                <td className={classes.td}>NLP(自然言語処理) fastText</td>
              </tr>
              <tr>
                <th className={classes.th}>Analytics</th>
                <td className={classes.td}>Python R</td>
              </tr>
            </tbody>
          </table>
        </Grid>

      </Grid>
    </Container>
  );
}

export default About;