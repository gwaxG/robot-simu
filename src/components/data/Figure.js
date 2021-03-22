import React from 'react';
import {Scatter} from 'react-chartjs-2';
import {min, max} from 'mathjs'
import * as cloneDeep from "lodash/cloneDeep";

export default class Figure extends React.Component {
    constructor(props) {
        super(props);
        this.min = min(this.props.data);
        this.max = max(this.props.data);
        let dat = [];
        let point = {};
        for (let i=0; i<this.props.data.length; i++) {
            point = {
                x: i+1,
                y: this.props.data[i],
            };
            dat.push(cloneDeep(point));
        }
        this.drawable = {
            datasets: [
                {
                    label: this.props.name,
                    fill: false,
                    lineTension: 5.0,
                    backgroundColor: 'rgba(75,0,0,1)',
                    borderColor: 'rgba(255,0,0,1)',
                    borderWidth: 5.0,
                    data: dat
                }
            ],


        };
    }
    render() {
        return (
            <div>
                <Scatter
                    data={this.drawable}
                    options={{
                        title:{
                            display:true,
                            text: this.props.name,
                            fontSize:20
                        },
                        legend:{
                            display:false,
                            position:'bottom'
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Episode",
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: this.props.name,
                                }
                            }]
                        },

                    }}
                />
            </div>
        );
    }
}