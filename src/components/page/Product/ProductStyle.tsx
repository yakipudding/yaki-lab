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
    fontSize: '1.5rem',
  },
}));
export default ProductStyle