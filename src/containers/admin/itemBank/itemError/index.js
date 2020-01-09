import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Col, Row, Modal, ModalHeader, ModalBody,
} from "reactstrap";
import swal from "sweetalert";
import Workbook from "react-excel-workbook";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from 'react-tooltip'

import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import {
  getData,
  currentState
} from "../../../../actions/actionMain";
import SortIcon from "../../../../components/admin/sortIcon";
import { instance } from "../../../../actions/constants";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'

class itemError extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      data: [],
      exceldata: [],
      filteredData: [],
      itemsList: [],
      statusValue: [],
      checked: [],
    };
  }

  componentDidMount() {
    customPageTitle('Item Errors')
    let getSessionData = this.state.adminSession
    let userRole = getSessionData.user_role;
    this.setState({ userRole: userRole });
    this.props.currentState("admin/itemerrors/");
    this.props.getData();   
  }

  componentWillReceiveProps({ listData }) {

    var datalist = listData == null || listData == undefined ? [] : listData;
    this.setState({
      data: datalist,
      filteredData: datalist
    });
  }

  goBack = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      showMsg: false,
      itemsList: []
    }));
  };

  errorReports = (index, errData) => {

    let errCode = errData.item_bank_code;

    instance
      .get(`admin/itemerrors/${errCode}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(res => {
        return res;
      })
      .then(result => {
        const value = result.data.data === null || result.data.data === "" ? [] : result.data.data.map(a => {
          return a.item_error_status;
        });
        this.setState({
          statusValue: value,
          itemsList:
            result.data.data === null || result.data.data === ""
              ? []
              : result.data.data
        });
      });
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  readMoreLess = (row, e) => {
    var checkedCopy = this.state.checked;
    checkedCopy[row.index] = !this.state.checked[row.index];
    this.setState(
      {
        checked: checkedCopy
      }
    );
  };
  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.item} sort={true} />,
          id: "item",
          accessor: el =>
            el.item_bank_code +
            "" +
            el.item_error_subject +
            "" +
            el.item_error_topic +
            "" +
            el.item_error_question,
          Cell: row => (
            <div>
              <div className="fieldname-font-size">
                {" "}
                <strong
                  style={{ color: "#0e6aae", cursor: "pointer" }}
                  onClick={() => this.errorReports(row.index, row.original)}
                >
                  {row.original.item_bank_code}{" "}
                </strong>{" "}
                <br />
                <strong>{row.original.item_error_subject}</strong> /{" "}
                <strong>{row.original.item_error_topic}</strong> <br />
                <p
                  className="admin-list-word-wrap"
                  dangerouslySetInnerHTML={{
                    __html: row.original.item_error_question
                      ? row.original.item_error_question.length > 170
                        ? `${
                        this.state.checked[row.index] === true
                          ? `${row.original.item_error_question.substring(
                            0,
                            row.original.item_error_question.length
                          )}`
                          : row.original.item_error_question.substring(0, 170)
                        }${
                        this.state.checked[row.index] === true
                          ? "...Read less"
                          : "...Read more"
                        }`
                        : row.original.item_error_question
                      : row.original.item_error_question
                  }}
                  onClick={e => this.readMoreLess(row, e)}
                ></p>
              </div>
            </div>
          )
        },

        {
          Header: (
            <SortIcon
              dataList={language.no_of_reported_error}
              sort={true}
              number={true}
            />
          ),

          accessor: "TotalReported",
          width: 200,
          Cell: row => (
            <div
              style={{
                textAlign: "center",
                width: "100%",
                cursor: "pointer",
                fontSize: "20px",
                color: "rgb(14, 106, 174)"
              }}
              onClick={() => this.errorReports(row.index, row.original)}
            >
              {row.value}
            </div>
          )
        },
        {
          Header: "Action",
          filterable: false,
          sortable: false,
          width: 100,
          Cell: row => (
            <div >
              <button
                data-tip
                data-for="view"

                className="ml-3 btn btn-outline-primary fs-icon"
                onClick={() => this.errorReports(row.index, row.original)}
              >
                <i className="lnr-book" ></i>
              </button>
              <ReactTooltip className="customeTheme" id='view' type='info' effect='solid'>
          <span>{language.view}</span>
              </ReactTooltip>
            </div>
          )
        }
      ]
    }
  ];

  handleSetData = data => {
    this.setState({ filteredData: data });
  };
  removeHTMLTags = (str) => {
    let a = str === null || str === undefined ? "<p></p>" : str.replace(/<[^>]*>?/gm, "")
    return a;
  };

  updateStatus = (itemData, value, index) => {
    instance
      .post(`admin/itemerror/status/${itemData.item_error_id}/${value}`, '',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(response => {
        if (response.data.status === "Success" || response.data.data === true) {
          swal(language.success, language.updatedMsg, "success");
          var copystatusValue = this.state.statusValue;
          copystatusValue[index] = value;
          this.setState({
            statusValue: copystatusValue,
          });
        } else {
          swal(language.tryAgain, "", "warning");
        }
      })
      .catch(e => {
        swal(language.oops,
          language.tryAgain,
          "error"
        );
      });
  };

  deleteUser = (itemData, index) => {
    const deleteStatus = "d";
    swal({
      title:language.confirmationPopupHeading,
      text: language.deleteConfirmation,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        instance.post(`admin/itemerror/status/${itemData.item_error_id}/${deleteStatus}`, '', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,        
          }
        })
          .then(res => {
            var copystatusValue = this.state.statusValue;
            copystatusValue[index] = "d";
            this.setState({ statusValue: copystatusValue });
            swal(language.success, language.deletedMsg, "success");
          })
          .catch(e => {
            swal(
              language.oops,
              language.tryAgain,
              "error"
            );
          });
      }
    });
  };

  render() {
    var data = this.state.data.map(data => {
      return {
        item_bank_code: data.item_bank_code,
        tot_report: data.TotalReported,
        item_error_subject: data.item_error_subject,
        item_error_topic: data.item_error_topic,
        item_error_question: this.removeHTMLTags(data.item_error_question),
      };
    });
    return (
      <div>
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div className="container-fluid mb-1 mt-3">
              <Row>
                <Col  xs="12" sm="12" md="6" lg="6" xl="6"
                  className="msedge-admin-title"
                >
                  <h1 className="msedge-overview-text">
                    {language.item_errors}
                  </h1>
                </Col>
                <Col xs="12" sm="12" md="6" lg="6" xl="6">
                  <div>
                    <Row className="pull-right pr-3">
                      <Col
                        xs="12"
                        sm="12"
                        md="6"
                        lg="7"
                        xl="7"
                        className="pr-0"
                      >
                        <div className="form-group ">
                          <GlobalSearchComponent
                            data={
                              this.state.data === null || this.state.data === ""
                                ? []
                                : this.state.data
                            }
                            handleSetData={this.handleSetData}
                          />
                        </div>
                      </Col>
                      <Col
                        xs="12"
                        sm="12"
                        md="6"
                        lg="5"
                        xl="5"
                        className="pl-2"
                      >
                        <div className="form-group msedge-questions-start msedge-right-br msedge-student-list-btn">
                          <Workbook
                            filename={"Item_error_data.xlsx"}
                            element={
                              <button
                                className="btn btn-outline-primary d-flex"
                                disabled={this.state.adminSession.user_role == "2" ||
                                  this.state.adminSession.user_role == "3"
                                  ? true
                                  : false
                                }
                                onClick={this.downloadReport}
                              >
                                <li>
                                  <i
                                    className="pe-7s-download"
                                    aria-hidden="true"
                                  ></i>
                                </li>
                                <li>{language.download}</li>
                              </button>
                            }
                          >
                            <Workbook.Sheet data={data} name="Item_error">
                              <Workbook.Column
                                label="Item bank Code"
                                value="item_bank_code"
                              />
                              <Workbook.Column
                                label="Item error subject"
                                value="item_error_subject"
                              />
                              <Workbook.Column
                                label="Item error topic"
                                value="item_error_topic"
                              />
                              <Workbook.Column
                                label="Item error question"
                                value="item_error_question"
                              />

                              <Workbook.Column
                                label="number of times reported"
                                value="tot_report"
                              />
                            </Workbook.Sheet>
                          </Workbook>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
            <Row>
              <div className="container-fluid bg-grey msedge-overall-padding">
                <Col md="12">
                  <div className="admin-item-tag">
                    <ReactTable
                      className="bg-white"
                      data={
                        this.state.filteredData === [] ||
                          this.state.filteredData === "" ||
                          this.state.filteredData === null
                          ? []
                          : this.state.filteredData
                      }
                      columns={this.columns}
                      defaultFilterMethod={filterCaseInsensitive}
                      minRows={2}
                      defaultPageSize={50}
                      filterable
                      noDataText="No rows found"
                      loading={this.props.isLoading}
                    />
                  </div>
                </Col>
              </div>
            </Row>
          </ReactCSSTransitionGroup>
        </Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.goBack}
          className={`${this.props.className} item_error_popup-width`}
        >
          <ModalHeader toggle={this.goBack}>
                    <h5 className="mb-0">{language.reportedInformation}</h5>
          </ModalHeader>
          <ModalBody className="">
            <div>
              <div className="scroller">
                {this.state.itemsList != "" || [] || null
                  ? this.state.itemsList.map((item, index) => {
                    return (
                      <div className="border-bottom p-2" key={index}>
                        <Row>
                          <Col md="6" className="">
                            <div>
                              <h6 className="error-title-name">
                                {item.item_error_title}
                              </h6>
                              <p className="error-description admin-list-word-wrap">
                                {item.item_error_description}
                              </p>
                            </div>
                          </Col>

                          <Col md="6">
                            <Row>
                              <Col md="6" className="text-center mt-3">
                                <h6 className="pr-2 error-item-category admin-list-word-wrap">
                                  {item.user_first_name}
                                </h6>
                              </Col>
                              <Col md="6">
                                <Row>
                                  <Col md="6" className="mt-2">
                                    <select
                                      className="item-error-select-status"
                                      aria-label="role"
                                      onChange={event =>
                                        this.updateStatus(
                                          item,
                                          event.target.value,
                                          index
                                        )
                                      }
                                      value={this.state.statusValue[index]}
                                    >
                                    <option value="y">{language.open}</option>
                                    <option value="n">{language.fixed}</option>
                                    <option value="d">{language.deleted}</option>
                                    </select>
                                  </Col>
                                  <Col md="6" className="mt-2 text-right">
                                    <button
                                      aria-label="delete"
                                      className=" btn btn-outline-primary fs-icon"
                                      onClick={this.deleteUser.bind(
                                        this,
                                        item,
                                        index
                                      )}
                                      disabled={
                                        this.state.adminSession.user_role === "2" ||
                                          this.state.adminSession.user_role === "3"
                                          ? true
                                          : false
                                      }
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    );
                  })
                  : []}
              </div>

              <div className="row">
                <div className="col-md-12 mt-3 pt-3">
                  <div className="form-group text-right">
                    <span className="msedge-questions-start msedge-right-br">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={this.goBack}
                      >
                        <li>
                          <i className="pe-7s-back" aria-hidden="true"></i>
                        </li>
                <li className="text-uppercase">{language.back}</li>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listData: state.main.data,
    isLoading: state.main.isDataAdding
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getData,
      currentState
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(itemError);
