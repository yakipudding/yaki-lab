import React, { useState, useEffect } from 'react';
import { getAbout, updateAbout } from '../../../biz/DBAccessor/AboutTable'
import AboutForm from './AboutForm'
import Loading from '../../common/FeedBack/Loading'
import { PageProps } from '../../../biz/Definition/Types'
import { AboutInterface } from '../../../biz/Definition/Interfaces';

// ABOUT編集
const AdminEditAbout = (props:PageProps) => {
  const [values, setValues] = useState<AboutInterface | null>(null);
  
  // 初期処理：記事取得
  useEffect(() => {
    // firebaseから取得
    getAbout().then((about) => {
      setValues(about)
    })
  }, []);
  
  const submit = (about: AboutInterface) => {
    //firebaseに登録
    updateAbout(about).then(() => {
      props.history.push(('/AdminEditAbout'))
    })
  };

  return (
    values ? <AboutForm init={values} submit={submit} />
           : <Loading />
  );
}

export default AdminEditAbout;