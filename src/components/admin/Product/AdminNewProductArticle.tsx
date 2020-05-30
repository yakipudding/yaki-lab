import React from 'react';
import { insertProductArticle } from '../../../biz/DBAccessor/ProductTable'
import ArticleForm from './ProductArticleForm'
import { ProductArticleInterface } from '../../../biz/Definition/Interfaces'
import { IdPageProps } from '../../../biz/Definition/Types'

// 新規記事
const AdminNewProductArticle = (props: IdPageProps) => {
  const productId = props.match.params.id
  const initArticle:ProductArticleInterface = {
    productId: productId,
    articleId: '',
    articleTitle: '',
    content: '',
    order: 100,
  };
  
  const submit = (article: ProductArticleInterface) => {
    //firebaseに登録
    insertProductArticle(article).then(() => {
      props.history.push(('/AdminProductArticles/' + productId))
    })
  };

  return (
    <ArticleForm 
      initArticle={initArticle}
      submit={submit}
    />
  );
}

export default AdminNewProductArticle;