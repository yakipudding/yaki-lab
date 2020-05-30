import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import AppStyle from './AppStyle'
import Theme from './style/Theme'
import NavigationBar from './components/common/NavigationBar/NavigationBar'
import NotFound from './components/common/FeedBack/NotFound'
import Articles from './components/page/Articles/Articles'
import Products from './components/page/Products/Products'
import Product from './components/page/Product/Product'
import Article from './components/page/Article/Article'
import About from './components/page/About/About'
import CheckAdmin from './components/admin/CheckAdmin'
import AdminDashboard from './components/admin/Article/AdminDashboard'
import AdminNewArticle from './components/admin/Article/AdminNewArticle'
import AdminEditArticle from './components/admin/Article/AdminEditArticle'
import AdminProductDashboard from './components/admin/Product/AdminProductDashboard'
import AdminProductArticles from './components/admin/Product/AdminProductArticles'
import AdminNewProduct from './components/admin/Product/AdminNewProduct'
import AdminNewProductArticle from './components/admin/Product/AdminNewProductArticle'
import AdminEditProductArticle from './components/admin/Product/AdminEditProductArticle'

const App = () => {
  const classes = AppStyle();
  const theme = Theme;
  return (
    <BrowserRouter>
      <div className={classes.app}>
        <ThemeProvider theme={theme}>
          <Route component={NavigationBar} />
          <Container className={classes.container}>
            <Switch>
              <Route exact path='/' component={Articles} />
              <Route exact path='/Articles' component={Articles} />
              <Route exact path='/Articles/:tag' component={Articles} />
              <Route exact path='/Article/:id' component={Article} />
              <Route exact path='/Products' component={Products} />
              <Route exact path='/Products/:tag' component={Products} />
              <Route exact path='/Product/:productId/:articleId' component={Product} />
              <Route exact path='/About' component={About} />
              {/* admin */}
              <Route exact path='/AdminDashboard' component={CheckAdmin(AdminDashboard)} />
              <Route exact path='/AdminNewArticle' component={CheckAdmin(AdminNewArticle)} />
              <Route exact path='/AdminEditArticle/:id' component={CheckAdmin(AdminEditArticle)} />
              <Route exact path='/AdminProductDashboard' component={CheckAdmin(AdminProductDashboard)} />
              <Route exact path='/AdminProductArticles/:id' component={CheckAdmin(AdminProductArticles)} />
              <Route exact path='/AdminNewProduct' component={CheckAdmin(AdminNewProduct)} />
              <Route exact path='/AdminNewProductArticle/:id' component={CheckAdmin(AdminNewProductArticle)} />
              <Route exact path='/AdminEditProductArticle/:productId/:articleId' component={CheckAdmin(AdminEditProductArticle)} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
