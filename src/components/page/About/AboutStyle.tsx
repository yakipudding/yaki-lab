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
    fontSize: '1em',
    paddingLeft: 16,
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
  },
  th: {
    textAlign: 'left',
    padding: 16,
    backgroundColor: '#ccc',
  },
  td: {
    textAlign: 'left',
    padding: 16,
  }
}));
export default AboutStyle