import React, { SetStateAction } from 'react'
import { Chip, TextField } from '@material-ui/core/';
import { TagInterface } from '../../biz/Definition/Interfaces'
import TagsFormStyle from './TagsFormStyle'

const TagsField = (props: {tagValues: TagInterface, setTagValues: React.Dispatch<SetStateAction<TagInterface>>}) => {
  const classes = TagsFormStyle();
  const values = props.tagValues

  const addTag = (tag: string) => {
    let tags = values.tags.concat();
    tags.push(tag)

    props.setTagValues({
      ...values,
      input: '',
      newTagKey: values.newTagKey + 1,
      tags: tags,
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value
    //追加
    if(input.slice(-1) === " "){
      addTag(input.slice(0, -1))
    }
    else{
      props.setTagValues({
        ...values,
        input: input,
      });
    }
  };

  const handleFocusOut = () => {
    if(values.input !== ''){
      addTag(values.input)
    }
  };

  const handleDelete = (index: number) => () => {
    let tags = values.tags.concat();
    tags.splice(index, 1)

    props.setTagValues({
      ...values,
      tags: tags,
    });
  };

  return (
    <div className={ classes.tagContaier }>
      <div className={classes.tagChipGrid}>
        {values.tags.map((tagname, index) => {
          return(
            <Chip
              size='small'
              key={index}
              label={tagname}
              onDelete={handleDelete(index)} 
              color="primary" 
              className={classes.chip}
            />)
        })
        }
      </div>
      <div className={classes.tagInputGrid}>
        <TextField
          label="タグ"
          placeholder="タグをスペース区切りで登録できます"
          id="odai-tags"
          margin="dense"
          variant='outlined'
          fullWidth
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.input}
          InputLabelProps={{ shrink: true }}
        />
      </div>
    </div>
  )
}

export default TagsField
