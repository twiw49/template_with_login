import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HabitEdit from './HabitEdit';
import DialogComponent from './DialogComponent';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    minHeight: 250,
    margin: '1rem'
  },
  title: {
    fontSize: 14,
    color: 'red !important'
  },
  rule: {
    marginBottom: 12
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  }
});

const HabitCard = ({ id, title, rule, dispatch }) => {
  const classes = useStyles();

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
      <CardContent>
        <div className={classes.iconContainer}>
          <IconButton aria-label="delete" onClick={handleDeleteHabit}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <DialogComponent
              Trigger={() => <EditIcon onClick={startEditing} />}
              Content={HabitEdit}
              title="습관수정"
            />
          </IconButton>
        </div>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography className={classes.rule} color="textSecondary">
          {rule}
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
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
