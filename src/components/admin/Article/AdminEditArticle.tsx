import React, { useState, useEffect } from 'react';
import { getArticle, updateArticle } from '../../../biz/DBAccessor/ArticleTable'
import ArticleForm from './ArticleForm'
import { ArticleInterface } from '../../../biz/Definition/Interfaces'
import { IdPageProps } from '../../../biz/Definition/Types'
import Loading from '../../common/FeedBack/Loading'

// 記事編集
const AdminEditArticle = (props: IdPageProps) => {
  const articleId = props.match.params.id;
  const [values, setValues] = useState<ArticleInterface | null>(null);
  
  // 初期処理：記事取得
  useEffect(() => {
    if (articleId) {
      // firebaseから取得
      getArticle(articleId).then((articleFromDB) => {
        setValues(articleFromDB)
      })
    }
  }, [articleId]);
  
  const submit = (article: ArticleInterface) => {
    //firebaseに登録
    updateArticle(article).then(() => {
      props.history.push(('/AdminDashBoard'))
    })
  };

  return (
    values ? <ArticleForm initArticle={values} submit={submit} />
           : <Loading />
  );
}

export default AdminEditArticle;