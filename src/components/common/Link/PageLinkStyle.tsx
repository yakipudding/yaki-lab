import { makeStyles } from '@material-ui/core/styles';
const PageLinkStyle = makeStyles(theme => ({
  link: {
    fontSize: 14,
  },
  ul: {
    paddingLeft: 0,
    listStyleType: 'none',
  },
  view: {
    fontSize: 14,
    padding: 3,
    marginLeft: -3, 
    borderLeft: "3px solid #666",
  }
}));

export default PageLinkStyle