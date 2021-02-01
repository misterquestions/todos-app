import React from 'react';
import dayjs from 'dayjs';

interface Todo {
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
}

interface TodoState {
  createdTodos: Array<Todo>;
  filterDate: dayjs.Dayjs;
  filteredTasks: Array<Todo>;
}

interface TodoContextProps {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

type TodoAction =
  | { event: 'addTask'; todo: Todo }
  | { event: 'changeTaskStatus'; taskId: number; completed: boolean }
  | { event: 'deleteTask'; taskId: number }
  | { event: 'setFilterDate'; date: dayjs.Dayjs }
  | { event: 'filterTasks' };

const todoReducer: React.Reducer<TodoState, TodoAction> = (state, action) => {
  switch (action.event) {
    case 'addTask':
      return {
        ...state,
        createdTodos: [...state.createdTodos, action.todo],
      };

    case 'deleteTask': {
      const createdTodos = [...state.createdTodos];
      createdTodos.splice(action.taskId, 1);

      return {
        ...state,
        createdTodos,
      };
    }

    case 'changeTaskStatus': {
      const affectedTodo = state.createdTodos[action.taskId];
      const createdTodos = [...state.createdTodos];
      createdTodos.splice(action.taskId, 1, {
        ...affectedTodo,
        completed: action.completed,
      });
      const 

      return {
        ...state,
        createdTodos,
        filteredTasks: createdTodos.filter((x) =>
          dayjs(x.createdAt).isSame(state.filterDate, 'day'),
        ),
      };
    }

    case 'setFilterDate':
      return {
        ...state,
        filterDate: action.date,
        filteredTasks: state.createdTodos.filter((x) =>
          dayjs(x.createdAt).isSame(action.date, 'day'),
        ),
      };

    case 'filterTasks':
      return {
        ...state,
        filteredTasks: state.createdTodos.filter((x) =>
          dayjs(x.createdAt).isSame(state.filterDate, 'day'),
        ),
      };

    default:
      return state;
  }
};

const initialState: TodoState = {
  createdTodos: [],
  filterDate: dayjs(),
  filteredTasks: [],
};

export const TodoContext = React.createContext<TodoContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
