import React from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArticleInterface, ProductInterface } from '../../biz/Definition/Interfaces';
import { ItemType } from '../../biz/Definition/Enums';
import ArticleCard, { CardInterface } from './ArticleCard'

// カードリスト
const CardHeadStyle = makeStyles(theme => ({
  categoryTech: {
    backgroundColor: "#e8eaf6",
  },
  categoryWork: {
    backgroundColor: "#e0f2f1"
  },
  categoryLife: {
    backgroundColor: "#fff3e0"
  },
}));

const getCardFromArticle = (article: ArticleInterface, classes:any) => {
  return {
    id: article.id,
    className : article.category === 10 ? classes.categoryTech 
              : article.category === 20 ? classes.categoryWork 
                                        : classes.categoryLife,
    cardHeaderTitle : article.category === 10 ? "TECH"
                    : article.category === 20 ? "WORK"
                                              : "LIFE",
    link: article.url ? article.url : `/Article/${article.id}.html`,
    target: article.url ? "_blank" : "_self",
    title: article.title,
    tags: article.tags,
  }
}
const getCardFromProduct = (product: ProductInterface, classes:any) => {
  return {
    id: product.productId,
    className: classes.categoryTech,
    cardHeaderTitle: "TECH",
    link: `/Product/${product.productId}/Top.html`,
    target: "_self",
    title: product.name,
    description: product.description,
    tags: product.tags,
  }
}

const CardList = (props: { type: ItemType, items: Array<ArticleInterface | ProductInterface>, tagFilter: (tag:string) => void } ) => {
  const classes = CardHeadStyle();
  return (
    <Grid container spacing={3}>
      { props.items.map((item) => {
          const cardInfo:CardInterface = 
            props.type === ItemType.Article ? getCardFromArticle(item as ArticleInterface,classes) 
                                            : getCardFromProduct(item as ProductInterface,classes)
          return (
            <Grid item xs={12} sm={6} md={4} key={cardInfo.id}>
              <ArticleCard cardInfo={cardInfo} tagFilter={props.tagFilter} />
            </Grid>
          )
        })
      }
    </Grid>
  );
}

export default CardList;