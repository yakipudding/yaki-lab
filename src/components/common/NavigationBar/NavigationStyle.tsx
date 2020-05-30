import { makeStyles } from '@material-ui/core/styles';
const NavigationStyle = makeStyles(theme => ({
  title: {
    marginTop: 10,
    padding: 0,
    display: 'flex',
    alignItems: 'baseline',
    minHeight: 30,
  },
  section: {
    display: 'flex',
  },
}));

export default NavigationStyle