import * as React from "react";
import Routes from "../routes";
import {BrowserRouter} from "react-router-dom";
const App = () => {
    // Routes是函数,得加()执行
    console.log('routes'+Routes);
    return (<BrowserRouter basename="/">{Routes()}</BrowserRouter>)
}

export default App;