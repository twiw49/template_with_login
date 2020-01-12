import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    width: '100%'
  },
  button: {
    marginTop: '1rem'
  }
}));

const HabitEdit = ({ dispatch, handleClose, id, title, rule }) => {
  const titleInputRef = useRef(null);
  const ruleInputRef = useRef(null);

  const classes = useStyles();
  const [input, setInput] = useState({ id, title, rule });

  const handleChange = (key, value) => setInput({ ...input, [key]: value });
  const handleClick = () => {
    if (!input.title.trim()) titleInputRef.current.focus();
    else if (!input.rule.trim()) ruleInputRef.current.focus();
    else {
      dispatch({
        type: 'EDIT_HABIT',
        payload: input
      });
      handleClose();
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        autoFocus
        label="타이틀"
        value={input.title}
        className={classes.textField}
        helperText="도전할 습관 제목"
        margin="normal"
        onChange={e => handleChange('title', e.target.value)}
        inputRef={titleInputRef}
      />
      <TextField
        label="금액 규칙"
        value={input.rule}
        className={classes.textField}
        helperText="성공시 투자할 금액 규칙"
        margin="normal"
        onChange={e => handleChange('rule', e.target.value)}
        inputRef={ruleInputRef}
      />
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>
        완료
      </Button>
    </div>
  );
};

HabitEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  rule: PropTypes.string
};

export default connect(state => ({
  ...state.isEditing
}))(HabitEdit);
