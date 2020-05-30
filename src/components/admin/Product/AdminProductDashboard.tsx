import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import MaterialTable, { Column } from 'material-table';
import { ProductInterface } from '../../../biz/Definition/Interfaces'
import { PageProps } from '../../../biz/Definition/Types'
import { getProducts, updateProductWithoutContent, deleteProduct } from '../../../biz/DBAccessor/ProductTable'
import Loading from '../../common/FeedBack/Loading'

// 管理者用プロダクトダッシュボード
const AdminProductDashboard = ( props:PageProps ) => {
  interface TableState {
    columns: Column<ProductInterface>[];
    data: ProductInterface[];
  }

  const [state, setState] = useState<TableState>(
    {
      columns: [
        { title: 'Date', field: 'date' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Tags', field: 'tags' },
        { title: 'Repository', field: 'repository', headerStyle: {maxWidth: 400}, cellStyle: {maxWidth: 400} },
        { title: 'Private', field: 'private', type: 'boolean' },
      ],
      data: []
    })

  useEffect(() => {
    // firestoreから取得
    getProducts(true).then((productsfromDB) => {
      setState({ 
        columns: state.columns,
        data: productsfromDB })
    })
  }, [state.columns]);

const onRowUpdate = (newData : ProductInterface, oldData : ProductInterface | undefined) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
      if (oldData) {
        // firestore更新
        updateProductWithoutContent(newData)
        setState(prevState => {
          const data = [...prevState.data];
          data[data.indexOf(oldData)] = newData;
          return { ...prevState, data };
        });
      }
    }, 600);
  })

const onRowDelete = (oldData : ProductInterface | undefined) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
      if (oldData) {
        // firestore削除
        deleteProduct(oldData.productId)
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
        <Button variant="contained" color="primary" href="AdminNewProduct" startIcon={<CreateIcon />}>
          Create New Product
        </Button>
      </Grid>
      <Grid item xs={12}>
    { state.data.length !== 0 ? 
      <MaterialTable
        title="Products"
        columns={state.columns}
        data={state.data as ProductInterface[]}
        options={{ 
          pageSize: 8,
          pageSizeOptions: [8, 20, 30],
          filtering: true,
          search: false,
        }}
        actions={[
          {
            icon: 'notes',
            tooltip: 'Edit Articles',
            onClick: (event, rowData) => {
              // Do save operation
              const product = rowData as ProductInterface
              props.history.push("/AdminProductArticles/" + product.productId)
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
export default AdminProductDashboard