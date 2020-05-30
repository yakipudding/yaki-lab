import { database } from '../../config/FirebaseConfig'
import { ProductInterface, ProductArticleInterface } from '../Definition/Interfaces'
import moment from 'moment'

// テーブル
const productsTable = database.collection('Products')
const productArticlesTable = database.collection('ProductArticles')
const productArticleContentsTable = database.collection('ProductArticleContents')

// プロダクト一覧
export const getProducts = async (includePrivate?: boolean) => {
  const productsSnapshot = includePrivate ? await productsTable.orderBy("Date", "desc").get()
                         : await productsTable.where("Private","==",false).orderBy("Date", "desc").get()
  let products = [] as ProductInterface[]
  productsSnapshot.forEach((productDoc) => {
    const product = productDoc.data()
    products.push({
      productId: productDoc.id,
      date: moment(product.Date.toDate()).format("YYYY/MM/DD"),
      name: product.Name,
      tags: product.Tags,
      description: product.Description,
      repository: product.Repository,
      articleId: 'Top',
      articleTitle: '',
      content: '',
      private: product.Private,
    })
  })
  return products
}

// 記事取得（記事詳細）
export const getProduct = async (productId: string, getArticleId: string) => {
  // プロダクト取得
  const productDoc = await productsTable.doc(productId).get()
  const product = productDoc.data()
  // プロダクト記事一覧取得
  const productArticlesSnapshot = await productArticlesTable.doc(productId).collection("Pages").orderBy("Order").get()
  const productArticles = [] as ProductArticleInterface[]
  let articleTitle: string = ''
  productArticlesSnapshot.forEach((productArticleDoc) => {
    const productArticle = productArticleDoc.data()
    const productArticleId = productArticleDoc.id
    if(productArticleId === getArticleId){
      articleTitle = productArticle.Title 
    }
    productArticles.push({
      productId: productId,
      articleId: productArticleId,
      articleTitle: productArticle.Title,
      order: productArticle.Order,
      content: '',
      view: productArticleId === getArticleId,
    })
  })
  // プロダクト記事取得
  let articleId = getArticleId
  if(articleId === "Top" && productArticles.length !== 0){
    articleId = productArticles[0].articleId
    articleTitle = productArticles[0].articleTitle
    productArticles[0].view = true
  }
  const productContentDoc = await productArticleContentsTable.doc(productId)
                                    .collection("Pages").doc(articleId).get()
  const productContent = productContentDoc.data()

  if (product && productContent){
    return {
      product: {
        productId :productId,
        date: moment(product.Date.toDate()).format("YYYY/MM/DD"),
        name: product.Name,
        tags: product.Tags,
        description: product.Description,
        repository: product.Repository,
        articleId: articleId,
        articleTitle: articleTitle,
        content: productContent.Content,
        private: product.Private,
        },
      pages: productArticles,
    }
  }
  else{
    return null
  }
}

// 記事取得（記事編集）
export const getProductArticle = async (productId: string, articleId: string) => {
  // プロダクト取得
  const productDoc = await productsTable.doc(productId).get()
  const product = productDoc.data()
  // プロダクト記事一覧取得
  const productArticlesDoc = await productArticlesTable.doc(productId).collection("Pages").doc(articleId).get()
  const productArticle = productArticlesDoc.data()
  // プロダクト記事取得
  const productContentDoc = await productArticleContentsTable.doc(productId)
                                    .collection("Pages").doc(articleId).get()
  const productContent = productContentDoc.data()

  if (product && productArticle && productContent){
    return {
      productId :productId,
      articleId: articleId,
      articleTitle: productArticle.Title,
      order: productArticle.Order,
      content: productContent.Content,
    }
  }
  else{
    return null
  }
}

// 記事取得（プロダクト記事一覧ダッシュボード）
export const getProductArticles = async (productId: string) => {
  // プロダクト記事一覧取得
  const productArticlesSnapshot = await productArticlesTable.doc(productId).collection("Pages").orderBy("Order").get()
  const productArticles = [] as ProductArticleInterface[]
  productArticlesSnapshot.forEach((productArticleDoc) => {
    const productArticle = productArticleDoc.data()
    productArticles.push({
      productId: productId,
      articleId: productArticleDoc.id,
      articleTitle: productArticle.Title,
      order: productArticle.Order,
      content: '',
    })
  })
  return productArticles
}

// 新規プロダクト投稿
export const insertProduct = async (product: ProductInterface) => {
  // Products
  await productsTable.doc(product.productId).set({
    Name: product.name,
    Description: product.description,
    Tags: product.tags,
    Date: new Date(Date.now()),
    Repository: product.repository,
    Private: product.private,
  })

  return true
}

// プロダクト編集（ダッシュボード）
export const updateProductWithoutContent = async (product: ProductInterface) => {
  // Products
  await productsTable.doc(product.productId).set({
    Name: product.name,
    Description: product.description,
    Tags: product.tags,
    Date: moment(product.date).toDate(),
    Repository: product.repository,
    Private: product.private,
  })
  return true
}

// 新規プロダクト記事投稿
export const insertProductArticle = async (productArticle: ProductArticleInterface) => {
  // ProductArticles
  await productArticlesTable.doc(productArticle.productId).collection("Pages")
                            .doc(productArticle.articleId).set({
    Title: productArticle.articleTitle,
    Order: productArticle.order,
  })
  // ProductArticleContents
  await productArticleContentsTable.doc(productArticle.productId).collection("Pages")
                                   .doc(productArticle.articleId).set({
    Content: productArticle.content,
  })
  return true
}

// プロダクト記事編集（ダッシュボード）
export const updateProductArticleWithoutContent = async (productArticle: ProductArticleInterface) => {
  // ProductArticles
  await productArticlesTable.doc(productArticle.productId).collection("Pages")
                            .doc(productArticle.articleId).set({
    Title: productArticle.articleTitle,
    Order: productArticle.order,
  })
  return true
}

// プロダクト記事編集（記事編集）
export const updateProductArticle = async (productArticle: ProductArticleInterface) => {
  // ProductArticles
  await productArticlesTable.doc(productArticle.productId).collection("Pages")
                            .doc(productArticle.articleId).set({
    Title: productArticle.articleTitle,
    Order: productArticle.order,
  })
  // ProductArticleContents
  await productArticleContentsTable.doc(productArticle.productId).collection("Pages")
                                   .doc(productArticle.articleId).set({
    Content: productArticle.content,
  })
  return true
}

// プロダクト削除（ダッシュボードから）
export const deleteProduct = async (productId: string) => {
  await productsTable.doc(productId).delete()
  await productArticlesTable.doc(productId).delete()
  await productArticleContentsTable.doc(productId).delete()
  return true
}

// プロダクト削除（ダッシュボードから）
export const deleteProductArticle = async (productId: string, productArticleId: string) => {
  await productArticlesTable.doc(productId).collection("Pages").doc(productArticleId).delete()
  await productArticleContentsTable.doc(productId).collection("Pages").doc(productArticleId).delete()

  return true
}

export default null