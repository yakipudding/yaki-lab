import React, { ElementType } from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Variant } from '@material-ui/core/styles/createTypography';

interface Props {
  children: string,
  href?: string,
}

// List
const useStyles = makeStyles((theme: Theme) =>
  createStyles({    
    listItem: {
      marginTop: theme.spacing(1),
    }
  })
)
const List = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <li className={classes.listItem}>
      <Typography component="span">
        {children}
      </Typography>
    </li>
  )
}

// Head
const Head = (text: string, head: string ) => {
  return (
    <Typography id={text} variant={head as Variant} component={head as ElementType<any>} gutterBottom>
      {text}
    </Typography>
  )
}
const H2 = ({ children } : Props) => Head(children, 'h2')
const H3 = ({ children } : Props) => Head(children, 'h3')
const H4 = ({ children } : Props) => Head(children, 'h4')
const H5 = ({ children } : Props) => Head(children, 'h5')
const H6 = ({ children } : Props) => Head(children, 'h6')

// Link
const A = ({ children, href } : Props) => {
  return (
    <Link href={href} target="_blank">
      {children}<OpenInNewIcon fontSize="inherit" />
    </Link>
  )
}

// Table
const TableComponent = ({ children }: Props) => {
  return (
    <TableContainer  component={Paper}>
      <Table size="small">
        {children}
      </Table>
    </TableContainer>
  )
}

const options = {
  overrides: {
    h1: { component: H2 },
    h2: { component: H2 },
    h3: { component: H3 },
    h4: { component: H4 },
    h5: { component: H5 },
    h6: { component: H6 },
    p:  { component: Typography, props: { paragraph: true } },
    a:  { component: A },
    li: { component: List },
    table: { component: TableComponent },
    tbody: { component: TableBody },
    thead: { component: TableHead },
    th: { component: TableCell },
    tr: { component: TableRow },
    td: { component: TableCell },
  },
};

export default function Markdown(props: { mdText: string }) {
  return <ReactMarkdown options={options}>
           {props.mdText}
         </ReactMarkdown>;
}