import { makeStyles } from '@material-ui/core/styles';
const NavigationStyle = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid #ddd`,
  },
  toolbar: {
    marginTop: 10,
    padding: 0,
    display: 'flex',
    alignItems: 'baseline',
    minHeight: 30,
  },
  title: {
    flex: 1,
    fontSize: '1.5rem',
  },
  section: {
    display: 'flex',
  },
}));

export default NavigationStyle