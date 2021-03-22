import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import WaitComponent from './WaitComp';

import Databases from './Databases';
import Figures from './Figures';
import Configurations from './Configurations';


export default class DataVisual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {field: "databases"};
        this.databaseName = "";
    }

    selectDatabase(db_name){
        this.databaseName = db_name;
        this.setState({field: "figures"});
    }

    render (){
        switch (this.state.field) {
            case "databases":
                return <Databases select_database={(e)=>this.selectDatabase(e)} server={this.props.server}/>;
            case "figures":
                return <Figures server={this.props.server} database={this.databaseName}/>;
            default:
                return <WaitComponent/>;
        }
    }
}
