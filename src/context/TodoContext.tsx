import React from 'react';

interface Todo {
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
}

interface TodoState {
  createdTodos: Array<Todo>;
}

interface TodoContextProps {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

type TodoAction =
  | { event: 'addTask'; todo: Todo }
  | { event: 'changeTaskStatus'; taskId: number; completed: boolean }
  | { event: 'deleteTask'; taskId: number };

const todoReducer: React.Reducer<TodoState, TodoAction> = (state, action) => {
  switch (action.event) {
    case 'addTask':
      return {
        createdTodos: [...state.createdTodos, action.todo],
      };

    case 'deleteTask': {
      const createdTodos = [...state.createdTodos];
      createdTodos.splice(action.taskId, 1);

      return {
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

      return {
        createdTodos,
      };
    }

    default:
      return state;
  }
};

const initialState: TodoState = {
  createdTodos: [
    {
      completed: false,
      createdAt: new Date(),
      title: 'Buy Milk',
      description: 'Go to the tiendita and buy milk',
    },
    {
      completed: true,
      createdAt: new Date(),
      title: 'Programming Season',
      description: 'Make my daily programming season at 3:30 PM',
    },
  ],
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
