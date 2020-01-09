import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Nav,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col
} from "reactstrap";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import {
  currentState,
  postData,
  redirectPath
} from "../../../../../actions/actionMain";
import BasicInfo from "./BasicInfo";
import Perferences from "./Preferences";
import { itemBankInitialRow } from "../../../../../components/admin/initialRows";
import { getSession } from "../../../../routes/routePaths"
import { customPageTitle } from '../../../../../components/commonComponents/customPageTitle'
import {language} from '../../../../../utils/locale/locale'
import { errors } from '../../../../../utils/admin/ErrorMessages'


class ItemBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminSession: getSession("AdminSession"),
      activeTab: "1",
      rowData: itemBankInitialRow,
      errorMsg: [""],
      validateAll: [],
      profileStatus: "A",
      selectedStatus: "",
      selectedTopic: "",
      selectedSubject: "",
      SelectedValuesforValues: "",
      SelectedValuesforValuesIndex: "",
      optionLabel: "",
      editorState: EditorState.createEmpty(),
      editorStateChoice1: EditorState.createEmpty(),
      editorStateChoice2: EditorState.createEmpty(),
      editorStateChoice3: EditorState.createEmpty(),
      editorStateChoice4: EditorState.createEmpty(),
      editorStateChoice5: EditorState.createEmpty(),
      rationaleState: EditorState.createEmpty(),
      contentTypeTag: [],
      answsring: "",
      toggleTopicOnValue: "",
      canSubmit: true,
      cursorDisable: ""

    };
  }

  componentDidMount() {
    this.props.currentState("/admin/itembank/");

    customPageTitle('Add ItemBank')
    let row = this.state.rowData;
    row.itemBankCode = "";
    this.setState({ rowData: row });

  }

  componentWillUpdate() {
    this.fieldHandler();

  }

  fieldHandler = (field, event) => {

    let row = this.state.rowData;
    let errorMsg = this.state.errorMsg;
    let idreg = /^[a-zA-Z0-9]{11,}$/;
    let alphaNumeric = /^[a-zA-Z0-9\s\']+$/;
    switch (field) {
      case "itemBankCode":
        event.target.value.trim() === ""
          ? (errorMsg[0] = errors.itembank_code_required)
          : idreg.test(event.target.value.trim()) === true
            ? (errorMsg[0] = errors.schoolCodeLength)
            : alphaNumeric.test(event.target.value.trim()) === false
              ? (errorMsg[0] = errors.alpha_numeric)
              : (errorMsg[0] = "");
        row.itemBankCode = event.target.value;
        this.setState({ rowData: row });
        break;
      default:
        return null;
    }
  };

  toggle = tab => {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.redirectPath("itembank");
    let validateAll = false;
    let obj = this.state.rowData;
    validateAll = this.state.errorMsg.every((val, i, arr) =>
      val === "" ? true : false
    ); // true
    if (validateAll === true) {
      if (
        obj["question"] === "" ||
        obj["option1"] === "" ||
        obj["option2"] === "" ||
        obj["option3"] === "" ||
        obj["option4"] === "" ||
        obj["distractorRationale"] === ""
      )
        validateAll = false;
    }
    if (validateAll === true) {
      var a =this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice1.getCurrentContent()))).trim();
      var b = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice2.getCurrentContent()))).trim();
      var c = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice3.getCurrentContent()))).trim();
      var d = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice4.getCurrentContent()))).trim();
      var e = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice5.getCurrentContent()))).trim();
  

      if( a ==  b || a ==  c || a ==  d || a == e || b == c || b == d || b == e || c ==  d || c ==  e || d == e ) {
      swal(language.invalid, language.itemBankDifferentOptions,"error");
      return false;
      }
      
     else{ 
      const body = JSON.stringify({
        itemBankCode: this.state.rowData.itemBankCode,
        itemBankQuestion: draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        ),
        itemBankOption1: draftToHtml(
          convertToRaw(this.state.editorStateChoice1.getCurrentContent())
        ),
        itemBankOption2: draftToHtml(
          convertToRaw(this.state.editorStateChoice2.getCurrentContent())
        ),
        itemBankOption3: draftToHtml(
          convertToRaw(this.state.editorStateChoice3.getCurrentContent())
        ),
        itemBankOption4: draftToHtml(
          convertToRaw(this.state.editorStateChoice4.getCurrentContent())
        ),
        itemBankOption5: this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice5.getCurrentContent()))).trim() === "" ? "" : draftToHtml(convertToRaw(this.state.editorStateChoice5.getCurrentContent())),


        itemBankCreatedBy: "Admin01",
        itemBankSubject: this.state.selectedSubject.value,
        itemBankSubjectId: this.state.selectedSubject.id,
        itemBankTopic: this.state.selectedTopic.value,
        itemBankTopicId: this.state.selectedTopic.topicID,
        itemBankTag: this.state.rowData.itemBankTag,

        itemBankValue:
          this.state.SelectedValuesforValuesIndex === 0
            ? "A"
            : this.state.SelectedValuesforValuesIndex === 1
              ? "B"
              : this.state.SelectedValuesforValuesIndex === 2
                ? "C"
                : this.state.SelectedValuesforValuesIndex === 3
                  ? "D"
                  : this.state.SelectedValuesforValuesIndex === 4
                    ? "E"
                    : "",

        itemBankDistractorRationale: draftToHtml(
          convertToRaw(this.state.rationaleState.getCurrentContent())
        ),
        itemBankStatus: this.state.selectedStatus.value,
        itemBankContentType: this.state.answsring
      });


      this.props.postData(body);
      this.setState({ rowData: [] })
    }
    }
  };

  preferenceStatus = selectedValue => {
    this.setState({ selectedStatus: selectedValue });
  };

  contentTypeTag = selectedValue => {
    const list = selectedValue.map(a => {
      return a.value;
    });
    var string = list.join(",");
    let row = this.state.rowData;
    row.contentTypeTag = string;
    this.setState({ rowData: row, answsring: string });
  };

  onEditorStateChange = editorState => {
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[1] = errors.question_required
      this.setState({
        editorState, errorMsg: copyArray
      })
    }
    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[1] = ""
      this.setState({
        editorState,
        errorMsg: copyArray
      }, () => this.enableButton());
    }
  };
  onEditorStateChangeChoice1 = editorStateChoice1 => {
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorStateChoice1.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[2] = errors.option_1
      this.setState({
        editorStateChoice1,
        errorMsg: copyArray
      })
    }
    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[2] = ""
      this.setState({
        editorStateChoice1,
        errorMsg: copyArray
      }, () => this.enableButton());
    }
  };
  onEditorStateChangeChoice2 = editorStateChoice2 => {
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorStateChoice2.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[3] = errors.option_2
      this.setState({
        editorStateChoice2, errorMsg: copyArray
      })
    }
    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[3] = ""
      this.setState({
        editorStateChoice2,
        errorMsg: copyArray
      }, () => this.enableButton());
    }
  };
  onEditorStateChangeChoice3 = editorStateChoice3 => {
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorStateChoice3.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[4] = errors.option_3
      this.setState({
        editorStateChoice3, errorMsg: copyArray
      })
    }
    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[4] = ""
      this.setState({
        editorStateChoice3,
        errorMsg: copyArray
      }, () => this.enableButton());
    }
  };
  onEditorStateChangeChoice4 = editorStateChoice4 => {
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorStateChoice4.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[5] = errors.option_4
      this.setState({
        editorStateChoice4, errorMsg: copyArray
      })
    }
    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[5] = ""
      this.setState({
        editorStateChoice4,
        errorMsg: copyArray
      }, () => this.enableButton());
    }

    this.setState({
      editorStateChoice4
    });
  };
  onEditorStateChangeChoice5 = editorStateChoice5 => {
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorStateChoice5.getCurrentContent())))
    if (valid.trim() === "") {
      this.setState({
        editorStateChoice5
      })
    }
    if (valid.trim() != "") {
      this.setState({
        editorStateChoice5
      });
    }
  };
  onEditorRationaleStateChange = rationaleState => {
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(rationaleState.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[6] = errors.option_5
      this.setState({
        rationaleState, errorMsg: copyArray
      })
    }
    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[6] = ""
      this.setState({
        rationaleState,
        errorMsg: copyArray
      }, () => this.enableButton());
    }
  };

  selectedValueForValue = (index, answer, e) => {
    this.setState({
      optionLabel: e.target.value,
      SelectedValuesforValuesIndex: index,
      SelectedValuesforValues: answer
    });
  };

  selectedSubject = selectedValue => {
    this.setState({ selectedSubject: selectedValue, selectedTopic: '' });
    if (selectedValue.id == 1) {
      this.setState({ toggleTopicOnValue: 1 })
    } else if (selectedValue.id == 2) {
      this.setState({ toggleTopicOnValue: 2 })
    } else if (selectedValue.id == 3) {
      this.setState({ toggleTopicOnValue: 3 })
    } else if (selectedValue.id == 4) {
      this.setState({ toggleTopicOnValue: 4 })
    } else if (selectedValue.id == 5) {
      this.setState({ toggleTopicOnValue: 5 })
    } else if (selectedValue.id == 6) {
      this.setState({ toggleTopicOnValue: 6 })
    } else if (selectedValue.id == 7) {
      this.setState({ toggleTopicOnValue: 7 })
    }
  };

  selectedTopic = selectedValue => {
    this.setState({ selectedTopic: selectedValue });
  };

  disableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "not-allowed" });
  }

  enableButton = () => {
    if (this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice1.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice2.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice3.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorStateChoice4.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.rationaleState.getCurrentContent()))).trim() != "") {
      this.setState({ canSubmit: false, cursorDisable: "" });
    } else {
      this.disableButton();
    }
  }

  removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>?/gm, "");
  };

  render() {
    if (this.state.adminSession.user_role === "3") {
      this.props.history.push("/admin/not_allowed");
    }

    const option1 = this.state.rowData.itemBankOption1;
    const option2 = this.state.rowData.itemBankOption2;
    const option3 = this.state.rowData.itemBankOption3;
    const option4 = this.state.rowData.itemBankOption4;
    const option5 = this.state.rowData.itemBankOption5;

    const values = [
      { value: "0", optionLabel: "A", answer: option1 },
      { value: "1", optionLabel: "B", answer: option2 },
      { value: "2", optionLabel: "C", answer: option3 },
      { value: "3", optionLabel: "D", answer: option4 },
      { value: "4", optionLabel: "E", answer: option5 }
    ];

    var isFilled = true
    if (this.state.canSubmit === false) {
      isFilled = this.state.rowData.itemBankCode === "" ||
        this.state.rowData.editorState === "" ||
        this.state.selectedTopic === "" ||
        this.state.rowData.itemBankTag === "" ||
        this.state.SelectedValuesforValuesIndex === "" ||
        this.state.rationaleState === "" ||
        this.state.rowData.profileStatus === ""  ? true
        : false;
    }

    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <form onSubmit={this.onSubmitForm}>
          <div className="container-fluid mb-2 mt-2">
            <Row>
              <Col xs="12" sm="12" md="5" lg="5" xl="5">
                <h1 className="msedge-overview-text" tabIndex="-1">
                  {language.item_bank}
                </h1>
              </Col>
              <Col xs="12" sm="12" md="7" lg="7" xl="7" className="text-right">
                <div className="form-group">
                  {!this.props.isLoading ? (
                    <span className="msedge-questions-start msedge-right-br">
                      <button
                        type="submit"
                        className="btn btn-outline-primary mr-2"
                        disabled={isFilled}
                      >
                        <li>
                          <i className="pe-7s-download" aria-hidden="true"></i>
                        </li>
                  <li className="text-uppercase">{language.save}</li>
                      </button>
                    </span>
                  ) : (
                      <span className="msedge-questions-start msedge-right-br mr-2">
                        <button
                          className="btn btn-primary"
                          type="button"
                          disabled
                        >
                          <li>
                            <span
                              className="spinner-border spinner-border-sm mr-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          </li>
                          <li className="text-uppercase">
                           {language.buttonLoading}
                          </li>
                        </button>
                      </span>
                    )}
                  <span className="msedge-questions-start msedge-right-br">
                    <Link
                      to="/admin/list_itembank"
                      className="add-law-school-btn"
                    >
                      <button className="btn btn-outline-primary">
                        <li>
                          <i className="pe-7s-back" aria-hidden="true"></i>
                        </li>
                  <li className="text-uppercase">{language.back}</li>
                      </button>
                    </Link>
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <div className="container-fluid bg-grey msedge-admin-add">
              <Card tabs="true" className=" m-0 p-0">
                <CardHeader className="m-0">
                  <Nav justified>
                    <NavItem className="m-0">
                      <NavLink
                        href="#"
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        <h6 className="font-weight-500 text-primary">
                          {language.basic_infon}
                        </h6>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        href="#"
                        className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        <h6 className="font-weight-500 text-primary">
                          {language.preferences}
                        </h6>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-0">
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <BasicInfo
                        fields={this.state}
                        fieldHandler={this.fieldHandler}
                        onEditorStateChange={this.onEditorStateChange}
                        onEditorStateChangeChoice1={
                          this.onEditorStateChangeChoice1
                        }
                        onEditorStateChangeChoice2={
                          this.onEditorStateChangeChoice2
                        }
                        onEditorStateChangeChoice3={
                          this.onEditorStateChangeChoice3
                        }
                        onEditorStateChangeChoice4={
                          this.onEditorStateChangeChoice4
                        }
                        onEditorStateChangeChoice5={
                          this.onEditorStateChangeChoice5
                        }
                      />
                    </TabPane>

                    <TabPane tabId="2">
                      <Perferences
                        fields={this.state}
                        fieldHandler={this.fieldHandler}
                        selectedStatus={this.state.selectedStatus}
                        preferenceStatus={this.preferenceStatus}
                        onEditorRationaleStateChange={this.onEditorRationaleStateChange}
                        selectedValueForValue={this.selectedValueForValue}
                        options={values}
                        contentTypeTag={this.contentTypeTag}

                        selectedSubjectValue={this.state.selectedSubject}
                        selectedSubject={this.selectedSubject}
                        selectedTopicValue={this.state.selectedTopic}
                        selectedTopic={this.selectedTopic}
                        toggleTopicOnValue={this.state.toggleTopicOnValue}
                      />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div>
          </Row>
        </form>
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listData: state.main.data,
    isLoading: state.main.isDataAdding
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      currentState,
      postData,
      redirectPath
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemBank);
