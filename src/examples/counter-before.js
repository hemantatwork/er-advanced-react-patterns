// http://localhost:3000/isolated/examples/counter-before.js

import * as React from 'react'

// src/context/counter.js
const CounterContext = React.createContext()

function CounterProvider({step = 1, initialCount = 0, ...props}) {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      const change = action.step ?? step
      switch (action.type) {
        case 'increment': {
          return {...state, count: state.count + change}
        }
        case 'decrement': {
          return {...state, count: state.count - change}
        }
        default: {
          throw new Error(`Unhandled action type: ${action.type}`)
        }
      }
    },
    {count: initialCount},
  )

  const increment = React.useCallback(
    () => dispatch({type: 'increment', hema: 'YEAHHHHHH'}),
    [dispatch],
  )
  const decrement = React.useCallback(
    () => dispatch({type: 'decrement'}),
    [dispatch],
  )
  const value = {state, increment, decrement}
  return <CounterContext.Provider value={value} {...props} />
}

function useCounter() {
  const context = React.useContext(CounterContext)
  if (context === undefined) {
    throw new Error(`useCounter must be used within a CounterProvider`)
  }
  return context
}

// export {CounterProvider, useCounter}

// src/screens/counter.js
// import {useCounter} from 'context/counter'

function Counter() {
  const {state, increment, decrement} = useCounter()
  // const increment = () => dispatch({type: 'increment'})
  // const decrement = () => dispatch({type: 'decrement'})
  return (
    <div>
      <div>Current Count: {state.count}</div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )
}

// src/index.js
// import {CounterProvider} from 'context/counter'

function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  )
}

export default App
