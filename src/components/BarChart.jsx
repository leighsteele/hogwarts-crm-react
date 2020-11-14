import React from 'react';
import { VictoryChart, VictoryBar, Bar, VictoryAxis, VictoryLabel } from "victory";

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            style: {
                data: { fill: "tomato" }
            }
        };
    }

    render() {
        const handleMouseOver = () => {
            const fillColor = this.state.clicked ? "blue" : "tomato";
            const clicked = !this.state.clicked;
            this.setState({
                clicked,
                style: {
                    data: { fill: fillColor }
                }
            });
        };

        return (
            <div>
                <VictoryChart
                    height={400} width={400}
                    domainPadding={{ x: [50, 50], y: [50, 50] }}
                    scale={{ x: "skill" }}
                    padding={{ left: 120, top: 50, bottom: 50, right: 50 }}
                >
                    <VictoryLabel text="Desired Skills Count" style={{ fontSize: 20 }} x={225} y={30} textAnchor="middle" />
                    <VictoryAxis />
                    <VictoryAxis dependentAxis label={'Number of students'} />
                    <VictoryBar
                        horizontal
                        dataComponent={
                            <Bar events={{ onMouseOver: handleMouseOver }} />
                        }
                        style={this.state.style}
                        data={this.props.dataBarChart}
                    />
                </VictoryChart>
            </div>
        );
    }
}

export default BarChart;