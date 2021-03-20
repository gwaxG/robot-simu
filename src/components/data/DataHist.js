import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import WaitComponent from './WaitComp';

import Databases from './Databases';
import Configurations from './Configurations';


export default class DataHist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {field: "databases"};
        this.databaseName = "";
    }

    selectDatabase(db_name){
        this.databaseName = db_name;
        this.setState({field: "configurations"});
    }

    render (){
        switch (this.state.field) {
            case "databases":
               return <Databases select_database={(e)=>this.selectDatabase(e)} server={this.props.server}/>;
            case "configurations":
                return <Configurations server={this.props.server} database={this.databaseName}/>;
            default:
                return <WaitComponent/>;
        }
    }
}
