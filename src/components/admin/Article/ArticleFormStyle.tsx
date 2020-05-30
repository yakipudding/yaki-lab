import { makeStyles } from '@material-ui/core/styles';
const ArticleFormStyle = makeStyles(theme => ({
  form: {
    marginTop: 12,
  },
  formControl: {
    width: '100%',
    marginTop: 8,
  },
  select: {
    paddingTop: 10.5,
    paddingBottom: 10.5,
  },
  imageButtonField: {
    marginTop: 5,
    marginBottom: 5,
  },
  imageButtonHidden: {
    display: 'none',
  },
  contentField: {
    width: '100%',
  },
  previewField: {
    height: '565px',
    overflowY: 'scroll',
  },
  footer: {
    width: '100%',
  },
  submitbutton: {
    width: '100%',
  },
}));
export default ArticleFormStyle