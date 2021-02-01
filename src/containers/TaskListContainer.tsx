import React from 'react';
import {
  Checkbox,
  Container,
  createStyles,
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
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  CheckCircle as CheckCircleIcon,
} from '@material-ui/icons';
import dayjs from 'dayjs';
import { TodoContext } from '../context/TodoContext';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginBlock: theme.spacing(4),
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

  return (
    <Container>
      <Typography className={classes.title} variant="h4">
        My Tasks
      </Typography>
      <TableContainer component={Paper}>
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
            {createdTodos.map((todo) => (
              <TableRow key={todo.title}>
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
    </Container>
  );
};

export default TaskListContainer;
