import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardList from '../../common/CardList/CardList'
import { ArticleInterface } from '../../../biz/Definition/Interfaces'
import { TagPageProps } from '../../../biz/Definition/Types'
import { ItemType } from '../../../biz/Definition/Enums'
import Profile from './Profile'
import TagLink from '../../common/Link/TagLink'
import { getArticles } from '../../../biz/DBAccessor/ArticleTable'
import Loading from '../../common/FeedBack/Loading'

// 記事一覧
const Articles = (props: TagPageProps) => {
  const tag = props.match.params.tag
  const [values, setValues] = useState<
  { 
    allArticles: ArticleInterface[], 
    articles: ArticleInterface[], 
    tags: string[],
    filter : string | null
  } | null>(null)
  
  // firestoreから取得
  useEffect(() => {
    getArticles().then((articlesfromDB) => {
      let tagLink = [] as string[]
      articlesfromDB.forEach((article) =>{
        if(article.tags){
          article.tags.split(' ').forEach((tag)=> {
            if(!tagLink.includes(tag)){
              tagLink.push(tag)
            }
          })
        }
      })
      setValues(
        { 
          allArticles: articlesfromDB,
          articles: tag ? articlesfromDB.filter(article => article.tags?.includes(tag)) : articlesfromDB,
          tags: tagLink,
          filter: tag ? tag : null,
        }
      )
    })
  }, [tag]);

  const tagFilter = (tag: string) => {
    if(values){
      if(tag !== values.filter){
        setValues(
          { ...values,
            articles: values.allArticles.filter(article => article.tags?.includes(tag)),
            filter: tag,
          }
        )
      }
      else{
        setValues(
          { ...values,
            articles: values.allArticles,
            filter: null,
          }
        )
      }
    }
  }

  if(values){    
    return (
      <Grid container spacing={3}>
        <Grid item sm={9} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                記事一覧
              </Typography>
                <CardList type={ItemType.Article} items={values.articles} tagFilter={tagFilter} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2">
                タグ一覧
              </Typography>
              <TagLink tags={values.tags} tagFilter={tagFilter} filter={values.filter} />
            </Grid>
            <Grid item xs={12}>
              <Profile />
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