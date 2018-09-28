'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.service:ServerCallService
 * @description
 * # ServerCallService
 * Serivce of the onlinetestApp
 */
angular.module('onlinetestApp')
  .service('ServerCallService', function ($http) {
  		this.globalUrl='http://localhost:2000/';
  		this.fnServerCall=function(url,rm,data,succ,fail){
  			$http({
  				'method':rm,
  				'url':this.globalUrl+url,
  				'data':data
  			})
  			.then(function(res){
  				debugger;
  				succ(res);
  			},function(res){
  				debugger;
  				fail(res);
  			})
  		}

      this.pieOptions={
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

      this.barOptions = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value + (1e-10);},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10
                }
            }
        };
  });
