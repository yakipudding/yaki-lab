import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid';
import CardList from '../../components/CardList/CardList'
import { ProductInterface } from '../../biz/Definition/Interfaces'
import { ItemType } from '../../biz/Definition/Enums'
import { getProducts } from '../../biz/DBAccessor/ProductTable'
import TagLink from '../../components/Link/TagLink'
import Loading from '../../components/FeedBack/Loading'

// プロダクト一覧
export const getStaticProps = async () => {
  const products = await getProducts()
  let tags = [] as string[]
  products.forEach((product) =>{
    if(product.tags){
      product.tags.split(' ').forEach((tag)=> {
        if(!tags.includes(tag)){
          tags.push(tag)
        }
      })
    }
  })

  return {
    props: {
      products: products,
      tags: tags,
    }
  }
}

interface Props {
  products: ProductInterface[],
  tags: string[]
}

interface StateInterface {
  products: ProductInterface[],
  filter : string | null
}

const Products = (props: Props) => {
  const router = useRouter()
  const { tagParam } = router.query
  const tag = tagParam as string
  const [values, setValues] = useState<StateInterface>(
  {
    products: tag ? props.products.filter(product => product.tags?.includes(tag)) : props.products,
    filter: tag,
  })

  const tagFilter = (tag: string) => {
    setValues(
      {
        products: tag !== values.filter ? props.products.filter(product => product.tags?.includes(tag)) : props.products,
        filter: tag !== values.filter ? tag : null,
      }
    )
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CardList type={ItemType.Product} items={values.products} tagFilter={tagFilter} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <TagLink tags={props.tags} tagFilter={tagFilter} filter={values.filter} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export default Products