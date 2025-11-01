import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from 'axios';

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

//create Context
export const GlobalContext = createContext(initialState);

//create Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
async function getTransactions(){
try {
  const res = await axios.get('/api/transactions');

  dispatch({
    type: 'GET_TRANSACTIONS',
    payload: res.data.data
    //inside the output of get entry point we have data so to fetch that we write as res.data and then .data

  })
} catch (error) {
   dispatch({
    type: 'TRANSACTION_ERROR',
    payload: error.response.data.error
    //inside the output of empty post entry point we have error so to fetch that we write 
    // as error.response.data and then .error
  })
}

}

  async function deleteTransaction(id) {

    try {
      await axios.delete(`/api/transactions/${id}`)
      dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });

    } catch (error) {
       dispatch({
    type: 'TRANSACTION_ERROR',
    payload: error.response.data.error

    });
  }}
  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    try {
       const res = await axios.post('/api/transactions', transaction, config);

    dispatch({
      type: "ADD_TRANSACTION",
      payload: res.data.data,
    });
    } catch (error) {
      dispatch({
    type: 'TRANSACTION_ERROR',
    payload: error.response.data.error

    });
    }

    
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
