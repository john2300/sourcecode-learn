import React,{Component} from 'react';
import actions from '../store/actions';
import {connect} from 'react-redux';
class Counter extends Component{
    render(){
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.increment}>+</button>
            </div>
        )
    }
}

//mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
export default connect(
    state=>({...state}),
    actions
)(Counter);