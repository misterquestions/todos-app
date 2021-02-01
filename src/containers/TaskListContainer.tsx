import React from 'react';
import {
  Button,
  Checkbox,
  Container,
  createStyles,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  CheckCircle as CheckCircleIcon,
} from '@material-ui/icons';
import dayjs from 'dayjs';
import { TodoContext } from '../context/TodoContext';
import TaskDetailsDrawer from './TaskDetailsDrawer';
import NewTaskContainer from './NewTaskContainer';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginBlock: theme.spacing(4),
    },
    taskOptions: {
      padding: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.background.default}`,
    },
    addTask: {
      borderLeft: `1px solid ${theme.palette.secondary.main}`,
      paddingLeft: theme.spacing(2),
    },
    taskStatus: {
      marginRight: theme.spacing(2),
    },
    emptyTable: {
      marginTop: theme.spacing(2),
    },
  }),
);

const TaskListContainer: React.FC = () => {
  const classes = useStyles();
  const {
    state: { createdTodos },
  } = React.useContext(TodoContext);
  const [editingTask, setEditingTask] = React.useState(-1);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [taskCreationVisible, setTaskCreationVisible] = React.useState(false);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) setSelectedDate(date);
  };

  return (
    <Container>
      <Typography className={classes.title} variant="h4">
        My Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Grid
          className={classes.taskOptions}
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={8}>
            <Typography>
              <b>Tasks</b>
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={4}
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <KeyboardDatePicker
                variant="dialog"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={6}>
              <div className={classes.addTask}>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setTaskCreationVisible(true)}
                >
                  Add Task
                </Button>
              </div>
            </Grid>
          </Grid>
          {taskCreationVisible && (
            <NewTaskContainer onClose={() => setTaskCreationVisible(false)} />
          )}
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Created</TableCell>
              <Hidden mdDown>
                <TableCell>Description</TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {createdTodos.map((todo, taskId) => (
              <TableRow key={todo.title} onClick={() => setEditingTask(taskId)}>
                <TableCell>
                  <Checkbox
                    className={classes.taskStatus}
                    icon={<CheckCircleOutlineIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    checked={todo.completed}
                  />
                  {todo.title}
                </TableCell>
                <TableCell>
                  {dayjs(todo.createdAt).format('D/MMM/YYYY')}
                </TableCell>
                <Hidden mdDown>
                  <TableCell>{todo.description}</TableCell>
                </Hidden>
              </TableRow>
            ))}
          </TableBody>
          {createdTodos.length === 0 && (
            <TableFooter>
              <Typography className={classes.emptyTable}>
                There&apos;s no data yet!
              </Typography>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
      {editingTask !== -1 && (
        <TaskDetailsDrawer
          onClose={() => setEditingTask(-1)}
          taskId={editingTask}
        />
      )}
    </Container>
  );
};

export default TaskListContainer;
