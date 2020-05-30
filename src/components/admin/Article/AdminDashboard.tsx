import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import MaterialTable, { Column } from 'material-table';
import { ArticleInterface } from '../../../biz/Definition/Interfaces'
import { PageProps } from '../../../biz/Definition/Types'
import { getArticles, updateArticleWithoutContent, deleteArticle } from '../../../biz/DBAccessor/ArticleTable'
import Loading from '../../common/FeedBack/Loading'

// 管理者用ダッシュボード
const AdminDashboard = (props:PageProps ) => {
  interface TableState {
    columns: Column<ArticleInterface>[];
    data: ArticleInterface[];
  }

  const [state, setState] = useState<TableState>(
    {
      columns: [
        { title: 'Date', field: 'date' },
        { title: 'Title', field: 'title' },
        { title: 'Category', field: 'category', lookup: {10: '技術', 20: '仕事', 30:'生活'} },
        { title: 'Tags', field: 'tags' },
        { title: 'URL', field: 'url' },
        { title: 'Private', field: 'private', type: 'boolean' },
      ],
      data: []
    })

  useEffect(() => {
    // firestoreから取得
    getArticles(true).then((articlesfromDB) => {
      setState({ 
        columns: state.columns,
        data: articlesfromDB })
    })
  }, [state.columns]);

const onRowUpdate = (newData : ArticleInterface, oldData : ArticleInterface | undefined) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
      if (oldData) {
        // firestore更新
        updateArticleWithoutContent(newData)
        setState(prevState => {
          const data = [...prevState.data];
          data[data.indexOf(oldData)] = newData;
          return { ...prevState, data };
        });
      }
    }, 600);
  })

const onRowDelete = (oldData : ArticleInterface | undefined) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
      if (oldData) {
        // firestore削除
        deleteArticle(oldData.id)
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
          ==ADMIN== DASHBOARD
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" href="AdminNewArticle" startIcon={<CreateIcon />}>
          Create New Articre
        </Button>
      </Grid>
      <Grid item xs={12}>
    { state.data.length !== 0 ? 
      <MaterialTable
        title="Articles"
        columns={state.columns}
        data={state.data as ArticleInterface[]}
        options={{ 
          pageSize: 8,
          pageSizeOptions: [8, 20, 30],
          filtering: true,
          search: false,
        }}
        actions={[
          {
            icon: 'notes',
            tooltip: 'Edit Detail',
            onClick: (event, rowData) => {
              // Do save operation
              const article = rowData as ArticleInterface
              props.history.push("/AdminEditArticle/" + article.id)
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
export default AdminDashboard