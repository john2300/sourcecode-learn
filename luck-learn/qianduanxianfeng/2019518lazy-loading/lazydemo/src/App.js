import React from 'react'
// import logo from './logo.svg'
import './App.css'
import data from './data'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   )
// }

console.log(data)

const Post = (id, title, body) => (
  <div className='post'>
    <div className='post-body'>
      <h4>{title}</h4>
      <p>
        {body}
      </p>
    </div>
  </div>

)
const App = () => (
  <div className='App'>
    <h2>lazy demo</h2>
    <div className='post-container'>
      {data.map(post => (
         <Post key={post.id} title={post.title} body={post.body}></Post>
       ))}
    </div>
  </div>
)
export default App
