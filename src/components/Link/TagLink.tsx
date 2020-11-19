import React from 'react'
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// タグリンク
const TagLinkStyle = makeStyles(theme => ({
  link: {
    fontSize: 14,
  },
  ul:{
    paddingLeft: 0,
    listStyleType: 'none',
    display: 'inline',
  },
  li: {
    display: 'inline',
    marginRight: 5,
  },
  chips: {
    display: 'inline-block'
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const TagLink = (props: {tags: string[], tagFilter: (tag:string) => void, filter?: string | null }) => {
  const classes = TagLinkStyle();
  return (
    <div>
      <div className={classes.link}>
        <ul className={classes.ul}>
          {props.tags.map((tag, index) => {
            const tagFilter = () => {
              props.tagFilter(tag)
            }
            const color = props.filter === tag ? "primary" : "default"
            return(
              <li className={classes.li} key={index}>
                <Chip
                  key={index}
                  size="small"
                  label={tag}
                  clickable
                  component="a"
                  color={color}
                  onClick={tagFilter}
                  className={classes.chip}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
export default TagLink