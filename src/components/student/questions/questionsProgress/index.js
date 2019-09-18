import React, { Component } from 'react'
import PageTitle from "../../Layout/AppMain/PageTitle";
import { Collapse, Button } from 'reactstrap';
import { QuestionProgressChart } from './utils/questionProgressChart'
import TextSizeSelector from "../../textsizeselector/Textsizeselector";

export class QuestionsProgress extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleAllSubject = this.toggleAllSubject.bind(this);
        this.state = {
            collapse: [true, false, false, false, false, false, false],
            collapseAllSubject: false,
            data: [
                { topic: 'Contract Content and Meaning', question: 36, answer: 29, score: 29 / 36 * 100 },
                { topic: 'Defenses to Enforceability', question: 6, answer: 5, score: 5 / 6 * 100 },
                { topic: 'Formation of Contracts ', question: 16, answer: 3, score: 3 / 16 * 100 },
                { topic: 'Performance, Breach, and Discharge', question: 28, answer: 14, score: 14 / 28 * 100 },
                { topic: 'Remedies', question: 23, answer: 21, score: 21 / 23 * 100 },
                { topic: 'Third-Party Rights ', question: 23, answer: 21, score: 21 / 23 * 100 },
            ],

            parentData: [
                { subject: 'Contracts', question: 36, answer: 29, score: 29 / 36 * 100 },
                { subject: 'Torts', question: 6, answer: 5, score: 5 / 6 * 100 },
                { subject: 'Constitutional Law', question: 16, answer: 13, score: 13 / 16 * 100 },
                { subject: 'Civil', question: 28, answer: 14, score: 14 / 28 * 100 },
                { subject: 'Criminal Law', question: 23, answer: 7, score: 7 / 23 * 100 },
                { subject: 'Evidence', question: 56, answer: 3, score: 3 / 56 * 100 },
                { subject: 'Real property', question: 33, answer: 31, score: 31 / 33 * 100 },
            ],
            filteredData: []
        };
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch("http://barbri.thinrootsoftware.com/barbriapi/past_performance.php")
            .then(response => response.json())
            .then(data =>
                this.setState({ filteredData: data }));
    };
    toggleAllSubject() {
        this.setState({
            collapseAllSubject: !this.state.collapseAllSubject
        })
    }
    toggle(tab) {
        const prevState = this.state.collapse;
        const state = prevState.map((x, index) => (tab === index ? !x : false));

        this.setState({
            collapse: state
        });
    }

    getTextSizeValue = range => {
        this.setState({ customFontSize: Number.parseInt(range) });
    };

    render() {
        console.log(this.state.filteredData);
        if (this.state.filteredData.length === 0) {
            return null;
        }
        return (
            <div className="question-progress">
                <PageTitle
                    heading="Questions"
                    subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                    brdcrumptwo="Questions"
                    brdcrumpthree="Practice Questions"
                />
                {/* <div>
                    <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
                </div> */}

                <div className="row p-3">
                    <div className="col-md-12 question-heading" style={{ fontSize: `${14 + this.state.customFontSize}px` }} >
                        Questions Progress
                    </div>
                    {/* <QuestionProgressChart /> */}
                    <div className="col-md-12 no-padding toggle-btn dropdown-overall bg-white" onClick={this.toggleAllSubject}>
                        <div className="col-md-4">
                            <Button style={{ marginBottom: '1rem', fontSize: `${14 + this.state.customFontSize}px` }}>OVERALL</Button>
                        </div>
                        <div className="col-md-4 progress-bar-sec">
                            <div className="progress-bar-sm progress"
                                style={{
                                    fontSize: `${14 + this.state.customFontSize}px`,
                                    width: '100%',
                                    marginRight: '30px',
                                    backgroundColor: '#dadada',
                                }}
                            >
                                <div className="progress-bar"
                                    style={{
                                        fontSize: `${14 + this.state.customFontSize}px`,
                                        width: `${this.state.filteredData.stages.stage1}`,
                                        backgroundColor: this.state.filteredData.stages.stage1 > 66 ? '#3ac47d'
                                            : this.state.filteredData.stages.stage1 > 33 ? '#fd7e14'
                                                : '#d92550',
                                        borderRadius: '2px',
                                        transition: 'all .2s ease-out'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 score-perc">
                            <div className="col-md-8" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>({this.state.data[0].answer} answered of {this.state.data[0].question})</div>
                            <div className="col-md-3 no-padding"

                                style={{
                                    color: this.state.filteredData.stages.stage1 > 66 ? '#3ac47d'
                                        : this.state.filteredData.stages.stage1 > 33 ? '#fd7e14'
                                            : '#d92550',
                                    fontSize: 30,
                                    lineHeight: 1
                                }}>

                                {((this.state.data[0].answer) / (this.state.data[0].question) * 100) | 1}%</div>
                            <div className="col-md-1 dropdown-icon"><i class="pe-7s-angle-down"> </i></div>
                        </div>
                    </div>
                    <div className="col-md-12 no-padding">
                        {this.state.filteredData.Subjects.map((entry, index) => (
                            <Collapse isOpen={this.state.collapseAllSubject} className="colapse-sub">
                                <div className="col-md-12 no-padding dropdown-subject-sec " onClick={this.toggle.bind(this, index)}>
                                    <div className="col-md-12 no-padding bg-white">
                                        <div className="col-md-12 no-padding toggle-btn subject">
                                            <div className="col-md-4 faq-heading">
                                                <Button style={{ marginBottom: '1rem', fontSize: `${16 + this.state.customFontSize}px` }}>{entry.subject_name}</Button>
                                                {/* style={{ fontSize: `${16 + this.state.customFontSize}px` }} */}
                                            </div>
                                            <div className="col-md-4 progress-bar-sec">
                                                <div className="progress-bar-sm progress"
                                                    style={{
                                                        width: '100%',
                                                        marginRight: '30px',
                                                        backgroundColor: '#dadada',
                                                    }}
                                                >
                                                    <div className="progress-bar"
                                                        style={{
                                                            width: `${this.state.filteredData.stages.stage1}%`,
                                                            backgroundColor: this.state.filteredData.stages.stage1 > 66 ? '#3ac47d'
                                                                : this.state.filteredData.stages.stage1 > 33 ? '#fd7e14'
                                                                    : '#d92550',
                                                            borderRadius: '2px',
                                                            transition: 'all .2s ease-out'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 score-perc">
                                                <div className="col-md-8" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>({entry.answer} answered of {entry.question})</div>
                                                <div className="col-md-3 no-padding"

                                                    style={{

                                                        color: this.state.filteredData.stages.stage1 > 66 ? '#3ac47d'
                                                            : this.state.filteredData.stages.stage1 > 33 ? '#fd7e14'
                                                                : '#d92550',
                                                        fontSize: 30,
                                                        lineHeight: 1
                                                    }}
                                                >{((entry.answer) / (entry.question) * 100) | 1}%</div>
                                                <div className="col-md-1 dropdown-icon"><i class="pe-7s-angle-down"> </i></div>
                                            </div>
                                        </div>
                                        <Collapse isOpen={this.state.collapse[index]} className="pb-2">
                                            {this.state.filteredData.Topics.map((entry, index) => (
                                                <div className="col-md-12 toggle-btn topic">
                                                    <div className="col-md-4 no-padding">
                                                        <Button style={{ marginBottom: '1rem' }}
                                                            style={{ fontSize: `${16 + this.state.customFontSize}px` }}
                                                            data-parent="#accordion"
                                                            id="collapseOne"
                                                            aria-labelledby="headingOne"
                                                        >{entry.topic_name}
                                                        </Button>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="progress-bar-sm progress"
                                                            style={{
                                                                fontSize: `${16 + this.state.customFontSize}px`,
                                                                width: '100%',
                                                                marginRight: '30px',
                                                                backgroundColor: '#dadada',
                                                            }}
                                                        >
                                                            <div className="progress-bar"
                                                                style={{
                                                                    fontSize: `${16 + this.state.customFontSize}px`,
                                                                    width: `${this.state.filteredData.stages.stage1}%`,
                                                                    backgroundColor: this.state.filteredData.stages.stage1 > 66 ? '#3ac47d'
                                                                        : this.state.filteredData.stages.stage1 > 33 ? '#fd7e14'
                                                                            : '#d92550',
                                                                    borderRadius: '2px',
                                                                    transition: 'all .2s ease-out'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 score-perc">
                                                        <div className="col-md-8" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>({entry.answer} answered of {entry.question})</div>
                                                        <div className="col-md-4"

                                                            style={{
                                                                fontSize: `${16 + this.state.customFontSize}px`,
                                                                color: this.state.filteredData.stages.stage1 > 66 ? '#3ac47d'
                                                                    : this.state.filteredData.stages.stage1 > 33 ? '#fd7e14'
                                                                        : '#d92550'
                                                            }}
                                                        >{((entry.answer) / (entry.question) * 100) | 1}%</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Collapse>
                                    </div>
                                </div>
                            </Collapse>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionsProgress
