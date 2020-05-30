import { database } from '../../config/FirebaseConfig'
import { ArticleInterface } from '../Definition/Interfaces'
import moment from 'moment'

// テーブル
const articlesTable = database.collection('Articles')
const articleContentsTable = database.collection('ArticleContents')

// 記事一覧
export const getArticles = async (includePrivate?: boolean) => {
  const articlesSnapshot = includePrivate ? await articlesTable.orderBy("Date", "desc").get()
                                          : await articlesTable.where("Private","==",false).orderBy("Date", "desc").get()
  let articles = [] as ArticleInterface[]
  articlesSnapshot.forEach((articleDoc) => {
    const article = articleDoc.data()
    articles.push({
      id: articleDoc.id,
      date: moment(article.Date.toDate()).format("YYYY/MM/DD"),
      title: article.Title,
      category: article.Category,
      tags: article.Tags,
      url: article.Url,
      content: '',
      private: article.Private,
    })
  })
  return articles
}

// 記事取得（記事詳細・記事編集）
export const getArticle = async (articleId: string) => {
  const articleDoc = await articlesTable.doc(articleId).get()
  const articleContentDoc = await articleContentsTable.doc(articleId).get()
  const article = articleDoc.data()
  const articleContent = articleContentDoc.data()
  if (article && articleContent){
    return {
      id :articleId,
      date: moment(article.Date.toDate()).format("YYYY/MM/DD"),
      title: article.Title,
      category: article.Category,
      tags: article.Tags,
      url: article.Url,
      content: articleContent.Content,
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
  const articleRef = await articlesTable.add({
    Category: article.category,
    Title: article.title,
    Tags: article.tags,
    Date: new Date(Date.now()),
    Url: article.url === '' ? null : article.url,
    Private: article.private,
  })
  // ArticleContents
  await articleContentsTable.doc(articleRef.id).set({
    Content: article.content,
  })

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
    Private: article.private,
  })
  
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
    Private: article.private,
  })
  // ArticleContents
  await articleContentsTable.doc(article.id).set({
    Content: article.content,
  })

  return true
}

// 記事削除（ダッシュボードから）
export const deleteArticle = async (articleId: string) => {
  await articlesTable.doc(articleId).delete()
  await articleContentsTable.doc(articleId).delete()
  
  return true
}