import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import CardList from '../components/CardList/CardList'
import { ArticleInterface, AboutInterface } from '../biz/Definition/Interfaces'
import { ItemType } from '../biz/Definition/Enums'
import TagLink from '../components/Link/TagLink'
import { getArticles } from '../biz/DBAccessor/ArticleTable'
import { getAbout } from '../biz/DBAccessor/AboutTable'
import Loading from '../components/FeedBack/Loading'
import About from '../components/About'

// 記事一覧
export const getStaticProps = async () => {
  const articles = await getArticles()
  let tags = [] as string[]
  articles.forEach((article) =>{
    if(article.tags){
      article.tags.split(' ').forEach((tag)=> {
        if(!tags.includes(tag)){
          tags.push(tag)
        }
      })
    }
  })

  // About
  const about = await getAbout()

  return {
    props: {
      articles: articles,
      tags: tags,
      about: about,
    }
  }
}

interface Props {
  articles: ArticleInterface[],
  tags: string[],
  about: AboutInterface,
}

interface StateInterface {
  articles: ArticleInterface[],
  filter : string | null,
}

const Articles = (props: Props) => {
  const router = useRouter()
  const { tagParam } = router.query
  const tag = tagParam as string
  const [values, setValues] = useState<StateInterface>(
  {
    articles: tag ? props.articles.filter(article => article.tags?.includes(tag)) : props.articles,
    filter: tag,
  })

  const tagFilter = (tag: string) => {
    setValues(
      {
        articles: tag !== values.filter ? props.articles.filter(article => article.tags?.includes(tag)) : props.articles,
        filter: tag !== values.filter ? tag : null,
      }
    )
  }

  if(values){    
    return (
      <Grid container spacing={3}>
        <Grid item sm={9} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CardList type={ItemType.Article} items={values.articles} tagFilter={tagFilter} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TagLink tags={props.tags} tagFilter={tagFilter} filter={values.filter} />
            </Grid>
            <Grid item xs={12}>
              <About about={props.about} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
  else{
    return <Loading />
  }
}
export default Articles