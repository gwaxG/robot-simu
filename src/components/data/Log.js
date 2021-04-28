import React from 'react';
import {Scatter} from 'react-chartjs-2';
import {min, max} from 'mathjs'
import * as cloneDeep from "lodash/cloneDeep";
import Row from 'react-bootstrap/Row';

export default class Figure extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let rows = [];
        console.log(this.props.data.log);
        for (let i=0; i<this.props.data.length; i++) {
            rows.push(
                <Row key={i}>
                    {this.props.data[i]}
                </Row>
            );
        }
        return {rows};
    }
}