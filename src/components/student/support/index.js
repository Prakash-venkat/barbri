
// //Authorization:Prakash
// //Designed : by Das
// //Purpose : created for Support
// //Description: Test Assessment Platform Tour,Guide Slide bar to enable or disable,Help Center 


import React, { Component, Fragment } from 'react'
import PageTitle from '../Layout/AppMain/PageTitle';
import {
    Row, Col, Collapse,
    Button,
} from 'reactstrap';
import { Loader } from '../Loader/loader'
import img from '../../../assets/utils/images/support/hand-mobile-img.png';
import { Link } from 'react-router-dom';
import TextSizeSelector from '../textSizeSelector/textSizeSelector';
const taitle = ['Lorem Ipsum is simply dummy ?', 'Text of the printing ?', 'simply random text ?', 'The point of using Lorem ?']
export class Support extends Component {
    constructor() {
        super();
        modal: false,
            this.state = {
                checked: false,
                collapse: false,
                accordion: [false, false, false, false, false],
                support: true,
                query: "",
                data: taitle,
                filteredData: taitle,
                customFontSize: 0,
                isLoading: true
            };
        this.handleChange = this.handleChange.bind(this);
    }

    getTextSizeValue = range => {
        this.setState({ customFontSize: Number.parseInt(range) });
    };
    handleInputChange = event => {
        const query = event.target.value
        this.setState({ query: event.target.value })
        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredData
            };
        });
    };

    handleChange(checked) {
        this.setState({ checked });
    }
    toggleAccordion(tab) {

        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => tab === index ? !x : false);

        this.setState({
            accordion: state,
        });
    }
    enableSupportNext = () => {
        this.setState({
            support: false,

        });
    }
    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }
    render() {
        return (
            <div className="support-head">
                <div>
                    {this.state.isLoading ? (<Loader />) : null}
                </div>

                <PageTitle
                    heading="Get Help"
                    subheading="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do."
                    brdcrumptwo="Support"
                    brdcrumpthree="Get Help"
                />
                {/* <div><TextSizeSelector getTextSizeValue={this.getTextSizeValue} /></div>  */}
                {this.state.support === true ? <div>

                    <Row className="support-section">
                        <Col md="6">
                            <h1 className="support-head" style={{ fontSize: `${40 + this.state.customFontSize}px` }}>
                                Lorem Ipsum has been the industry.
                                   </h1>
                            <p className="subtext" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do.
                                   </p>
                            <p className="help-arrow" style={{ fontSize: `${15 + this.state.customFontSize}px` }}>
                                <Link onClick={this.enableSupportNext}>  VIEW HELP PAGE &nbsp;&nbsp;&nbsp;&nbsp;<i className="lnr-arrow-right"> </i></Link>
                            </p>
                        </Col>
                        <Col md="6" className="text-center">
                            <img src={img} alt="" style={{ height: `${250 + this.state.customFontSize * 30}px` }} style={{ width: `${250 + this.state.customFontSize * 10}px` }} alt="Get_help" title="Get Help"></img>
                        </Col>
                    </Row>

                </div> : <div>
                        <h1 className="help-section" style={{ fontSize: `${40 + this.state.customFontSize}px` }}>
                            We'er here to help you.
                         </h1>
                        <div>
                            <Row className="search-row">
                                <Col md="10">
                                    <input type="text" value={this.state.query}
                                        onChange={this.handleInputChange} name="search" className="search-btn" placeholder="What are you looking for ?" style={{ fontSize: `${20 + this.state.customFontSize}px` }} />
                                </Col>
                                <Col md="2 "><Link><p className="search-option p-0 m-0" style={{ fontSize: `${15 + this.state.customFontSize}px` }}>SEARCH &nbsp;&nbsp;&nbsp;&nbsp;<i className="lnr-arrow-right"> </i></p></Link></Col>
                            </Row>
                        </div>
                        <Row className="pt-5">
                            <Col md="4">
                                <h2 className="popular-search" style={{ fontSize: `${32 + this.state.customFontSize}px` }}>
                                    Popular Search
                                 </h2>
                            </Col>
                            <Col md="8" className="collaps-section">

                                {
                                    this.state.filteredData.map((heading, index) =>
                                        <div>
                                            <div id="headingOne">
                                                <Button block color="link" className="text-left m-0 p-0 text-dec"
                                                    onClick={() => this.toggleAccordion(index)}
                                                    aria-expanded={this.state.accordion[index]}
                                                    aria-controls="collapseOne">
                                                    <h5 className="collaps pb-3" style={{ fontSize: `${20 + this.state.customFontSize}px` }}>{heading}</h5>
                                                </Button>
                                            </div>
                                            <Collapse isOpen={this.state.accordion[index]} data-parent="#accordion"
                                                id="collapseOne" aria-labelledby="headingOne">
                                                <p className="text-grey" style={{ fontSize: `${13 + this.state.customFontSize}px` }}>Lorem ipsum dolor sit amet,
                                                 consectetur adipiscing elit. Vivamus ipsum arcu, volutpat efficitur odio eget, placerat facilisis
                                                 lacus. Aliquam dolor sem, feugiat sed tortor eu, dictum egestas justo. Vestibulum ante
                                                ipsum primis in faucibus orci luctus et ultrices posuere.</p>

                                            </Collapse>
                                        </div>)
                                }

                            </Col>
                        </Row>
                    </div>}
            </div>
        )
    }
}

export default Support
