import React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { TodoContext } from '../context/TodoContext';

interface NewTaskContainerProps {
  onClose: () => void;
}

interface NewTaskForm {
  title: string;
  description?: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minWidth: '30vw',
    },
    titleSpacing: {
      marginTop: theme.spacing(2),
    },
    input: {
      width: '100%',
    },
    flatButton: {
      borderRadius: 0,
      boxShadow: 'none',
    },
  }),
);

const NewTaskContainer: React.FC<NewTaskContainerProps> = ({ onClose }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<NewTaskForm>();
  const { dispatch } = React.useContext(TodoContext);

  const onSubmit = ({ title, description }: NewTaskForm) => {
    dispatch({
      event: 'addTask',
      todo: {
        completed: false,
        createdAt: new Date(),
        title,
        description: description || '',
      },
    });
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>New Task</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Title (required)</Typography>
          <TextField
            className={classes.input}
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title && 'Required'}
            name="title"
            inputRef={register({ required: true, minLength: 5 })}
          />
          <Typography className={classes.titleSpacing}>Description</Typography>
          <TextField
            className={classes.input}
            variant="outlined"
            multiline
            name="description"
            inputRef={register}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.flatButton}
            variant="contained"
            color="default"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className={classes.flatButton}
            variant="contained"
            color="primary"
            autoFocus
            type="submit"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewTaskContainer;
