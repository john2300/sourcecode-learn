import * as React from 'react';
// import ReactDOM from 'react-dom';
// class Example extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//   }

//   render() {
//     return (
//       <div>
//         <p>You clicked {this.state.count} times</p>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//           Click me
//         </button>
//       </div>
//     );
//   }
// }
// const { useState } = React;
// function Example() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count+1)}>
//         Click me
//         </button>
//     </div>
//   );
// }



// class Example extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//   }

//   componentDidMount() {
//     document.title = `You clicked ${this.state.count} times`;
//   }

//   componentDidUpdate() {
//     document.title = `You clicked ${this.state.count} times`;
//   }

//   render() {
//     return (
//       <div>
//         <p>You clicked {this.state.count} times</p>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//           Click me
//         </button>
//       </div>
//     );
//   }
// }
const { useState, useEffect } = React;


// function Example(){
//   console.log(useState);
//   const [count,setCount] = useState(0);
//   const [isTrue,setTrue] = useState(true);
//   return (
//     <div>
//       {isTrue?<h1>{count}</h1>:void 0}
//       <button onClick={()=>setCount(count+1)}>+</button>
//       <button onClick={()=>setTrue(!isTrue)}>change</button>
//     </div>
//   );
// }
function Example() {

  // useEffect(()=>{
  //   console.log('useEffect')
  // })
  // return null;

  // const [count, setCount] = useState(0);
  // const [width, setWidth] = useState(window.innerWidth);
  // function reszieHandle() {
  //   setWidth(window.innerWidth);
  //   console.log(window.innerWidth);
  // }
  // useEffect(() => {
  //   window.addEventListener('resize', reszieHandle);
  //   return () =>{

  //   }
  // })
  // return (
  //   <div>
  //     <button onClick={() => setCount(count + 1)}>+</button>
  //   </div>
  // );




  // const [count, setCount] = useState(0);
  // const [num, setNum] = useState(2);
  // useEffect(() => {
  //   console.log('状态更新')
  //   return () => {
  //     console.log('状态卸载')
  //   }
  //   //只监听count的变化
  // },[count]);
  // return (
  //   <div>
  //     <h1>{count}</h1>
  //     <button onClick={() => setCount(count + 1)}>+</button>
  //     <h1>{num}</h1>
  //     <button onClick={() => setNum(num + 2)}>+</button>
  //   </div>
  // )

  



}

export default () => (
  <stateContext.Provider
      value={"Hello React"}
  >
      <ContextComponent/>
  </stateContext.Provider>
)

export default Example;