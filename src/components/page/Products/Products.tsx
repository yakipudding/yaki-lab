import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardList from '../../common/CardList/CardList'
import { ProductInterface } from '../../../biz/Definition/Interfaces'
import { TagPageProps } from '../../../biz/Definition/Types'
import { ItemType } from '../../../biz/Definition/Enums'
import { getProducts } from '../../../biz/DBAccessor/ProductTable'
import TagLink from '../../common/Link/TagLink'
import Loading from '../../common/FeedBack/Loading'

// プロダクトページ
const Products = (props: TagPageProps) => {
  const tag = props.match.params.tag
  const [values, setValues] = useState<
  {
    allProducts: ProductInterface[],
    products: ProductInterface[],
    tags: string[],
    filter: string | null,
  } | null>(null)
  
  // firebaseから取得
  useEffect(() => {
    getProducts().then((productsFromDB) => {
      let tagLink = [] as string[]
      productsFromDB.forEach((product) =>{
        if(product.tags){
          product.tags.split(' ').forEach((tag)=> {
            if(!tagLink.includes(tag)){
              tagLink.push(tag)
            }
          })
        }
      })
      setValues(
      { 
        allProducts: productsFromDB,
        products: tag ? productsFromDB.filter(project => project.tags?.includes(tag)) : productsFromDB,
        tags: tagLink,
        filter: tag ? tag : null,
      })
    })
  }, [tag]);

  const tagFilter = (tag: string) => {
    if(values){
      if(tag !== values.filter){
        setValues(
          { ...values,
            products: values.allProducts.filter(product => product.tags?.includes(tag)),
            filter: tag,
          }
        )
      }
      else{
        setValues(
          { ...values,
            products: values.allProducts,
            filter: null,
          }
        )
      }
    }
  }

  if(values){
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                製作物一覧
              </Typography>
              <CardList type={ItemType.Product} items={values.products} tagFilter={tagFilter} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <Typography variant="h2">
                TAGS
              </Typography>
              <TagLink tags={values.tags} tagFilter={tagFilter} filter={values.filter} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  else{
    return <Loading />
  }
}
export default Products