import { makeStyles } from '@material-ui/core/styles';
const ArticleStyle = makeStyles(theme => ({
  categoryTech: {
    backgroundColor: "#e3f2fd"
  },
  categoryWork: {
    backgroundColor: "#fff3e0"
  },
  categoryLife: {
    backgroundColor: "#fffde7"
  },
  date: {
    color: '#aaa',
    fontSize: 14,
  },
  title: {
    margin: 0,
  },
  category: {
    color: '#333',
    fontSize: 14,
  },
}));
export default ArticleStyle