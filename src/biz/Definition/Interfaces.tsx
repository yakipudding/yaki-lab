export interface ArticleInterface {
  id: string,
  date: string,
  title: string,
  category: number,
  tags: string | null,
  url: string | null,
  content: string,
  private: boolean,
}

export interface ArticleViewInterface {
  Id: string,
  Date: string,
  Title: string,
  Category: number,
  Tags: string | null,
  Url: string | null,
  Private: boolean,
}

export interface ProductInterface {
  productId: string,
  date: string,
  name: string,
  tags: string | null,
  description: string,
  repository: string | null,
  articleId: string,
  articleTitle: string,
  content: string,
  private: boolean,
}

export interface ProductViewInterface {
  ProductId: string,
  Date: string,
  Name: string,
  Tags: string | null,
  Description: string,
  Repository: string | null,
  Private: boolean,
}

export interface ProductArticleInterface {
  productId: string,
  articleId: string,
  articleTitle: string,
  order: number,
  content: string,
  view?: boolean
}

export interface ProductArticleViewInterface {
  ProductId: string,
  ArticleId: string,
  ArticleTitle: string,
  Order: number,
}

export interface TagInterface {
  input: string,
  newTagKey: number,
  tags: string[]
}

export interface AboutInterface {
  icon: string,
  github: string,
  twitter: string,
  qiita: string,
  content: string,
  description: string,
}