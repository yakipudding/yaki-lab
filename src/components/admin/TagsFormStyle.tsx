import { makeStyles } from '@material-ui/core/styles';
const TagsFormStyle = makeStyles(theme => ({
  tagContaier: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  tagContaierDialog: {
    width: '100%',
    display: 'block',
  },
  tagChipGrid: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  tagInputGrid: {
    boxSizing: 'border-box',
    width: '100%',
  },
  tagFieldFocus: {
    outline: 0
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
export default TagsFormStyle