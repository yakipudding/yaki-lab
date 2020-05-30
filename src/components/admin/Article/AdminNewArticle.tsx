import React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { insertArticle } from '../../../biz/DBAccessor/ArticleTable'
import ArticleForm from './ArticleForm'
import { ArticleInterface } from '../../../biz/Definition/Interfaces'

// 新規記事
const AdminNewArticle = (props: RouteComponentProps<{}>) => {
  const initArticle:ArticleInterface = {
    id: '',
    date: '',
    title: '',
    category: 10,
    tags: null,
    url: '',
    content: '',
    private: false,
  };
  
  const submit = (article: ArticleInterface) => {
    //firebaseに登録
    insertArticle(article).then(() => {
      props.history.push(('/AdminDashBoard'))
    })
  };

  return (
    <ArticleForm 
      initArticle={initArticle}
      submit={submit}
    />
  );
}

export default AdminNewArticle;