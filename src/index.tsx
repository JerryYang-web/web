import React from 'react'
import ReactDom from 'react-dom'

const App = () =>{
      return( <h1>你好</h1> )
}
// console.log(process.env);

ReactDom.render(
    <App/> ,
document.getElementById("root"))