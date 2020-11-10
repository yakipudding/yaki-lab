import { database } from '../../config/FirebaseConfig'
import { AboutInterface } from '../Definition/Interfaces'

// テーブル
const aboutDoc = database.collection('About').doc('about')

// 記事取得（記事詳細・記事編集）
export const getAbout = async () => {
  const doc = await aboutDoc.get()
  const data = doc.data()
  if (data){
    return {
      icon: data.Icon,
      github: data.GitHub,
      twitter: data.Twitter,
      qiita: data.Qiita,
      content: data.Content,
      description: data.Description,
    }
  }
  else{
    return null
  }
}

// 記事編集（編集画面）
export const updateAbout = async (about: AboutInterface) => {
  await aboutDoc.set({
    Icon: about.icon,
    GitHub: about.github,
    Twitter: about.twitter,
    Qiita: about.qiita,
    Content: about.content,
    Description: about.description,
  })
  return true
}
