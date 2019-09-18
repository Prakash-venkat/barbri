//Authorization:prakash
//Designed:Muthuraja r.
//purpose:created for add practice exam.
//description: practice exam .
import React, { Component, Fragment } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Card,
  CardBody,
  Col,
  Row,
  Input,
  Collapse,
  Button,
  CardHeader,
  UncontrolledTooltip
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { subjects } from "./utils/subject.json";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import "../../../../assets/custom/admin/_admin_law_schools.scss";
const initialRow = {
  practice_exam_code: "",
  practice_exam_name: " ",
  practice_exam_desc: " ",
  practice_exam_status: "y"
};
class AddPracticeExam extends Component {
  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);

    this.state = {
      total: 0,
      accordion: [false, false, false, false, false, false, false],
      isChecked: false,
      value: [],
      editId: " ",
      addORedit: "add",
      subjects: subjects,
      rowData: initialRow,
      errorMsg: ["", "", ""],
      showMsg: false
    };
    this.fieldHandler.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.topicNoQuestionsHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.location.query) {
      let subject = this.state.subjects;

      console.log(subject[0].sum);
      axios
        .get(
          `http://barbri.thinrootsoftware.com/barbriapi/get_practiceexam.php?id=${this.props.location.query.original.practice_exam_code}`
        )
        .then(response => console.log(response.data, "response"))
        .catch(error => console.log(error, "error"));
      this.setState({
        rowData: this.props.location.query.original || null,
        addORedit: "edit",
        editId: this.props.location.query.original.practice_exam_code,
        subjects: subject
      });
    }
  }
  getQuestionSum = () => {
    return null;
  };

  topicNoQuestionsHandler(parentIndex, topicIndex, e) {
    const subs = this.state.subjects;
    let total = 0;
    subs.map((sub, index) => {
      if (index === parentIndex) {
        return sub.topics.map((topic, i) => {
          if (topicIndex === i) {
            const tp = topic;
            e.target.value  <= 0 ? (tp.no = 0) : (tp.no = e.target.value);
            return tp;
          } else {
            return topic;
          }
        });
      } else {
        return sub;
      }
    });

    let sum = this.state.subjects[parentIndex].topics.reduce((acc, topic) => {
      return acc + Number(topic.no);
    }, 0);

    subs[parentIndex].sum = sum;
    total = this.state.subjects.reduce((acc, sub) => {
      return acc + Number(sub.sum);
    }, 0);
    this.setState({ subjects: subs, total: total });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state,
      currentNo: tab
    });
  }
  fieldHandler(field, event) {
    let row = this.state.rowData;
    let errorMsg=this.state.errorMsg
    switch (field) {
      case "code":
        row.practice_exam_code = event.target.value;
        event.target.value.trim()===''?  errorMsg[0]='Exam code is required' : errorMsg[0]=''
        this.setState({ rowData: row });
        break;
      case "name":
        row.practice_exam_name = event.target.value;
        event.target.value.trim()===''?  errorMsg[1]='Exam Name is required' : errorMsg[1]=''
        this.setState({ rowData: row });
        break;
      case "description":
        row.practice_exam_desc = event.target.value;
        event.target.value.trim()===''?  errorMsg[2]='Description is required' : errorMsg[2]=''
        this.setState({ rowData: row });
        break;
      case "status":
        row.practice_exam_status = event.target.value;
        
        this.setState({ rowData: row });
        break;
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.total);
    console.log(this.state.addORedit);
    let validateAll = false;
    let obj = this.state.rowData;
    validateAll = this.state.errorMsg.every((val, i, arr) =>
      val === "" ? true : false
    ); // true
    if (validateAll === true) {
      if (
       
        obj["practice_exam_code"] == "" ||
        obj["practice_exam_name"] == "" ||
        obj["practice_exam_desc"] == "" 
  
      )
        validateAll = false;
      window.scrollTo(0, 0);
    }
   if(validateAll===true){
    this.state.addORedit === "add"
    ? fetch(
        "http://barbri.thinrootsoftware.com/barbriapi/practice_exam.php",
        {
          method: "post",
          body: JSON.stringify({
            practice_exam_code: this.state.rowData.practice_exam_code,
            practice_exam_name: this.state.rowData.practice_exam_name,
            practice_exam_desc: this.state.rowData.practice_exam_desc,
            practice_exam_status: this.state.rowData.practice_exam_status,
            practice_exam_created_by: this.state.rowData
              .lawschool_website_link,
            practice_exam_total_questions: this.state.total,
            practice_exam_created_by: "ADMIN",
            practice_exam_details: [
              {
                ped_condition_type: "civil procedure",
                ped_condition_count: this.state.subjects[0].sum
              },
              {
                ped_condition_type: "constitutional law",
                ped_condition_count: this.state.subjects[1].sum
              },
              {
                ped_condition_type: "contracts",
                ped_condition_count: this.state.subjects[2].sum
              },
              {
                ped_condition_type: "criminal law and procedure",
                ped_condition_count: this.state.subjects[3].sum
              },
              {
                ped_condition_type: "evidence",
                ped_condition_count: this.state.subjects[4].sum
              },
              {
                ped_condition_type: "real property",
                ped_condition_count: this.state.subjects[5].sum
              },
              {
                ped_condition_type: "torts",
                ped_condition_count: this.state.subjects[6].sum
              }
            ]
          })
        }
      ).then(
        res => {
          console.log("dataaaaaaaa" + res);
          swal("Data Added!", "Successfully!", "success");
          this.props.history.push("/admin/practice-list");
        }
        // (error) => {
        //   this.setState({
        //     isLoaded: true,
        //     error
        //   });
        // }
      )
    : fetch(
        `http://barbri.thinrootsoftware.com/barbriapi/update_practiceexam.php?id=${this.state.editId}`,
        {
          method: "post",
          body: JSON.stringify({
            practice_exam_code: this.state.rowData.practice_exam_code,
            practice_exam_name: this.state.rowData.practice_exam_name,
            practice_exam_desc: this.state.rowData.practice_exam_desc,
            practice_exam_status: this.state.rowData.practice_exam_status,
            practice_exam_created_by: this.state.rowData
              .lawschool_website_link,
            practice_exam_total_questions: this.state.total,
            practice_exam_created_by: " sas",
            practice_exam_details: [
              {
                ped_condition_type: "civil procedure",
                ped_condition_count: 0
              },
              {
                ped_condition_type: "constitutional law",
                ped_condition_count: 0
              },
              {
                ped_condition_type: "contracts",
                ped_condition_count: 0
              },
              {
                ped_condition_type: "criminal law and procedure",
                ped_condition_count: 0
              },
              {
                ped_condition_type: "evidence",
                ped_condition_count: 0
              },
              {
                ped_condition_type: "real property",
                ped_condition_count: 0
              },
              {
                ped_condition_type: "torts",
                ped_condition_count: 0
              }
            ]
          })
        }
      )
        .then(res => {
          console.log("dataaaaaaaa" + res);
          swal("Row updated!", "Successfully!", "success");
          this.props.history.push("/admin/practice-list");
        })
        .catch(error => console.log("error", error));
   }else{
     this.setState({ showMsg : true})
   }
  };
  render() {
    const style = {
      paddingLeft: "5px",
      color: "red"
    };
    return (
      <div className="practice-exam">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Row>
              <Col md="12">
                <Form>
                  <div className="mb-2 heading-section">
                    <Row className="page-title">
                      <Col xs="12" sm="12" md="7" lg="7" xl="7">
                        <h5 className="text-primary">Add Practice Exam</h5>
                        <p className="text-muted">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit
                        </p>
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
                            onClick={this.onSubmit}
                          >
                            Save
                          </button>
                          <Link to="/admin/practice-list">
                            <button
                              type="submit"
                              className="btn btn-outline-primary pr-5 pl-5"
                            >
                              Back
                            </button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="practice-exam-center">
                    <div className=" border-bottom">
                    {this.state.showMsg === false ? null : (
                        <div className="error-txt d-block justify-content-center text-center">
                          Please fill all mandatory fields correctly{" "}
                        </div>
                      )}
                      <Row className="">
                        <Col className="pt-2">
                          <h6>Exam Information</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-2">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </Col>
                      </Row>
                      <div className="practice-exam-text">
                        <Row className="exam-space pt-2">
                          <Col md="3" className="">
                            <label htmlFor="code">
                              Practice Exam Code
                              <b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="6" className="">
                            <div className="form-group">
                              <input
                                name="code"
                                type="text"
                                className="form-control"
                                value={this.state.rowData.practice_exam_code}
                                onChange={this.fieldHandler.bind(this, "code")}
                              />
                              <span className="info-icon" id="code">
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  className="icon-color"
                                />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="code"
                              >
                                Enter practice exam code
                              </UncontrolledTooltip>
                              <span className='text-danger'>{this.state.errorMsg[0]}</span>
                            </div>
                          </Col>
                        </Row>

                        <Row className="exam-space pt-2">
                          <Col md="3" className="">
                            <label htmlFor="name">
                              Practice Exam Name
                              <b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="6" className="">
                            <div className="form-group">
                              <input
                                name="name"
                                type="text"
                                className="form-control"
                                value={this.state.rowData.practice_exam_name}
                                onChange={this.fieldHandler.bind(this, "name")}
                              />
                              <span className="info-icon" id="name">
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  className="icon-color"
                                />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="name"
                              >
                                Enter practice exam name
                              </UncontrolledTooltip>
                              <span className='text-danger'>{this.state.errorMsg[1]}</span>
                            </div>
                          </Col>
                        </Row>
                        <Row className="exam-space pt-2">
                          <Col md="3" className="">
                            <label htmlFor="description">
                              Practice Exam Description
                              <b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="6" className="">
                            <div className="form-group">
                              <input
                                name="description"
                                component="textarea"
                                className="form-control"
                                value={this.state.rowData.practice_exam_desc}
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "description"
                                )}
                              />
                              <span className="info-icon" id="lsadd">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="lsadd"
                              >
                                Enter practice exam description
                              </UncontrolledTooltip>
                              <span className='text-danger'>{this.state.errorMsg[2]}</span>
                            </div>
                          </Col>
                        </Row>

                        <div className="custom-fields">
                          <Row className="pt-2 pb-4">
                            <Col md="3">
                              <label htmlFor="lastname">Status :</label>
                            </Col>
                            <Col md="3">
                              <div className="custom-radio custom-control">
                                <input
                                  name="profile"
                                  type="radio"
                                  id="radioYes"
                                  className="custom-control-input"
                                  value="y"
                                  checked={
                                    this.state.rowData.practice_exam_status ===
                                    "y"
                                      ? true
                                      : false
                                  }
                                  onChange={this.fieldHandler.bind(
                                    this,
                                    "status"
                                  )}
                                />
                                <label
                                  className="custom-control-label"
                                  for="radioYes"
                                  checked
                                >
                                  Active
                                </label>
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="custom-radio custom-control">
                                <input
                                  name="profile"
                                  type="radio"
                                  id="radioNo"
                                  className="custom-control-input"
                                  value="n"
                                  onChange={this.fieldHandler.bind(
                                    this,
                                    "status"
                                  )}
                                  checked={
                                    this.state.rowData.practice_exam_status ===
                                    "n"
                                      ? true
                                      : false
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  for="radioNo"
                                >
                                  In Active
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>

                    <Row className="pt-2">
                      <Col className="pt-2">
                        <h6>Questions Information</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="mt-2">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
                      </Col>
                    </Row>

                    <div className="practice-exam-text">
                      <Row>
                        <Col md="9">
                          <div
                            id="accordion"
                            className="accordion-wrapper mb-3 mt-3"
                          >
                            {subjects.map((data, index) => (
                              <Card>
                                <CardHeader id="headingOne">
                                  <Button
                                    block
                                    color="link"
                                    className="text-left m-0 p-0"
                                    onClick={() => this.toggleAccordion(index)}
                                    aria-expanded={this.state.accordion[index]}
                                    aria-controls="collapseOne"
                                  >
                                    <Row>
                                      <Col
                                        md="8"
                                        className="justify-content-center align-self-center"
                                      >
                                        {this.state.accordion[index] ===
                                        true ? (
                                          <h6 className="m-0 p-0 accordianOn">
                                            {data.subjectName}
                                          </h6>
                                        ) : (
                                          <h6 className="m-0 p-0 accordianOff">
                                            {data.subjectName}
                                          </h6>
                                        )}
                                      </Col>
                                      <Col md="4" className="p-0">
                                        <Row className="header-left-align m-0">
                                          <Col md="11" className="">
                                            <Input
                                              bsSize="sm"
                                              placeholder="No of Questions"
                                              value={
                                                this.state.subjects[index].sum
                                              }
                                              disabled
                                            />
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Button>
                                </CardHeader>
                                <Collapse
                                  isOpen={this.state.accordion[index]}
                                  data-parent="#accordion"
                                  id="collapseOne"
                                  aria-labelledby="headingOne"
                                >
                                  <CardBody className="subjects-topics">
                                    {data.topics.map((topic, i) => (
                                      <Row className="subjects-list mt-3 mb-3">
                                        <Col md="8">
                                          <p className="m-0 p-0 text-muted">
                                            {topic.name}
                                          </p>
                                        </Col>
                                        <Col md="4" className="p-0 ">
                                          <Row className="m-0">
                                            <Col md="11">
                                              <Input
                                                type="number"
                                                bsSize="sm"
                                                placeholder="No of Questions"
                                                value={
                                                  this.state.subjects[index]
                                                    .topics[i].no
                                                }
                                                onChange={this.topicNoQuestionsHandler.bind(
                                                  this,
                                                  index,
                                                  i
                                                )}
                                              />
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    ))}
                                  </CardBody>
                                </Collapse>
                              </Card>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div>
                    <Row className="page-title">
                      <Col className="col-md-12 mt-3 pt-3 text-right">
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-outline-primary pr-5 pl-5 mr-2"
                            onClick={this.onSubmit}
                          >
                            Save
                          </button>
                          <Link to="/admin/practice-list">
                            <button
                              type="submit"
                              className="btn btn-outline-primary pr-5 pl-5"
                            >
                              Back
                            </button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Col>
            </Row>
          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
    );
  }
}

export default AddPracticeExam;
