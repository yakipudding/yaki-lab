import { makeStyles } from '@material-ui/core/styles';
const ProfileStyle = makeStyles(theme => ({
  iconCard: {
    maxWidth: 150,
  },
  icon: {
    width: 150,
    height: 150,
  },
  profileText: {
    whiteSpace: 'pre-wrap',
    fontSize: '0.8em',
  },
}));

export default ProfileStyle