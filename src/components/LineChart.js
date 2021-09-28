import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {
	render() {
		let chart = [];
		let min = 999999999999999999;
		let max = 0; 
		for (let i of this.props.data.chart){
			if (i.price<min)
				min=i.price;
			if (i.price> max)
				max=i.price;
			chart.push({x:i.created_at*1000,y:i.price/100})
		}

		let options = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled:true,
			zoomType: "xy",
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: this.props.data.title_fa,
			},
			axisY: {
				title: "قیمت",
				includeZero: false,
				minimum: min/100,
				maximum: max/100,
				labelFormatter: function ( e ) {
					return e.value*100;  
			  	}
			},
			axisX: {
				title: "ساعات روز",
				interval: 1
			},
			data: [{
				type: "line",
				xValueType: "dateTime",
				toolTipContent: "{x*100} | {y}",
				dataPoints: chart
			}]
		}

		return (
		<div dir="ltr">
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
		</div>
		);
	}
}

export default LineChart;                           