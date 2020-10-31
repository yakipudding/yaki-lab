import React, { useState, useEffect } from 'react';
import { getAbout, updateAbout } from '../../../biz/DBAccessor/AboutTable'
import AboutForm from './AboutForm'
import Loading from '../../common/FeedBack/Loading'
import { PageProps } from '../../../biz/Definition/Types'

// ABOUT編集
const AdminEditAbout = (props:PageProps) => {
  const [values, setValues] = useState<string | null>(null);
  
  // 初期処理：記事取得
  useEffect(() => {
    // firebaseから取得
    getAbout().then((content) => {
      setValues(content)
    })
  }, []);
  
  const submit = (content: string) => {
    //firebaseに登録
    updateAbout(content).then(() => {
      props.history.push(('/AdminEditAbout'))
    })
  };

  return (
    values ? <AboutForm initContent={values} submit={submit} />
           : <Loading />
  );
}

export default AdminEditAbout;