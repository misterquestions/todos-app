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
  | { event: 'addTodo'; todo: Todo }
  | { event: 'toggleCompleted'; todoId: number };

const todoReducer: React.Reducer<TodoState, TodoAction> = (state, action) => {
  switch (action.event) {
    case 'addTodo':
      return {
        createdTodos: [...state.createdTodos, action.todo],
      };

    case 'toggleCompleted': {
      const affectedTodo = state.createdTodos[action.todoId];
      const createdTodos = [...state.createdTodos];
      createdTodos.splice(action.todoId, 1, {
        ...affectedTodo,
        completed: !affectedTodo.completed,
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
