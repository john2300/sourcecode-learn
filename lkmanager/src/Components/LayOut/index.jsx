import React, {Component} from 'react';
import Header from "../Header/Header";
import Aside from "../Aside/Aside";

class LayOut extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="main">
                    <Aside/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LayOut;