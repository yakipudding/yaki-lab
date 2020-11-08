import React from 'react'
import { ProductArticleInterface } from '../../../biz/Definition/Interfaces';
import { Card, CardContent, CardHeader } from '@material-ui/core/'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  tocCardContent: {
    padding: 0,
  },
}))

// ページリンク
const PageLink = (props: { productName: string, stemUrl: string, pages: ProductArticleInterface[] }) => {
  const classes = useStyles()
  return (
    <Card>
      <CardHeader title="記事リンク" />
      <CardContent className={classes.tocCardContent}>
        <List component="nav" aria-label="main mailbox folders">
          {props.pages.map((page) => {
            return (
              <ListItem
                key={page.articleId}
                button
                component="a"
                selected={page.view}
                href={props.stemUrl + "/" + page.articleId}
                className={classes.list}
              >
              <ListItemText primary={page.articleTitle} />
              </ListItem>
            )
          })}
          </List>
        </CardContent>
      </Card>
  );
}
export default PageLink