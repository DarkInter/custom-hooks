import { useEffect, useReducer } from "react";
import { todoReducer } from '../08-useReducer/todoReducer'

const initialState = [];

const init = () => {
   return JSON.parse( localStorage.getItem('todos') ) || [];
}

export const useTodo = () => {

   const [todos, dispatch] = useReducer( todoReducer, initialState, init );

   useEffect( () => {
      localStorage.setItem( 'todos', JSON.stringify( todos ) );
   }, [todos] )

   
   const handleAddTodo = ( todo ) => {
      
      const action = {
         type: '[TODO] Add todo',
         payload: todo,
      }

      dispatch( action );

   }

   const handleRemoveTodo = ( id ) => {
      
      const action = {
         type: '[TODO] Remove todo',
         payload: id,
      }

      dispatch( action );

   }

   const handleToggleTodo = ( id ) => {
      
      dispatch({ 
         type: '[TODO] Toggle todo',
         payload: id,
      });

   }
   

   return {

      todos,
      handleAddTodo,
      handleRemoveTodo,
      handleToggleTodo,
      todosCount: todos.length,
      pendingTodosCount: todos.filter( todo => !todo.done ).length,

   }
}