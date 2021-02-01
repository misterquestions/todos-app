import React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  Drawer,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import {
  Close as CloseIcon,
  Create as CreateIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import dayjs from 'dayjs';
import { TodoContext } from '../context/TodoContext';

interface TaskDetailsDrawerProps {
  onClose: () => void;
  taskId: number;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    taskContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      width: '18rem',
      height: '100%',
    },
    closeIcon: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: theme.spacing(2),
    },
    changeStatus: {
      width: '100%',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    sectionSpacing: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(0.5),
    },
    taskOptions: {
      marginTop: 'auto',
      '& > button': {
        margin: theme.spacing(0.5),
        borderRadius: '2px',
      },
    },
    deleteButton: {
      backgroundColor: theme.palette.error.main,
    },
  }),
);

const TaskDetailsDrawer: React.FC<TaskDetailsDrawerProps> = ({
  onClose,
  taskId,
}) => {
  const classes = useStyles();
  const {
    state: { createdTodos },
    dispatch,
  } = React.useContext(TodoContext);
  const viewingTask = createdTodos[taskId];
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

  const handleKeyboardClose = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClose && event.key === 'Enter') {
      onClose();
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch({
      event: 'changeTaskStatus',
      taskId,
      completed: event.target.value as boolean,
    });
  };

  const handleTaskDelete = () => {
    dispatch({
      event: 'deleteTask',
      taskId,
    });

    if (onClose) {
      onClose();
    }
  };

  return (
    <Drawer open anchor="right" onClose={onClose}>
      <div className={classes.taskContainer}>
        <div
          className={classes.closeIcon}
          onClick={onClose}
          tabIndex={0}
          onKeyDown={handleKeyboardClose}
          role="button"
        >
          <CloseIcon fontSize="large" />
        </div>
        {viewingTask ? (
          <>
            <Typography variant="h5">{viewingTask.title}</Typography>
            <Select
              variant="outlined"
              className={classes.changeStatus}
              value={viewingTask.completed ? 1 : 0}
              onChange={handleStatusChange}
            >
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Completed</MenuItem>
            </Select>
            <Typography className={classes.sectionSpacing}>
              <b>Created</b>
            </Typography>
            <Typography>
              {dayjs(viewingTask.createdAt).format('D/MMM/YYYY')}
            </Typography>
            <Typography className={classes.sectionSpacing}>
              <b>Description</b>
            </Typography>
            <Typography>{viewingTask.description}</Typography>
            <div className={classes.taskOptions}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CreateIcon />}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                className={classes.deleteButton}
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteModalVisible(true)}
              >
                Delete
              </Button>
            </div>
          </>
        ) : (
          <Typography variant="h5">The task doesn&apos;t exists</Typography>
        )}
        {deleteModalVisible && (
          <Dialog open onClose={() => setDeleteModalVisible(false)}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setDeleteModalVisible(false)}
                color="primary"
              >
                Disagree
              </Button>
              <Button onClick={handleTaskDelete} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </Drawer>
  );
};

export default TaskDetailsDrawer;
