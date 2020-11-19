import React from 'react'
import { Card, CardHeader, CardContent, List } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'markdown-to-jsx';

// TOC(目次)

// Card
const useCardStyles  = makeStyles(theme => ({
  tocCardContent: {
    padding: 0,
  },
  tocCard: {
    backgroundColor: '#eeeeee',
    position: 'sticky',
    top: 40,
    paddingRight: 16,
  }
}));

// Link
interface Props {
  children:string,
}
const TocLink = ({ children }: Props) => {
  return (
    <a href={`#${children}`} className="toc-link">
      {children}
    </a>
  )
}

const options = {
  overrides: {
    ul: { component: List, props: { className: 'toc-ul'} },
    a: { component: TocLink, props: { color:'inherit', className: 'toc-link'} },
  },
};

const Toc = (props: { mdText: string }) => {
  const cardClasses = useCardStyles()
  const MarkdownToc = require('markdown-toc-unlazy');
  const tocContent = MarkdownToc(props.mdText).content

  return (
    <Card className={cardClasses.tocCard}>  
      <CardHeader title="目次" />
      <CardContent className={cardClasses.tocCardContent}>
        <ReactMarkdown options={options}>
          {tocContent}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
}
export default Toc