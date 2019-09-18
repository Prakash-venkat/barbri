//Authorization:
//Designed : by Usha M
//Purpose: Created for downloading reports
//Description: downloading reports

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TabContent, TabPane, Tab, NavItem, NavLink, Nav, Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import Loader from 'react-loaders'
import classnames from "classnames";
import BasicInfo from "./basicInfo";
import Settings from "./settings";
import RevisionHistory from "./revisionHistory";
import Perferences from "./preferences";

const initialRow = {
  question: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  option5: '',
  fontSetting: { value: "normal", label: "Normal" },
  labelType: { value: "alphabets-upper", label: "Alphabets-UpperCase" },
  style: { value: "block", label: "Block" },
  answerAttempts: { value: "0", label: "0" },
  minScore: { value: "0", label: "0" },
  scoreType: { value: "exact-match", label: "Exact Match" },
  score: { value: "0", label: "0" },
  practiceUsageSwitchValue: 'yes',
  autoScore: 'yes',
  distractorRationale: '',
  rubicReference: '',
  acknowledgement: '',
  sampleAnswer: '',
  addReference: '',
  addDescription: '',
  addSource: '',
  addNote: '',
  addAcknowledgement: '',
  preferenceStatus: { value: "published", label: "Published" },
  questionScoreType: { value: "per-question", label: "Per Question" },
  questionScoreFeatures: { value: "published", label: "Published" },
  contentTypeTag: [{ value: "qlts", label: "QLTS" }, { value: "option2", label: "Option2" }],
  questionTypeTag: [{ value: "qlts-exam", label: "QLTS Exam" }, { value: "option2", label: "Option2" }],
  subjectTag: [{ value: "exam-legal", label: "Exam legal system and EU law" }, { value: "option2", label: "Option2" }]
};


export default class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      loading: true,
      isChecked: false,
      rowData: initialRow,
      addORedit: "add",
      editId: "",
      errorMsg: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      showMsg: false,
      validateAll: [],
      fontSetting: '',
      practiceUsageSwitch: true,
      autoScore: true
    };
  }

  fieldHandler = (field, event) => {
    let row = this.state.rowData;
    let errorMsg = this.state.errorMsg;

    switch (field) {
      case "question":
        event.target.value.trim() == ""
          ? (errorMsg[0] = "Question is required!")
          : (errorMsg[0] = "");
        row.question = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        // console.log("dataaa", this.state.rowData)
        break;
      case "option1":
        event.target.value.trim() == ""
          ? (errorMsg[1] = "Option is required!")
          : (errorMsg[1] = "");
        row.option1 = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        // console.log("dataaa", this.state.rowData)
        break;
      case "option2":
        event.target.value.trim() == ""
          ? (errorMsg[2] = "Option is required!")
          : (errorMsg[2] = "");
        row.option2 = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        // console.log("dataaa", this.state.rowData)
        break;
      case "option3":
        event.target.value.trim() == ""
          ? (errorMsg[3] = "Option is required!")
          : (errorMsg[3] = "");
        row.option3 = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        // console.log("dataaa", this.state.rowData)
        break;
      case "option4":
        event.target.value.trim() == ""
          ? (errorMsg[4] = "Option is required!")
          : (errorMsg[4] = "");
        row.option4 = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        // console.log("dataaa", this.state.rowData)
        break;
      case "option5":
        event.target.value.trim() == ""
          ? (errorMsg[5] = "Option is required!")
          : (errorMsg[5] = "");
        row.option5 = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "distractorRationale":
        event.target.value.trim() == ""
          ? (errorMsg[6] = "Distractor Rationale is required!")
          : (errorMsg[6] = "");
        row.distractorRationale = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "rubicReference":
        event.target.value.trim() == ""
          ? (errorMsg[7] = "Rubic Reference is required!")
          : (errorMsg[7] = "");
        row.rubicReference = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "acknowledgement":
        event.target.value.trim() == ""
          ? (errorMsg[8] = "Acknowledgement is required!")
          : (errorMsg[8] = "");
        row.acknowledgement = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "sampleAnswer":
        event.target.value.trim() == ""
          ? (errorMsg[9] = "Sample Answer is required!")
          : (errorMsg[9] = "");
        row.sampleAnswer = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "addReference":
        event.target.value.trim() == ""
          ? (errorMsg[10] = "Reference is required!")
          : (errorMsg[10] = "");
        row.addReference = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "addDescription":
        event.target.value.trim() == ""
          ? (errorMsg[11] = "Description is required!")
          : (errorMsg[11] = "");
        row.addDescription = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "addSource":
        event.target.value.trim() == ""
          ? (errorMsg[12] = "Source is required!")
          : (errorMsg[12] = "");
        row.addSource = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "addNote":
        event.target.value.trim() == ""
          ? (errorMsg[13] = "Note is required!")
          : (errorMsg[13] = "");
        row.addNote = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "addAcknowledgement":
        event.target.value.trim() == ""
          ? (errorMsg[14] = "Acknowledgement is required!")
          : (errorMsg[14] = "");
        row.addAcknowledgement = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
    }
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ loading: false })
  //   }, 1000);
  // }

  componentDidMount() {
    if (this.props.location.query) {
      let option = this.props.location.query;
      this.props.location.query.autoScore === 'yes' ? this.setState({ autoScore: true }) : this.setState({ autoScore: false })

      this.setState(
        {
          rowData: this.props.location.query || null,
          addORedit: "edit",
          // editId: this.props.location.query.original.lawschool_id,
        },
        // () => console.log(this.state.rowData)
      );
    }
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onSubmitForm = e => {
    e.preventDefault();
    let validateAll = false;
    let obj = this.state.rowData
    validateAll = this.state.errorMsg.every((val, i, arr) => val === "" ? true : false); // true
    if (validateAll === true) {
      if (

        obj['question'] == '' ||
        obj['option1'] == '' ||
        obj['option2'] == '' ||
        obj['option3'] == '' ||
        obj['option4'] == '' ||
        obj['option5'] == '' ||
        obj["distractorRationale"] == '' ||
        obj["rubicReference"] === '' ||
        obj["acknowledgement"] === '' ||
        obj["sampleAnswer"] === '' ||
        obj["addReference"] == '' ||
        obj["addDescription"] == '' ||
        obj["addSource"] == '' ||
        obj["addNote"] == '' ||
        obj["addAcknowledgement"] == ''

      )
        validateAll = false
    }

    if (validateAll === true) {
      this.state.addORedit === "add"
        ? fetch("http://barbri.thinrootsoftware.com/barbriapi/law_school.php", {
          method: "post",
          body: JSON.stringify({
            question: this.state.rowData.question,
            option1: this.state.rowData.option1,
            option2: this.state.rowData.option2,
            option3: this.state.rowData.option3,
            option4: this.state.rowData.option4,
            option5: this.state.rowData.option5,
            fontSetting:this.state.rowData.fontSetting,
            labelType: this.state.rowData.labelType,
            style: this.state.rowData.style,
            answerAttempts:this.state.rowData.answerAttempts,
            minScore:this.state.rowData.minScore,
            scoreType:this.state.rowData.scoreType,
            score:this.state.rowData.score,
            practiceUsageSwitchValue:this.state.rowData.practiceUsageSwitch,
            autoScore:this.state.rowData.autoScore,
            distractorRationale: this.state.rowData.distractorRationale,
            rubicReference:this.state.rowData.rubicReference,
            acknowledgement:this.state.rowData.acknowledgement,
            sampleAnswer: this.state.rowData.sampleAnswer,
            addReference: this.state.rowData.addReference,
            addDescription:this.state.rowData.addDescription,
            addSource:this.state.rowData.addSource,
            addNote: this.state.rowData.addNote,
            addAcknowledgement: this.state.rowData.addAcknowledgement,
            answerValue: this.state.answerValue,
            preferenceStatus:this.state.rowData.preferenceStatus,
            questionScoreType:this.state.rowData.questionScoreType,
            questionScoreFeatures:this.state.rowData.questionScoreFeatures,
            contentTypeTag:this.state.rowData.contentTypeTag,
            questionTypeTag:this.state.rowData.questionTypeTag,
            subjectTag:this.state.rowData.subjectTag
          })
        }).then(res => {
          console.log("dataaaaaaaa" + res);
          swal("Data Added!", "Successfully!", "success");

          this.state.rowData.lawschool_code = "";
          this.state.rowData.lawschool_name = "";
          this.state.rowData.lawschool_phone = "";
          this.state.rowData.lawschool_primary_email = "";
          this.state.rowData.lawschool_website_link = "";
          this.state.rowData.lawschool_address = "";
          this.state.rowData.lawschool_contact_first_name = "";
          this.state.rowData.lawschool_contact_phone_number = "";
          this.state.rowData.lawschool_contact_email = "";
          this.state.rowData.lawschool_username = "";
          this.state.rowData.lawschool_password = "";
          this.props.history.push("/admin/law-school-list");
        })
        : fetch(
          `http://barbri.thinrootsoftware.com/barbriapi/updatelawschool.php?id=${this.state.editId}`,
          {
            method: "post",
            body: JSON.stringify({
              lawschool_code: this.state.rowData.lawschool_code,
              lawschool_name: this.state.rowData.lawschool_name,
              lawschool_phone: this.state.rowData.lawschool_phone,
              lawschool_primary_email: this.state.rowData
                .lawschool_primary_email,
              lawschool_website_link: this.state.rowData
                .lawschool_website_link,
              lawschool_category: this.state.selectedOption.value,
              lawschool_address: this.state.rowData.lawschool_address,
              lawschool_contact_first_name: this.state.rowData
                .lawschool_contact_first_name,
              lawschool_contact_phone_number: this.state.rowData
                .lawschool_contact_phone_number,

              lawschool_contact_email: this.state.rowData
                .lawschool_contact_email,
              lawschool_username: this.state.rowData.lawschool_username,
              lawschool_password: this.state.rowData.lawschool_password,
              lawschool_profile_active: this.state.rowData
                .lawschool_profile_active
            })
          }
        ).then(res => {
          console.log("dataaaaaaaa" + res);
          swal("Row updated!", "Successfully!", "success");
          this.props.history.push("/admin/law-school-list");
        });
    } else {
      this.setState({
        showMsg: true
      });
    }
  };

  fontSetting = (selectedValue) => {
    let row = this.state.rowData;
    row.fontSetting = selectedValue
    this.setState({ rowData: row });
  };

  labelType = (selectedValue) => {
    let row = this.state.rowData;
    row.labelType = selectedValue
    this.setState({ rowData: row });
  };
  style = (selectedValue) => {
    let row = this.state.rowData;
    row.style = selectedValue
    this.setState({ rowData: row });
  };
  answerAttempts = (selectedValue) => {
    let row = this.state.rowData;
    row.answerAttempts = selectedValue
    this.setState({ rowData: row });
  };
  minScore = (selectedValue) => {
    let row = this.state.rowData;
    row.minScore = selectedValue
    this.setState({ rowData: row });
  };
  score = (selectedValue) => {
    let row = this.state.rowData;
    row.score = selectedValue
    this.setState({ rowData: row });
  };
  preferenceStatus = (selectedValue) => {
    let row = this.state.rowData;
    row.preferenceStatus = selectedValue
    this.setState({ rowData: row });
  };
  questionScoreType = (selectedValue) => {
    let row = this.state.rowData;
    row.questionScoreType = selectedValue
    this.setState({ rowData: row });
  };
  questionScoreFeatures = (selectedValue) => {
    let row = this.state.rowData;
    row.questionScoreFeatures = selectedValue
    this.setState({ rowData: row });
  };
  contentTypeTag = (selectedValue) => {
    let row = this.state.rowData;
    row.contentTypeTag = selectedValue
    this.setState({ rowData: row });
  };
  questionTypeTag = (selectedValue) => {
    let row = this.state.rowData;
    row.questionTypeTag = selectedValue
    this.setState({ rowData: row });
  };
  subjectTag = (selectedValue) => {
    let row = this.state.rowData;
    row.subjectTag = selectedValue
    this.setState({ rowData: row });
  };

  practiceUsageSwitch = (index) => {
    if (this.state.practiceUsageSwitch) {
      let row = this.state.rowData;
      row.practiceUsageSwitchValue = "no";
      this.setState({ rowData: row })
    }
    else {
      let row = this.state.rowData;
      row.practiceUsageSwitchValue = "yes";
      this.setState({ rowData: row })
    }
    this.setState(function (prevState) {
      return { practiceUsageSwitch: !prevState.practiceUsageSwitch };
    });
    console.log(this.state.rowData.practiceUsageSwitchValue)
  }

  autoScore = (index) => {
    if (this.state.autoScore) {
      let row = this.state.rowData;
      row.autoScore = "no";
      this.setState({ rowData: row })
    }
    else {
      let row = this.state.rowData;
      row.autoScore = "yes";
      this.setState({ rowData: row })
    }
    this.setState(function (prevState) {
      return { autoScore: !prevState.autoScore };
    });
    console.log(this.state.rowData.autoScore)
  }

  render() {

    return (
      <div>

        {this.state.loading ?
          <div className="loader-custom">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale-pulse-out-rapid" />
                <h6 className="mt-2">
                  Please Wait... Fetching Information
          </h6>
              </div>
            </div>
          </div>

          :
          <div>
            {this.state.showMsg === false ? null : (
              <div className="error-txt d-block justify-content-center text-center">
                Please fill all mandatory fields correctly{" "}
              </div>
            )}
            <form onSubmit={this.onSubmitForm}>

              <div className="row ">
                <div className="col-md-6 col-xs-12 ">
                  <h4 className="head-text text-primary">AAQ056</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
                <div className="col-md-6 col-xs-12">
                  <div className="float-right text-primary mt-2  d-flex ">
                    <FontAwesomeIcon className="mt-1" icon={faHome} />
                    <span className="ml-1">/</span>
                    <a>
                      <p className="ml-1">
                        Item Bank / <span className="text-secondary">Item Bank</span>{" "}
                      </p>
                    </a>
                  </div>
                </div>
              </div>

              <Row className="page-title">
                <Col xs="12" sm="12" md="7" lg="7" xl="7">
                </Col>
                <Col
                  xs="12"
                  sm="12"
                  md="5"
                  lg="5"
                  xl="5"
                  className="text-right"
                >
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-outline-primary pr-5 pl-5 mr-2"
                    >
                      Save
                      </button>
                    <Link
                      to="/admin/item-bank-list"
                      className="add-law-school-btn"
                    >
                      <button className="btn btn-outline-primary pr-5 pl-5">
                        Back
                        </button>
                    </Link>
                  </div>
                </Col>
              </Row>

              <Card tabs="true" className=" m-0 p-0">
                <CardHeader className="m-0">
                  <Nav justified>
                    <NavItem className="m-0">
                      <NavLink
                        href="javascript:void(0);"
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        <h6 className="font-weight-500 text-primary">Basic Info</h6>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="javascript:void(0);"
                        className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        <h6 className="font-weight-500 text-primary">Settings</h6>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="javascript:void(0);"
                        className={classnames({
                          active: this.state.activeTab === "3"
                        })}
                        onClick={() => {
                          this.toggle("3");
                        }}
                      >
                        <h6 className="font-weight-500 text-primary">Preferences</h6>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="javascript:void(0);"
                        className={classnames({
                          active: this.state.activeTab === "4"
                        })}
                        onClick={() => {
                          this.toggle("4");
                        }}
                      >
                        <h6 className="font-weight-500 text-primary">
                          Revision History
                  </h6>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-0">
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <BasicInfo fields={this.state} fieldHandler={this.fieldHandler} />
                    </TabPane>
                    <TabPane tabId="2">
                      <Settings fields={this.state} fieldHandler={this.fieldHandler} fontSetting={this.fontSetting} labelType={this.labelType} style={this.style} answerAttempts={this.answerAttempts} minScore={this.minScore} score={this.score} practiceUsageSwitch={this.practiceUsageSwitch} autoScore={this.autoScore}/>
                    </TabPane>
                    <TabPane tabId="3">
                      <Perferences fields={this.state} fieldHandler={this.fieldHandler} preferenceStatus={this.preferenceStatus} questionScoreType={this.questionScoreType} questionScoreFeatures={this.questionScoreFeatures} contentTypeTag={this.contentTypeTag} questionTypeTag={this.questionTypeTag} subjectTag={this.subjectTag} />
                    </TabPane>
                    <TabPane tabId="4">
                      <RevisionHistory />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </form>
          </div>
        }
      </div>
    );
  }
}
