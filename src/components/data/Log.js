import React from 'react';
import {Scatter} from 'react-chartjs-2';
import {min, max} from 'mathjs'
import * as cloneDeep from "lodash/cloneDeep";
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';


export default class Figure extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let rows = [];
        for (let i=this.props.data.length-1; i>=0; i--) {
            if (this.props.data[i] !== ""){
                rows.push(
                    <Alert key={i} variant="primary">
                        {String(i) + ": " + this.props.data[i]}
                    </Alert>
                );
            }
        }
        return (<Container key="unique">{rows}</Container>);
    }
}