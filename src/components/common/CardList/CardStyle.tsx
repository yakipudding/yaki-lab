import { makeStyles } from '@material-ui/core/styles';
const CardStyle = makeStyles(theme => ({
  card: {
    height: 'auto',
    '@media (min-width:768px)': {
      height: 200,
    },
  },
  cardHead: {
    padding: 0
  },
  categoryTech: {
    backgroundColor: "#e3f2fd"
  },
  categoryWork: {
    backgroundColor: "#fff3e0"
  },
  categoryLife: {
    backgroundColor: "#ffecb3"
  },
  cardContent: {
    paddingTop: 5,
    height:60,
  },
  cardTitle: {
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
  },
  cardBottom: {
    paddingTop: 5,
  },
  description: {
    color: "#757575"
  },
}));
export default CardStyle