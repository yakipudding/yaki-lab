import { makeStyles } from '@material-ui/core/styles';
const ProductStyle = makeStyles(theme => ({
  productName: {
    fontSize: '2rem',
    marginBottom: 0,
  },
  productHeader: {
    marginBottom: '1em',
  },
  date: {
    color: '#757575',
    fontSize: 12,
  },
  description: {
    color: "#616161",
    marginRight: 5,
  },
  articleTitle: {
    fontSize: '1.9rem',
    '@media (min-width:768px)': {
      fontSize: '1.8rem',
    },
  },
  pageLinkBottom: {
    display: 'block',
    '@media (min-width:768px)': {
      display: 'none',
    },
  },
  toc: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tocSticky: {
    position: 'sticky',
    top: 40,
  },
  tocCardContent: {
    padding: 0,
  },
  tocCard: {
    backgroundColor: '#eeeeee',
  }
}));
export default ProductStyle