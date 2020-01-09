import React, { Component } from 'react'
import { Row, Col } from "reactstrap";
import ReactApexChart from 'react-apexcharts'

class SubjectChart extends Component {
    constructor() {
        super();
        this.state = {
            itembanklist: [],
            pageOfItems: [],
            query: "",
            data: [],
            filteredData: [],
            sample: [],
            readMore: "Read more",
            checked: [],
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '65%',
                        endingShape: 'rounded',
                        dataLabels: {
                            position: 'top',

                        },
                    },
                },
                colors: ['#0075cf', '#00e396', '#feb019', '#ff4560', '#775dd0', '#008ffb', '#3dcc4f'],
                chart: {
                    id: 'item-charts',
                    toolbar: {
                        show: false
                    },
                },

                dataLabels: {
                    enabled: true,
                    rotate: -45,
                    formatter: function (val) {
                        return val;
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '11px',
                        colors: ["#304758"],
                    }

                },

                stroke: {
                    show: true,
                    width: 4,
                    colors: ['transparent'],

                },
                xaxis: {
                    categories: ['Civil Procedure',
                        'Constitutional Law', 'Contracts', 'Criminal Law', 'Evidence', 'Real Property', 'Torts'],
                },
                legend: {
                    position: 'top',
                    offsetY: 10,
                    labels: {

                        useSeriesColors: true
                    }
                },

                yaxis: {
                    title: {
                        text: 'Total number of questions'
                    }
                },
                fill: {
                    opacity: 1,

                },
                tooltip: {

                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {

                        const dataset = w.config.series[seriesIndex].tooltipmsg[dataPointIndex].topic.map((data, index) => {
                            return (
                                '<div class="tooltip_span px-2 py-1">' +
                                '<div class="row">' + '<div class="col-9">' + data + '</div>' +
                                '<div class="col-3 text-center">' + w.config.series[seriesIndex].tooltipmsg[dataPointIndex].values[index] + '</div>'
                                + '</div>' + '</div>'
                            )
                        })
                        var newArr = dataset.join(',').replace(/,/g, '').split();

                        return ' <div class="itembank_tooltipmsg p-0"> ' +
                            '<div class="topic-header-section border-bottom text-center">' + w.config.series[seriesIndex].name + '</div>' +
                            newArr
                            + '</div>'
                    }
                },
            },

            series: [{
                name: 'Published',
                data: [40, 15, 10, 20, 5, 15, 30], // published counts for all subjects
                tooltipmsg: [{
                    topic: ["Jury trials", "Verdicts and judgments", "Appealability and Review", "Pretrial Procedures", "Motions"], // civil procedure topics
                    values: [10, 5, 5, 15, 5] //civil procedure published counts
                },
                {
                    topic: ["Individual Rights", "The Nature of Judicial Review", "The Separation of Powers"],
                    values: [5, 5, 5]
                },
                {
                    topic: ["Remedies", "Third-Party Rights", "Formation of Contracts"],
                    values: [2, 6, 2]
                },
                {
                    topic: ["General Principles", "Homicide", "Other Crimes"],
                    values: [10, 5, 5]
                },
                {
                    topic: ["Presentation of Evidence", "Writings, Recordings, and Photographs", "Reasons for Excluding Relevant Evidence"],
                    values: [1, 1, 3]
                },
                {
                    topic: ["Rights in Real Property", "Real Estate Contracts", "Ownership of Real Property"],
                    values: [5, 6, 4]
                },
                {
                    topic: ["Intentional Torts", "Negligence", "Other Torts", "Strict Liability and Products Liability"],
                    values: [10, 10, 5, 5]
                }]

            },
            {
                name: 'Draft',
                data: [25, 20, 10, 10, 20, 40, 5], //draft counts for all subjects
                tooltipmsg: [{
                    topic: ["Jury trials", "Verdicts and judgments", "Appealability and Review", "Pretrial Procedures", "Motions"],
                    values: [5, 5, 5, 5, 5]
                },
                {
                    topic: ["Individual Rights", "The Nature of Judicial Review", "The Separation of Powers"],
                    values: [8, 4, 8]
                },
                {
                    topic: ["Remedies", "Third-Party Rights", "Formation of Contracts"],
                    values: [3, 4, 3]
                },
                {
                    topic: ["General Principles", "Homicide", "Other Crimes"],
                    values: [2, 6, 2]
                },
                {
                    topic: ["Presentation of Evidence", "Writings, Recordings, and Photographs", "Reasons for Excluding Relevant Evidence"],
                    values: [5, 5, 10]
                },
                {
                    topic: ["Rights in Real Property", "Real Estate Contracts", "Ownership of Real Property"],
                    values: [20, 10, 10]
                },
                {
                    topic: ["Intentional Torts", "Negligence", "Other Torts", "Strict Liability and Products Liability"],
                    values: [2, 1, 1, 1]
                }]

            },
            {
                name: 'Review Inprogress',
                data: [19, 15, 20, 5, 50, 20, 60],
                tooltipmsg: [{
                    topic: ["Jury trials", "Verdicts and judgments", "Appealability and Review", "Pretrial Procedures", "Motions"],
                    values: [4, 4, 4, 4, 3]
                },
                {
                    topic: ["Individual Rights", "The Nature of Judicial Review", "The Separation of Powers"],
                    values: [5, 5, 5]
                },
                {
                    topic: ["Remedies", "Third-Party Rights", "Formation of Contracts"],
                    values: [5, 10, 5]
                },
                {
                    topic: ["General Principles", "Homicide", "Other Crimes"],
                    values: [2, 2, 1]
                },
                {
                    topic: ["Presentation of Evidence", "Writings, Recordings, and Photographs", "Reasons for Excluding Relevant Evidence"],
                    values: [20, 10, 20]
                },
                {
                    topic: ["Rights in Real Property", "Real Estate Contracts", "Ownership of Real Property"],
                    values: [5, 5, 10]
                },
                {
                    topic: ["Intentional Torts", "Negligence", "Other Torts", "Strict Liability and Products Liability"],
                    values: [20, 10, 10, 20]
                }]


            }, {
                name: 'Reviewed',
                data: [21, 35, 40, 5, 15, 25, 5],
                tooltipmsg: [{
                    topic: ["Jury trials", "Verdicts and judgments", "Appealability and Review", "Pretrial Procedures", "Motions"],
                    values: [4, 4, 5, 4, 4]
                },
                {
                    topic: ["Individual Rights", "The Nature of Judicial Review", "The Separation of Powers"],
                    values: [10, 15, 10]
                },
                {
                    topic: ["Remedies", "Third-Party Rights", "Formation of Contracts"],
                    values: [20, 10, 10]
                },
                {
                    topic: ["General Principles", "Homicide", "Other Crimes"],
                    values: [1, 1, 3]
                },
                {
                    topic: ["Presentation of Evidence", "Writings, Recordings, and Photographs", "Reasons for Excluding Relevant Evidence"],
                    values: [5, 5, 5]
                },
                {
                    topic: ["Rights in Real Property", "Real Estate Contracts", "Ownership of Real Property"],
                    values: [5, 10, 10]
                },
                {
                    topic: ["Intentional Torts", "Negligence", "Other Torts", "Strict Liability and Products Liability"],
                    values: [1, 2, 1, 1]
                }]


            },
            {
                name: 'Inactive',
                data: [10, 10, 15, 70, 10, 10, 5],
                tooltipmsg: [{
                    topic: ["Jury trials", "Verdicts and judgments", "Appealability and Review", "Pretrial Procedures", "Motions"],
                    values: [2, 2, 2, 2, 2]
                },
                {
                    topic: ["Individual Rights", "The Nature of Judicial Review", "The Separation of Powers"],
                    values: [2, 6, 2]
                },
                {
                    topic: ["Remedies", "Third-Party Rights", "Formation of Contracts"],
                    values: [2, 3, 10]
                },
                {
                    topic: ["General Principles", "Homicide", "Other Crimes"],
                    values: [20, 30, 20]
                },
                {
                    topic: ["Presentation of Evidence", "Writings, Recordings, and Photographs", "Reasons for Excluding Relevant Evidence"],
                    values: [2, 6, 2]
                },
                {
                    topic: ["Rights in Real Property", "Real Estate Contracts", "Ownership of Real Property"],
                    values: [2, 6, 2]
                },
                {
                    topic: ["Intentional Torts", "Negligence", "Other Torts", "Strict Liability and Products Liability"],
                    values: [1, 1, 1, 2]
                }]


            },
            {
                name: 'Deleted',
                data: [5, 10, 10, 10, 15, 15, 15],

                tooltipmsg: [{
                    topic: ["Jury trials", "Verdicts and judgments", "Appealability and Review", "Pretrial Procedures", "Motions"],
                    values: [2, 0, 0, 1, 2]
                },
                {
                    topic: ["Individual Rights", "The Nature of Judicial Review", "The Separation of Powers"],
                    values: [4, 3, 3]
                },
                {
                    topic: ["Remedies", "Third-Party Rights", "Formation of Contracts"],
                    values: [2, 6, 2]
                },
                {
                    topic: ["General Principles", "Homicide", "Other Crimes"],
                    values: [3, 4, 3]
                },
                {
                    topic: ["Presentation of Evidence", "Writings, Recordings, and Photographs", "Reasons for Excluding Relevant Evidence"],
                    values: [3, 10, 2]
                },
                {
                    topic: ["Rights in Real Property", "Real Estate Contracts", "Ownership of Real Property"],
                    values: [5, 6, 4]
                },
                {
                    topic: ["Intentional Torts", "Negligence", "Other Torts", "Strict Liability and Products Liability"],
                    values: [5, 3, 3, 4]
                }]
            },
            {
                name: 'Total',
                data: [120, 105, 105, 120, 115, 125, 120],
            },
            ]
        };
        this.state.filterText = "";
    }
    render() {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <div className="card">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350"
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default SubjectChart