import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import MaterialTable, { Column } from 'material-table';
import { ProductArticleInterface } from '../../../biz/Definition/Interfaces'
import { IdPageProps } from '../../../biz/Definition/Types'
import { getProductArticles, updateProductArticleWithoutContent, deleteProductArticle } from '../../../biz/DBAccessor/ProductTable'
import Loading from '../../common/FeedBack/Loading'

// 管理者用プロダクト記事ダッシュボード
const AdminProductArticles = ( props:IdPageProps ) => {
  const productId = props.match.params.id
  interface TableState {
    columns: Column<ProductArticleInterface>[];
    data: ProductArticleInterface[];
  }

  const [state, setState] = useState<TableState>(
    {
      columns: [
        { title: 'ArticleId', field: 'articleId', editable: 'never' },
        { title: 'Title', field: 'articleTitle' },
        { title: 'Order', field: 'order' },
      ],
      data: []
    })

  useEffect(() => {
    // firestoreから取得
    getProductArticles(productId).then((productArticlesfromDB) => {
      setState({ 
        columns: state.columns,
        data: productArticlesfromDB })
    })
  }, [productId, state.columns]);

const onRowUpdate = (newData : ProductArticleInterface, oldData : ProductArticleInterface | undefined) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
      if (oldData) {
        // firestore更新
        updateProductArticleWithoutContent(newData)
        setState(prevState => {
          const data = [...prevState.data];
          data[data.indexOf(oldData)] = newData;
          return { ...prevState, data };
        });
      }
    }, 600);
  })

const onRowDelete = (oldData : ProductArticleInterface | undefined) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
      if (oldData) {
        // firestore削除
        deleteProductArticle(productId, oldData.articleId)
        setState(prevState => {
          const data = [...prevState.data];
          data.splice(data.indexOf(oldData), 1);
          return { ...prevState, data };
        });
      }
    }, 600);
  })

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>
          ==ADMIN== PRODUCT DASHBOARD
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" href={"/AdminNewProductArticle/" + productId} startIcon={<CreateIcon />}>
          Create New Product Article
        </Button>
      </Grid>
      <Grid item xs={12}>
    { state.data.length !== 0 ? 
      <MaterialTable
        title="Products"
        columns={state.columns}
        data={state.data as ProductArticleInterface[]}
        options={{ 
          pageSize: 8,
          pageSizeOptions: [8, 20, 30],
          filtering: true,
          search: false,
        }}
        actions={[
          {
            icon: 'notes',
            tooltip: 'Edit Article',
            onClick: (event, rowData) => {
              // Do save operation
              const product = rowData as ProductArticleInterface
              props.history.push("/AdminEditProductArticle/" + product.productId + "/" + product.articleId)
            }
          }
        ]}
        editable={{
          onRowUpdate: onRowUpdate,
          onRowDelete: onRowDelete,
        }}
      />

     : <Loading />}
      </Grid>
    </Grid>
  );
}
export default AdminProductArticles