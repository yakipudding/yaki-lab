import React from 'react'
import { Card, CardHeader, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import TagLink from '../Link/TagLink'

// カードリスト
const CardStyle = makeStyles(theme => ({
  card: {
    height: 'auto',
    '@media (min-width:768px)': {
      height: 225,
    },
  },
  cardHead: {
    padding: 0
  },
  cardContent: {
    paddingTop: 5,
    height:65,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardBottom: {
    paddingTop: 5,
  },
  description: {
    color: "#757575"
  },
}));

export interface CardInterface {
  id: string
  className:any
  cardHeaderTitle:string
  link: string
  target: string
  title?: string
  description?: string | null
  tags: string | null
}

const CardList = (props: { cardInfo: CardInterface, tagFilter: (tag:string) => void }) => {
  const classes = CardStyle();
  const cardInfo = props.cardInfo
  return (
    <Card className={classes.card}>
      <CardHeader 
        className={cardInfo.className}
        title={cardInfo.cardHeaderTitle}
          />
      <CardActionArea type="button" href={cardInfo.link} target={cardInfo.target}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h3" className={classes.cardTitle}>
            {cardInfo.title}
            {cardInfo.target === "_blank" ? <OpenInNewIcon fontSize="inherit" /> : null}
          </Typography>
          {cardInfo.description ? 
            <Typography variant="body2" className={classes.description}>
            {cardInfo.description}
          </Typography>
          : null
          }
        </CardContent>
      </CardActionArea>
      <CardContent className={classes.cardBottom}>
        {cardInfo.tags ? <TagLink tags={cardInfo.tags.split(' ')} tagFilter={props.tagFilter} /> : null}
      </CardContent>
    </Card>
  );
}

export default CardList;