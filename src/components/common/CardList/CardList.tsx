import React from 'react'
import { Card, CardHeader, CardActionArea, CardContent, Typography, Grid } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { ArticleInterface, ProductInterface } from '../../../biz/Definition/Interfaces';
import { ItemType } from '../../../biz/Definition/Enums';
import TagLink from '../Link/TagLink'
import CardStyle from './CardStyle'

// カードリスト
const CardList = (props: { type: ItemType, items: Array<ArticleInterface | ProductInterface>, tagFilter: (tag:string) => void } ) => {
  const classes = CardStyle();
  return (
    <Grid container spacing={3}>
      { props.items.map((item) => {
          let id: string
          let className:any = null
          let cardHeaderTitle:string = ""
          let link: string
          let target = "_self"
          let title: string
          let description: string | null = null
          let tags: string | null
          if(props.type === ItemType.Article)
          {
            const article = item as ArticleInterface
            id = article.id
            className = article.category === 10 ? classes.categoryTech 
                      : article.category === 20 ? classes.categoryWork 
                                                : classes.categoryLife
            cardHeaderTitle = article.category === 10 ? "TECH"
                            : article.category === 20 ? "WORK"
                                                      : "LIFE"
            link = article.url ? article.url : ("/Article/" + id)
            target = article.url ? "_blank" : "_self"
            title = article.title
            tags = article.tags
          }
          else{
            const product = item as ProductInterface
            className = classes.categoryTech
            cardHeaderTitle = "TECH"
            id = product.productId
            link = "/Product/" + id + "/Top"
            title = product.name
            description = product.description
            tags = product.tags
          }
          return (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <Card className={classes.card}>
                <CardHeader 
                  className={className}
                  title={cardHeaderTitle}
                   />
                <CardActionArea type="button" href={link} target={target}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h3" className={classes.cardTitle}>
                      {title}
                      {target === "_blank" ? <OpenInNewIcon fontSize="inherit" /> : null}
                    </Typography>
                    {description ? 
                      <Typography variant="body2" className={classes.description}>
                      {description}
                    </Typography>
                    : null
                    }
                  </CardContent>
                </CardActionArea>
                <CardContent className={classes.cardBottom}>
                  {tags ? <TagLink tags={tags.split(' ')} tagFilter={props.tagFilter} /> : null}
                </CardContent>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  );
}

export default CardList;