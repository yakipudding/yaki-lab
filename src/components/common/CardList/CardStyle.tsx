import { makeStyles } from '@material-ui/core/styles';
const CardStyle = makeStyles(theme => ({
  card: {
    height: 'auto',
    '@media (min-width:768px)': {
      height: 225,
    },
  },
  cardHead: {
    padding: 0
  },
  categoryTech: {
    backgroundColor: "#e8eaf6",
  },
  categoryWork: {
    backgroundColor: "#e0f2f1"
  },
  categoryLife: {
    backgroundColor: "#fff3e0"
  },
  cardContent: {
    paddingTop: 5,
    height:65,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardBottom: {
    paddingTop: 5,
  },
  description: {
    color: "#757575"
  },
}));
export default CardStyle