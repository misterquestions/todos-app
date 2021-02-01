import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import LightTheme from './theme/LightTheme';
import TaskListContainer from './containers/TaskListContainer';
import { TodoProvider } from './context/TodoContext';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <TodoProvider>
        <TaskListContainer />
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
