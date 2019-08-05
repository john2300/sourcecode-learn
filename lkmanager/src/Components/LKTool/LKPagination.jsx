import React,{Component} from 'react';
import RCPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

class LKPagination extends Component{
  // constructor(props){
  //   super(props)
  // }
  constructor(props){
    super(props)
    console.log(props);
  }
  render(){
    return (
      <div className="pagination pull-right">
        <RCPagination 
        {...this.props}
          hideOnSinglePage
          showQuickJumper
        />
      </div>
    );
  }
}

export default LKPagination;