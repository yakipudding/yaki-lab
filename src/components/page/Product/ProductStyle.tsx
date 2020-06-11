import { makeStyles } from '@material-ui/core/styles';
const ProductStyle = makeStyles(theme => ({
  header: {
    backgroundColor: '#fff8e1'
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
    fontSize: 16,
    '@media (min-width:768px)': {
      fontSize: 20.8,
    },
  },
  pageLinkBottom: {
    display: 'block',
    '@media (min-width:768px)': {
      display: 'none',
    },
  }
}));
export default ProductStyle