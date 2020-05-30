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

export interface ProductArticleInterface {
  productId: string,
  articleId: string,
  articleTitle: string,
  order: number,
  content: string,
  view?: boolean
}

export interface TagInterface {
  input: string,
  newTagKey: number,
  tags: string[]
}