import { makeStyles } from '@material-ui/core/styles';
const ArticleStyle = makeStyles(theme => ({
  categoryTech: {
    backgroundColor: "#e3f2fd"
  },
  categoryWork: {
    backgroundColor: "#dcedc8"
  },
  categoryLife: {
    backgroundColor: "#fffde7"
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: '1em',
  },
  title: {
    margin: 0,
  },
  category: {
    color: '#333',
    fontSize: 14,
  },
  toc: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tocCardContent: {
    padding: 0,
  },
  tocCard: {
    backgroundColor: '#eeeeee',
    position: 'sticky',
    top: 40,
  }
}));
export default ArticleStyle