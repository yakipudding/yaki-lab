import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from '../../common/Markdown/Markdown';

// Markdownプレビュー

const useStyles = makeStyles(theme => ({
  previewField: {
    height: 496,
    overflowY: 'scroll',
  },
}));

const MarkdownPreviewField = (props: { content: string } ) => {
  const classes = useStyles()
  return (
    <div className={classes.previewField}>            
      <Markdown mdText={props.content} />
    </div>
  )
}
export default MarkdownPreviewField