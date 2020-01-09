import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { instance } from '../../../../../actions/constants';

class HighChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                chart: {
                    type: 'column',
                    endingShape: 'rounded',
                },
                title: {
                    text: '',
                },

                legend: {
                    align: "center",
                    verticalAlign: "top",

                    labelFormatter: function () {
                        return this.name.name;
                    },
                },
                credits: {
                    enabled: false
                },

                xAxis: {
                    categories: [
                    ],
                    visible: true,
                    labels: {
                        style: {
                            fontSize: "15px"
                        }
                    }
                },

                yAxis: {
                    min: 0,
                    fontSize: "15px",
                    title: {
                        text: 'Total number of questions',
                        style: {
                            fontSize: "15px"
                        }
                    }
                },

                colors: ['#0075cf', '#00e396', '#feb019', '#ff4560', '#775dd0', '#008ffb', '#3dcc4f'],
                plotOptions: {
                    series: {

                        dataLabels: {
                            enabled: true,
                            fontWeight: "normal"
                        },

                    },

                },

                tooltip: {
                    shape: "square",
                    borderColor: '#AAA',
                    useHTML: true,
                    padding: 0,
                    hideDelay: 10,


                    formatter: function () {

                        var index = this.point.x;
                        var topicsValues = '';
                        this.point.series.name.tooltipmsg[index].topic.forEach((element, i) => {

                            topicsValues = topicsValues + '<div class="topicelement">' + element +
                                '<div class="valueelement">:' + this.point.series.name.tooltipmsg[index].values[i] + '</div></div><br />';
                        });
                        return ' <div class="itembank_tooltipmsg p-0"> ' +
                            '<div class="topic-header-section border-bottom text-center">'
                            + this.point.series.name.name + '</div><div class="tooltip-body">' + topicsValues

                            + '</div></div>'

                    },

                },

                series: [{
                    name: {
                        name: 'Published',
                        tooltipmsg: [{
                            topic: [],
                            values: []
                        },

                        {
                            topic: [],
                            values: []
                        },

                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        }]
                    },
                    data: [],

                }, {
                    name: {
                        name: 'Review Inprogress',
                        tooltipmsg: [{
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        }]
                    },
                    data: []

                }, {
                    name: {
                        name: 'Reviewed',
                        tooltipmsg: [{
                            topic: [],
                            values: []
                        },

                        {
                            topic: [],
                            values: []
                        },

                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        }]
                    },
                    data: []

                }, {
                    name: {
                        name: 'Draft',
                        tooltipmsg: [{
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        }]
                    },
                    data: []

                },
                {
                    name: {
                        name: 'Inactive',
                        tooltipmsg: [{
                            topic: [],
                            values: []
                        },

                        {
                            topic: [],
                            values: []
                        },

                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        }]
                    },
                    data: []

                }, {
                    name: {
                        name: 'Delete',
                        tooltipmsg: [{
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        },
                        {
                            topic: [],
                            values: []
                        }]
                    },
                    data: []

                }, {
                    name: {
                        name: 'Total',
                    },
                    enableMouseTracking: false,
                    data: []

                },
                ]
            },


        }

    }

    componentDidMount = () => {
        instance.get("admin/itembanks/statusChart", {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(response => {

                const data = response.data.data == null || response.data.data == undefined ? [] : response.data.data;
                // Civildata
                const CivilTotal = [data[0].statusList[0], data[1].statusList[0],
                data[2].statusList[0], data[3].statusList[0], data[4].statusList[0],
                data[5].statusList[0]];

                const Civil = CivilTotal.filter(el => {  // Checking for null values
                    return el != null;
                });

                const CivilProcedure = Civil.reduce((a, b) => {
                    return a + b;
                });

                //Constitutionl law
                const ConstitutionallawTotal = [data[0].statusList[1], data[1].statusList[1],
                data[2].statusList[1], data[3].statusList[1], data[4].statusList[1],
                data[5].statusList[1]];
                const Constitutionallaw = ConstitutionallawTotal.filter(el => {  // Checking for null values
                    return el != null;
                });
                const Constitutionallawfinal = Constitutionallaw.reduce((a, b) => {
                    return a + b;
                });

                // Contracts
                const ContractsTotal = [data[0].statusList[2], data[1].statusList[2],
                data[2].statusList[2], data[3].statusList[2], data[4].statusList[2],
                data[5].statusList[2]];
                const Contracts = ContractsTotal.filter(el => {  // Checking for null values
                    return el != null;
                });
                const Contractsfinal = Contracts.reduce((a, b) => {
                    return a + b;
                });

                // CRIMINAL LAW
                const CriminallawTotal = [data[0].statusList[3], data[1].statusList[3],
                data[2].statusList[3], data[3].statusList[3], data[4].statusList[3],
                data[5].statusList[3]];
                const Criminallaw = CriminallawTotal.filter(el => {  // Checking for null values
                    return el != null;
                });
                const Criminallawfinal = Criminallaw.reduce((a, b) => {
                    return a + b;
                });
                // EVIDENCE
                const EvidenceTotal = [data[0].statusList[4], data[1].statusList[4],
                data[2].statusList[4], data[3].statusList[4], data[4].statusList[4],
                data[5].statusList[4]];
                const Evidence = EvidenceTotal.filter(el => {  // Checking for null values
                    return el != null;
                });
                const Evidencefinal = Evidence.reduce((a, b) => {
                    return a + b;
                });
                //   RealTotal
                const RealTotal = [data[0].statusList[5], data[1].statusList[5],
                data[2].statusList[5], data[3].statusList[5], data[4].statusList[5],
                data[5].statusList[5]];
                const Real = RealTotal.filter(el => {  // Checking for null values
                    return el != null;
                });
                const Realfinal = Real.reduce((a, b) => {
                    return a + b;
                });
                // TORTS
                const TortsTotal = [data[0].statusList[6], data[1].statusList[6],
                data[2].statusList[6], data[3].statusList[6], data[4].statusList[6],
                data[5].statusList[6]];
                const Torts = TortsTotal.filter(el => {  // Checking for null values
                    return el != null;
                });
                const Tortsfinal = Torts.reduce((a, b) => {
                    return a + b;
                });

                var TotalData = new Array(CivilProcedure, Constitutionallawfinal, Contractsfinal, Criminallawfinal, Evidencefinal, Realfinal, Tortsfinal);

                const xAxisdata = response.data.data[0].topicsList;
                const arr = [];
                for (var a in xAxisdata) { 
                    arr.push(a.trim());
                }
                                
                this.setState({
                    options: {
                        xAxis: {
                            categories: arr
                        },
                        series: [
                            {
                                name: {

                                    tooltipmsg: [
                                        {
                                            topic: data[0].topicsList["Criminal law and procedure	"],
                                            values: data[0].topicsCountList["Criminal law and procedure	"],
                                        },
                                        {
                                            topic: data[0].topicsList["Evidence	"],
                                            values: data[0].topicsCountList["Evidence	"],
                                        },
                                        {
                                            topic: data[0].topicsList["Real property	"],
                                            values: data[0].topicsCountList["Real property	"],
                                        },

                                        {
                                            topic: data[0].topicsList["Civil procedure	"],
                                            values: data[0].topicsCountList["Civil procedure	"],
                                        }, 
                                        {
                                            topic: data[0].topicsList["Constitutional law	"],
                                            values: data[0].topicsCountList["Constitutional law	"],
                                        },
                                        {
                                            topic: data[0].topicsList["Torts	"],
                                            values: data[0].topicsCountList["Torts	"],
                                        },
                                        {
                                            topic: data[0].topicsList["Contracts	"],
                                            values: data[0].topicsCountList["Contracts	"],
                                        },
                                    ]

                                },
                                data: data[0].statusList

                            }, {
                                name: {
                                    tooltipmsg: [
                                        {
                                            topic: data[1].topicsList["Criminal law and procedure	"],
                                            values: data[1].topicsCountList["Criminal law and procedure	"],
                                        },
                                        {
                                            topic: data[1].topicsList["Evidence	"],
                                            values: data[1].topicsCountList["Evidence	"],
                                        },
                                        {
                                            topic: data[1].topicsList["Real property	"],
                                            values: data[1].topicsCountList["Real property	"],
                                        },

                                        {
                                            topic: data[1].topicsList["Civil procedure	"],
                                            values: data[1].topicsCountList["Civil procedure	"],
                                        }, 
                                        {
                                            topic: data[1].topicsList["Constitutional law	"],
                                            values: data[1].topicsCountList["Constitutional law	"],
                                        },
                                        {
                                            topic: data[1].topicsList["Torts	"],
                                            values: data[1].topicsCountList["Torts	"],
                                        },
                                        {
                                            topic: data[1].topicsList["Contracts	"],
                                            values: data[1].topicsCountList["Contracts	"],
                                        },
                                    ]

                                },
                                data: data[1].statusList
                            }, {
                                name: {

                                    tooltipmsg: [
                                        {
                                            topic: data[2].topicsList["Criminal law and procedure	"],
                                            values: data[2].topicsCountList["Criminal law and procedure	"],
                                        },
                                        {
                                            topic: data[2].topicsList["Evidence	"],
                                            values: data[2].topicsCountList["Evidence	"],
                                        },
                                        {
                                            topic: data[2].topicsList["Real property	"],
                                            values: data[2].topicsCountList["Real property	"],
                                        },

                                        {
                                            topic: data[2].topicsList["Civil procedure	"],
                                            values: data[2].topicsCountList["Civil procedure	"],
                                        }, 
                                        {
                                            topic: data[2].topicsList["Constitutional law	"],
                                            values: data[2].topicsCountList["Constitutional law	"],
                                        },
                                        {
                                            topic: data[2].topicsList["Torts	"],
                                            values: data[2].topicsCountList["Torts	"],
                                        },
                                        {
                                            topic: data[2].topicsList["Contracts	"],
                                            values: data[2].topicsCountList["Contracts	"],
                                        }, 
                                    ]

                                },
                                data: data[2].statusList
                            }, {
                                name: {

                                    tooltipmsg: [
                                        {
                                            topic: data[3].topicsList["Criminal law and procedure	"],
                                            values: data[3].topicsCountList["Criminal law and procedure	"],
                                        },
                                        {
                                            topic: data[3].topicsList["Evidence	"],
                                            values: data[3].topicsCountList["Evidence	"],
                                        },
                                        {
                                            topic: data[3].topicsList["Real property	"],
                                            values: data[3].topicsCountList["Real property	"],
                                        },

                                        {
                                            topic: data[3].topicsList["Civil procedure	"],
                                            values: data[3].topicsCountList["Civil procedure	"],
                                        }, 
                                        {
                                            topic: data[3].topicsList["Constitutional law	"],
                                            values: data[3].topicsCountList["Constitutional law	"],
                                        },
                                        {
                                            topic: data[3].topicsList["Torts	"],
                                            values: data[3].topicsCountList["Torts	"],
                                        },
                                        {
                                            topic: data[3].topicsList["Contracts	"],
                                            values: data[3].topicsCountList["Contracts	"],
                                        }, 
                                    ]

                                },
                                data: data[3].statusList
                            },
                            {
                                name: {

                                    tooltipmsg: [
                                        {
                                            topic: data[4].topicsList["Criminal law and procedure	"],
                                            values: data[4].topicsCountList["Criminal law and procedure	"],
                                        },
                                        {
                                            topic: data[4].topicsList["Evidence	"],
                                            values: data[4].topicsCountList["Evidence	"],
                                        },
                                        {
                                            topic: data[4].topicsList["Real property	"],
                                            values: data[4].topicsCountList["Real property	"],
                                        },
                                        {
                                            topic: data[4].topicsList["Civil procedure	"],
                                            values: data[4].topicsCountList["Civil procedure	"],
                                        }, 
                                        {
                                            topic: data[4].topicsList["Constitutional law	"],
                                            values: data[4].topicsCountList["Constitutional law	"],
                                        },
                                        {
                                            topic: data[4].topicsList["Torts	"],
                                            values: data[4].topicsCountList["Torts	"],
                                        },
                                        {
                                            topic: data[4].topicsList["Contracts	"],
                                            values: data[4].topicsCountList["Contracts	"],
                                        },
                                    ]

                                },
                                data: data[4].statusList
                            }, {
                                name: {

                                    tooltipmsg: [
                                        {
                                            topic: data[5].topicsList["Criminal law and procedure	"],
                                            values: data[5].topicsCountList["Criminal law and procedure	"],
                                        },
                                        {
                                            topic: data[5].topicsList["Evidence	"],
                                            values: data[5].topicsCountList["Evidence	"],
                                        },
                                        {
                                            topic: data[5].topicsList["Real property	"],
                                            values: data[5].topicsCountList["Real property	"],
                                        },

                                        {
                                            topic: data[5].topicsList["Civil procedure	"],
                                            values: data[5].topicsCountList["Civil procedure	"],
                                        }, 
                                        {
                                            topic: data[5].topicsList["Constitutional law	"],
                                            values: data[5].topicsCountList["Constitutional law	"],
                                        },
                                        {
                                            topic: data[5].topicsList["Torts	"],
                                            values: data[5].topicsCountList["Torts	"],
                                        },
                                        {
                                            topic: data[5].topicsList["Contracts	"],
                                            values: data[5].topicsCountList["Contracts	"],
                                        },
                                    ]

                                },
                                data: data[5].statusList
                            },
                            {
                                data: TotalData,
                            },

                        ]
                    }
                })

            })
    }

    render() {
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                />
            </div>
        )
    }
}

export default HighChart