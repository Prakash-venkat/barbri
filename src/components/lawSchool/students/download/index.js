//Authorization:
//Designed : by Usha M
//Purpose: Created for downloading reports
//Description: downloading reports
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/custom/law-school/_law_school_exam_reports.scss";
import TextSizeSelector from '../../TextSizeSelector/TextSizeSelector';
import PageTitle from "../../Layout/AppMain/PageTitle";
const batches = [
  "Febraury 2020",
  "July 2020",
  "Febraury 2021",
  "Febraury 2022"
];
export default class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [false, false, false],
      customFontSize: 0,
    };
  }
  getTextSizeValue = range => {
    this.setState({ customFontSize: Number.parseInt(range) });
  };
  checkHandler = (index, e) => {
    let checked = this.state.checked;
    checked[index] = !checked[index];
    this.setState({
      checked: checked
    });
  };
  clearAll = () => {
    console.log("clear btn");
    this.setState(
      {
        checked: [false, false, false]
      },
      () => console.log(this.state.checked)
    );
  };
  render() {
    return (
      <div className="download-report">
        <div className="container-fluid">
          <PageTitle
            heading="Download Report"
            subheading="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do."
            brdcrumptwo="Students"
            brdcrumpthree="Download Report"
          />
        </div>

        <div class="container-fluid">
          <div className="row  border-bottom">

            {/* <div className="col-md-6 col-xs-12 ">
            <h4 className="head-text text-primary" style={{fontSize:`${24+this.state.customFontSize}px`}}>Download Report</h4>
            <p style={{fontSize:`${16+this.state.customFontSize}px`}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div> */}
            {/*           
          <div className="col-md-6 col-xs-12">
            <div className="float-right text-primary mt-2  d-flex ">
              <FontAwesomeIcon className="mt-1" icon={faHome} style={{fontSize:`${16+this.state.customFontSize}px`}}/>
              <span className="ml-1"style={{fontSize:`${16+this.state.customFontSize}px`}}>/</span>
              <a>
                <p className="ml-1"style={{fontSize:`${16+this.state.customFontSize}px`}}>
                  Students /{" "}
                  <span className="text-secondary"style={{fontSize:`${16+this.state.customFontSize}px`}}>Download report</span>{" "}
                </p>
              </a>
            </div>
          </div> */}
          </div>
        </div>

        <div className="container-fluid">
          <div className="row bg-white">

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">

              {/* <h6 className="text-secondary mt-4"style={{fontSize:`${16+this.state.customFontSize}px`}}>
            <div>
            <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
          </div>
              Choose your batch to download reports
            </h6> */}
              <br />
              <h6>
                <strong className="text-primary" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Batches</strong>
              </h6>
              <div className="py-3" >
                {batches.map((batch, index) => (
                  <label
                    class={
                      this.state.checked[index] === true
                        ? "btn btn-primary active margin-right txt-large "
                        : "txt-large margin-right btn btn-outline-secondary"
                    }
                  >
                    <input
                      type="checkbox"
                      name={batch}
                      value={batch}
                      autocomplete="off"
                      onClick={this.checkHandler.bind(this, index)}
                    />
                    {batch}
                    <span
                      className={
                        this.state.checked[index] === true ? " " : "close"
                      }
                    >
                      <i class="pe-7s-close text-white txt-large"> </i>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="container-fluid border-bottom mt-3 mb-3 text-light"></div>
            <div className="container mt-3  row">
              <div className="col-md-12 d-flex justify-content-end">
                <button style={{ fontSize: `${14 + this.state.customFontSize}px` }}
                  type="button"
                  class=" text-md    py-2 btn btn-outline-secondary"
                  onClick={this.clearAll}
                >
                  Clear all selection
              </button>
                <button style={{ fontSize: `${14 + this.state.customFontSize}px` }}
                  type="button"
                  class=" ml-2 text-md btn-lg text-center  py-2 btn btn-primary"
                >
                  Download Report
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
