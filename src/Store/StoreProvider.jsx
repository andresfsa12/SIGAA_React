import { Children, createContext, useReducer } from "react";

const StoreContext = createContext();
const StoreProvider=(children)=>{
    const [store, dispatch] = useReducer(reducer, initialState)
    return(
        <StoreProvider value={[store, dispatch]}>
            {children}
        </StoreProvider>
    )
}

export {StoreContext}
export default StoreProvider;