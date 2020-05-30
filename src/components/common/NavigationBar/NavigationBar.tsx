import React from 'react';
import { AppBar, Container, Link, Toolbar, Typography } from '@material-ui/core';
import TabMenu from './TabMenu'
import NavigationStyle from './NavigationStyle'
import { PageProps } from '../../../biz/Definition/Types'

// ナビゲーションバー
const NavigationBar = (props: PageProps) => {
  const classes = NavigationStyle();
  const path = props.location.pathname
  const admin = path.startsWith("/Admin")
  let tabIndex = 0
  if(admin){
    tabIndex = path === "/AdminDashboard" || path === "/AdminNewArticle" ? 0
              : 1
  } 
  else{
    tabIndex = path === "/" ? 0
              : path.startsWith("/Product") ? 1
              : path === "/About"? 2
              : 0
  }

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar className={classes.title}>
          <Typography variant="h1">
            <Link href="/" color="inherit">
              焼きらぼ。
            </Link>
          </Typography>
          <Typography variant="subtitle1" component="span">
            {admin ? "管理者モード" : "雑なポートフォリオサイト"}
          </Typography>
        </Toolbar>
        <TabMenu index={tabIndex} admin={admin} />
      </Container>
    </AppBar>
  );
}
export default NavigationBar