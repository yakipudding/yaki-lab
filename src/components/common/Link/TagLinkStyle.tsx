import { makeStyles } from '@material-ui/core/styles';
const TagLinkStyle = makeStyles(theme => ({
  link: {
    fontSize: 14,
  },
  ul:{
    paddingLeft: 0,
    listStyleType: 'none',
    display: 'inline',
  },
  li: {
    display: 'inline',
    marginRight: 5,
  },
  chips: {
    display: 'inline-block'
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default TagLinkStyle