import { makeStyles } from '@material-ui/core/styles';
const AboutStyle = makeStyles(theme => ({
  iconCard: {
    maxWidth: 150,
    margin: 16,
  },
  icon: {
    width: 150,
    height: 150,
  },
  profileText: {
    whiteSpace: 'pre-wrap',
    paddingLeft: 16,
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
  },
  ul:{
    padding: 16,
    listStyleType: 'none',
    display: 'inline',
  },
  li: {
    display: 'inline',
    marginRight: 5,
  },
  table: {
    width: '100%',
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
  },
  th: {
    textAlign: 'left',
    backgroundColor: '#ccc',
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      padding: 16,
    },
  },
  td: {
    textAlign: 'left',
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      padding: 16,
    },
  }
}));
export default AboutStyle