import { database } from '../../config/FirebaseConfig'

// テーブル
const aboutDoc = database.collection('About').doc('about')

// 記事取得（記事詳細・記事編集）
export const getAbout = async () => {
  const doc = await aboutDoc.get()
  const data = doc.data()
  if (data){
    return data.Content
  }
  else{
    return null
  }
}

// 記事編集（編集画面）
export const updateAbout = async (content: string) => {
  await aboutDoc.set({
    Content: content,
  })
  return true
}
