import { database } from '../../config/FirebaseConfig'
import { ArticleInterface, ArticleViewInterface, ArticleParamsInterface } from '../Definition/Interfaces'
import moment from 'moment'

// テーブル
const articlesTable = database.collection('Articles')
// View
const articlesViewDoc = database.collection('View').doc('Articles')
const adminArticlesViewDoc = database.collection('View').doc('AdminArticles')

// 記事一覧
export const getArticles = async (includePrivate?: boolean) => {
  const articlesDoc = includePrivate ? await adminArticlesViewDoc.get() 
                                     : await articlesViewDoc.get()
  const articlesData = articlesDoc.data()
  let articles = [] as ArticleInterface[]
  if(articlesData){
    articlesData.Articles.forEach((article: ArticleViewInterface) => {
      articles.push({
        id: article.Id,
        date: article.Date,
        title: article.Title,
        category: article.Category,
        tags: article.Tags,
        url: article.Url,
        content: '',
        private: false,
      })
    })
  }

  return articles
}

export const getArticleIds = async () => {
  const articlesDoc = await articlesViewDoc.get()
  const articlesData = articlesDoc.data()
  let articleIds = [] as ArticleParamsInterface[]
  if(articlesData){
    articlesData.Articles.forEach((article: ArticleViewInterface) => {
      articleIds.push({
        params: {
          id: article.Id,
        },
      })
    })
  }

  return articleIds
}

// 記事取得（記事詳細・記事編集）
export const getArticle = async (articleId: string) => {
  const articleDoc = await articlesTable.doc(articleId).get()
  const article = articleDoc.data()
  if (article){
    return {
      id :articleId,
      date: moment(article.Date.toDate()).format("YYYY/MM/DD"),
      title: article.Title,
      category: article.Category,
      tags: article.Tags,
      url: article.Url,
      content: article.Content,
      private: article.Private,
    }
  }
  else{
    return null
  }
}

// 新規記事投稿
export const insertArticle = async (article: ArticleInterface) => {
  // Articles
  await articlesTable.add({
    Category: article.category,
    Title: article.title,
    Tags: article.tags,
    Date: new Date(Date.now()),
    Url: article.url === '' ? null : article.url,
    Content: article.content,
    Private: article.private,
  })

  await updateView()

  return true
}

// 記事編集（ダッシュボードから）
export const updateArticleWithoutContent = async (article: ArticleInterface) => {
  // Articles
  await articlesTable.doc(article.id).set({
    Category: article.category,
    Title: article.title,
    Tags: article.tags,
    Date: moment(article.date).toDate(),
    Url: article.url === '' ? null : article.url,
    // Content: article.content, ダッシュボードなので変更しない
    Private: article.private,
  }, { merge: true })
  
  await updateView()
  
  return true
}

// 記事編集（編集画面）
export const updateArticle = async (article: ArticleInterface) => {
  // Articles
  await articlesTable.doc(article.id).set({
    Category: article.category,
    Title: article.title,
    Tags: article.tags,
    Date: moment(article.date).toDate(),
    Url: article.url === '' ? null : article.url,
    Content: article.content,
    Private: article.private,
  })

  await updateView()

  return true
}

// 記事削除（ダッシュボードから）
export const deleteArticle = async (articleId: string) => {
  await articlesTable.doc(articleId).delete()
  
  await updateView()

  return true
}

// View更新
export const updateView = async () => {
  const articlesSnapshot = await articlesTable.orderBy("Date", "desc").get()
  let articlesView = [] as ArticleViewInterface[]
  let adminArticlesView = [] as ArticleViewInterface[]
  articlesSnapshot.forEach((articleDoc: any) => {
    const article = articleDoc.data()
    if(!article.Private){
      articlesView.push({
        Id: articleDoc.id,
        Date: moment(article.Date.toDate()).format("YYYY/MM/DD"),
        Title: article.Title,
        Category: article.Category,
        Tags: article.Tags,
        Url: article.Url,
        Private: article.Private,
      })
    }
    adminArticlesView.push({
      Id: articleDoc.id,
      Date: moment(article.Date.toDate()).format("YYYY/MM/DD"),
      Title: article.Title,
      Category: article.Category,
      Tags: article.Tags,
      Url: article.Url,
      Private: article.Private,
    })
  })

  await articlesViewDoc.set({Articles: articlesView})
  await adminArticlesViewDoc.set({Articles: adminArticlesView})

  return true
}