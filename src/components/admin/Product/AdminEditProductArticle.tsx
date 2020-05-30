import React, { useState, useEffect } from 'react';
import { getProductArticle, updateProductArticle } from '../../../biz/DBAccessor/ProductTable'
import ArticleForm from './ProductArticleForm'
import { ProductArticleInterface } from '../../../biz/Definition/Interfaces'
import { ProductPageProps } from '../../../biz/Definition/Types'
import Loading from '../../common/FeedBack/Loading'

// 記事編集
const AdminEditArticle = (props: ProductPageProps) => {
  const productId = props.match.params.productId
  const articleId = props.match.params.articleId
  const [values, setValues] = useState<ProductArticleInterface | null>(null);
  
  // 初期処理：記事取得
  useEffect(() => {
    if (productId) {
      // firebaseから取得
      getProductArticle(productId, articleId).then((articleFromDB) => {
        setValues(articleFromDB)
      })
    }
  }, [productId, articleId]);
  
  const submit = (article: ProductArticleInterface) => {
    //firebaseに登録
    updateProductArticle(article).then(() => {
      props.history.push(('/AdminProductArticles/' + productId))
    })
  };

  return (
    values ? <ArticleForm initArticle={values} submit={submit} />
           : <Loading />
  );
}

export default AdminEditArticle;