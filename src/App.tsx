import React from 'react';
import { CssBaseline, ThemeProvider, Toolbar } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import LightTheme from './theme/LightTheme';
import TaskListContainer from './containers/TaskListContainer';
import { TodoProvider } from './context/TodoContext';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <CssBaseline />
        <TodoProvider>
          <TaskListContainer />
        </TodoProvider>
        <Toolbar />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
