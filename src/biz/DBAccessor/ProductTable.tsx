import { database } from '../../config/FirebaseConfig'
import { ProductInterface, ProductArticleInterface, ProductViewInterface, ProductArticleViewInterface } from '../Definition/Interfaces'
import moment from 'moment'

// テーブル
const productsTable = database.collection('Products')
const productArticlesTable = database.collection('ProductArticles')
// View
const productsViewDoc = database.collection('View').doc('Products')
const adminProductsViewDoc = database.collection('View').doc('AdminProducts')
const productArticlesView = database.collection('ProductArticlesView')

// プロダクト一覧
export const getProducts = async (includePrivate?: boolean) => {
  const productsDoc = includePrivate ? await adminProductsViewDoc.get()
                                     : await productsViewDoc.get()
  const productsData = productsDoc.data()
  let products = [] as ProductInterface[]
  if(productsData){
    productsData.Products.forEach((product: ProductViewInterface) => {
      products.push({
        productId: product.ProductId,
        date: product.Date,
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
  }

  return products
}

// プロダクト記事取得（プロダクト記事詳細）
export const getProduct = async (productId: string, getArticleId: string) => {
  // プロダクト取得
  const productDoc = await productsTable.doc(productId).get()
  const product = productDoc.data()
  // プロダクト記事一覧取得
  const productArticlesDoc = await productArticlesView.doc(productId).get()
  const productArticlesData = productArticlesDoc.data()
  const productArticles = [] as ProductArticleInterface[]
  let viewPageTitle: string = ''
  if(productArticlesData) {
    productArticlesData.Pages.forEach((productArticle: ProductArticleViewInterface) => {
      const productArticleId = productArticle.ArticleId
      if(productArticleId === getArticleId){
        viewPageTitle = productArticle.ArticleTitle 
      }
      productArticles.push({
        productId: productArticle.ProductId,
        articleId: productArticle.ArticleId,
        articleTitle: productArticle.ArticleTitle,
        order: productArticle.Order,
        content: '',
        view: productArticleId === getArticleId,
      })
    }) 
  }
  // ViewPageのプロダクト記事取得
  let viewPageId = getArticleId
  if(viewPageId === "Top" && productArticles.length !== 0){
    viewPageId = productArticles[0].articleId
    viewPageTitle = productArticles[0].articleTitle
    productArticles[0].view = true
  }
  const viewPageproductArticleDoc = await productArticlesTable.doc(productId)
                                    .collection("Pages").doc(viewPageId).get()
  const viewPageProductArticle = viewPageproductArticleDoc.data()

  if (product && viewPageProductArticle){
    return {
      product: {
        productId :productId,
        date: moment(product.Date.toDate()).format("YYYY/MM/DD"),
        name: product.Name,
        tags: product.Tags,
        description: product.Description,
        repository: product.Repository,
        articleId: viewPageId,
        articleTitle: viewPageTitle,
        content: viewPageProductArticle.Content,
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
  // プロダクト記事一覧取得
  const productArticlesDoc = await productArticlesTable.doc(productId).collection("Pages").doc(articleId).get()
  const productArticle = productArticlesDoc.data()

  if (productArticle){
    return {
      productId :productId,
      articleId: articleId,
      articleTitle: productArticle.Title,
      order: productArticle.Order,
      content: productArticle.Content,
    }
  }
  else{
    return null
  }
}

// 記事取得（プロダクト記事一覧ダッシュボード）
export const getProductArticles = async (productId: string) => {
  // プロダクト記事一覧取得
  const productArticlesDoc = await productArticlesView.doc(productId).get()
  const productArticlesData = productArticlesDoc.data()
  const productArticles = [] as ProductArticleInterface[]
  if(productArticlesData){
    productArticlesData.Pages.forEach((productArticle: ProductArticleViewInterface) => {
      productArticles.push({
        productId: productId,
        articleId: productArticle.ArticleId,
        articleTitle: productArticle.ArticleTitle,
        order: productArticle.Order,
        content: '',
      })
    })
  }
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

  await updateProductsView()

  return true
}

// プロダクト編集（ダッシュボード）
export const updateProduct = async (product: ProductInterface) => {
  // Products
  await productsTable.doc(product.productId).set({
    Name: product.name,
    Description: product.description,
    Tags: product.tags,
    Date: moment(product.date).toDate(),
    Repository: product.repository,
    Private: product.private,
  })
  
  await updateProductsView()

  return true
}

// 新規プロダクト記事投稿
export const insertProductArticle = async (productArticle: ProductArticleInterface) => {
  // ProductArticles
  await productArticlesTable.doc(productArticle.productId).collection("Pages")
                            .doc(productArticle.articleId).set({
    Title: productArticle.articleTitle,
    Order: productArticle.order,
    Content: productArticle.content,
  })

  await updateProductArticlesView(productArticle.productId)

  return true
}

// プロダクト記事編集（ダッシュボード）
export const updateProductArticleWithoutContent = async (productArticle: ProductArticleInterface) => {
  // ProductArticles
  await productArticlesTable.doc(productArticle.productId).collection("Pages")
                            .doc(productArticle.articleId).set({
    Title: productArticle.articleTitle,
    Order: productArticle.order,
  }, { merge: true })
  
  await updateProductArticlesView(productArticle.productId)

  return true
}

// プロダクト記事編集（記事編集）
export const updateProductArticle = async (productArticle: ProductArticleInterface) => {
  // ProductArticles
  await productArticlesTable.doc(productArticle.productId).collection("Pages")
                            .doc(productArticle.articleId).set({
    Title: productArticle.articleTitle,
    Order: productArticle.order,
    Content: productArticle.content,
  })
  
  await updateProductArticlesView(productArticle.productId)

  return true
}

// プロダクト削除（ダッシュボードから）
export const deleteProduct = async (productId: string) => {
  await productsTable.doc(productId).delete()
  await productArticlesTable.doc(productId).delete()
  
  await updateProductArticlesView(productId)

  return true
}

// プロダクト記事削除（ダッシュボードから）
export const deleteProductArticle = async (productId: string, productArticleId: string) => {
  await productArticlesTable.doc(productId).collection("Pages").doc(productArticleId).delete()

  await updateProductArticlesView(productId)

  return true
}

// View更新
export const updateProductsView = async () => {
  const productsSnapshot = await productsTable.orderBy("Date", "desc").get()
  let productsView = [] as ProductViewInterface[]
  let adminProductsView = [] as ProductViewInterface[]
  productsSnapshot.forEach((productDoc) => {
    const product = productDoc.data()
    if(!product.Private){
      productsView.push({
        ProductId: productDoc.id,
        Date: moment(product.Date.toDate()).format("YYYY/MM/DD"),
        Name: product.Name,
        Tags: product.Tags,
        Description: product.Description,
        Repository: product.Repository,
        Private: product.Private,
      })
    }
    adminProductsView.push({
      ProductId: productDoc.id,
      Date: moment(product.Date.toDate()).format("YYYY/MM/DD"),
      Name: product.Name,
      Tags: product.Tags,
      Description: product.Description,
      Repository: product.Repository,
      Private: product.Private,
    })
  })

  await productsViewDoc.set({Products: productsView})
  await adminProductsViewDoc.set({Products: adminProductsView})

  return true
}

// プロダクト記事View更新
export const updateProductArticlesView = async (productId: string) => {
  // プロダクト記事一覧取得
  const productArticlesSnapshot = await productArticlesTable.doc(productId).collection("Pages").orderBy("Order").get()
  const productArticlesPage = [] as ProductArticleViewInterface[]
  productArticlesSnapshot.forEach(async (productArticleDoc) => {
    const productArticle = productArticleDoc.data()
    const productArticleId = productArticleDoc.id

    productArticlesPage.push({
      ProductId: productId,
      ArticleId: productArticleId,
      ArticleTitle: productArticle.Title,
      Order: productArticle.Order,
    })
  })

  // View更新
  await productArticlesView.doc(productId).set({Pages: productArticlesPage})
}

export default null