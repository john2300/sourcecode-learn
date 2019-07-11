// import * as React from 'react';
// const Banner = () => {
//     return (<span>Banner</span>)
// }

// export default Banner;







import * as React from 'react';
const {useRef,useCallback} = React;
import { observer, useObservable, useObserver } from "mobx-react-lite"
 
const Banner = () => {
    const todos = useObservable(new Map<string, boolean>())
    const todoRef = React.useRef()
    const addTodo = React.useCallback(() => {
        todos.set(todoRef.current.value, false)
        todoRef.current.value = ""
    }, [])
    const toggleTodo = React.useCallback((todo: string) => {
        todos.set(todo, !todos.get(todo))
    }, [])
 
    return useObserver(() => (
        <div>
            {Array.from(todos).map(([todo, done]) => (
                <div onClick={() => toggleTodo(todo)} key={todo}>
                    {todo}
                    {done ? " ✔" : " ⏲"}
                </div>
            ))}
            <input ref={todoRef} />
            <button onClick={addTodo}>Add todo</button>
        </div>
    ))
}

export default Banner;