import React from 'react'
import { Link, Typography } from '@material-ui/core';
import { ProductArticleInterface } from '../../../biz/Definition/Interfaces';
import PageLinkStyle from './PageLinkStyle'

// ページリンク
const PageLink = (props: {productName: string, stemUrl: string, pages: ProductArticleInterface[], tocDom: JSX.Element}) => {
  const classes = PageLinkStyle();

  return (
    <div className="toc">
      <Typography variant="h3">
        {props.productName}
      </Typography>
      <div className={classes.link}>
        <ul className={classes.ul}>
          {props.pages.map((page) => {
            return(
              <div>
                <li key={page.articleId}>
                  { page.view ?
                        <Typography className={classes.view}>
                          {page.articleTitle}
                        </Typography>
                      : <Link href={props.stemUrl + "/" + page.articleId} color="inherit">
                          {page.articleTitle}
                        </Link>
                  }
                </li>
                {page.view ? props.tocDom : null}
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
export default PageLink