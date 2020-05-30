import  { useEffect, useState } from "react";
import SignInDialog from './SignInDialog'
import { auth } from '../../config/FirebaseConfig'
import { PageProps, IdPageProps, ProductPageProps } from '../../biz/Definition/Types'
import Loading from '../common/FeedBack/Loading'

// 認証
const CheckAdmin = (component: (() => JSX.Element) 
                              | ((props: PageProps) => JSX.Element)
                              | ((props: IdPageProps) => JSX.Element)
                              | ((props: ProductPageProps) => JSX.Element)
                              ) => {
  const [login, setLogin] = useState(null as null | boolean);
  
  useEffect(() => {
    //debug
    auth.onAuthStateChanged((user) => {
      if(user){
        setLogin(true)
      }
      else{
        setLogin(false)
      }
    });
  }, []);

  return login === null ? Loading
        : login ? component : SignInDialog
}

export default CheckAdmin