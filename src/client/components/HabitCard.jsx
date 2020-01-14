import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import HabitEdit from './HabitEdit';
import DialogComponent from './DialogComponent';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    margin: '1rem',
    boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
    borderRadius: '.375rem',
    border: 0,
    flexShrink: 0
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  rule: {
    marginTop: 12,
    marginBottom: 12
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    display: 'flex'
  },
  iconButton: {
    borderRadius: '.375rem'
  },
  currencyField: {
    alignSelf: 'flex-end'
  },
  successButton: {
    alignSelf: 'flex-end',
    marginTop: '24px'
  }
});

const HabitCard = ({ id, title, rule, dispatch }) => {
  const classes = useStyles();
  const [money, setMoney] = useState(0);

  const handleDeleteHabit = () =>
    dispatch({
      type: 'DELETE_HABIT',
      payload: {
        id
      }
    });

  const startEditing = () =>
    dispatch({
      type: 'START_EDITING',
      payload: { id, title, rule }
    });

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <div className={classes.iconContainer}>
          <IconButton
            className={classes.iconButton}
            aria-label="delete"
            onClick={handleDeleteHabit}
          >
            <DeleteIcon />
          </IconButton>
          <DialogComponent
            Trigger={() => (
              <IconButton className={classes.iconButton} aria-label="edit" onClick={startEditing}>
                <EditIcon />
              </IconButton>
            )}
            Content={HabitEdit}
            title="습관수정"
          />
        </div>
        <Typography variant="h2" component="h2">
          {title}
        </Typography>
        <Typography className={classes.rule} color="textSecondary">
          {rule}
        </Typography>
        <CurrencyTextField
          label="투자금액"
          value={money}
          currencySymbol="₩"
          minimumValue={0}
          decimalPlaces={0}
          outputFormat="number"
          digitGroupSeparator=","
          className={classes.currencyField}
          onChange={(event, value) => setMoney(value)}
        />
        <Button className={classes.successButton} variant="contained" size="large" color="primary">
          성공!
        </Button>
      </CardContent>
    </Card>
  );
};

HabitCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  rule: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(HabitCard);
