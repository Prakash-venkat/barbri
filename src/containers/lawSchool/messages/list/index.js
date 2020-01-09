import React, { Fragment, Component } from "react";
import moment from "moment";
import Switch from "react-switch";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import {
  getData,
  currentState,
  updateData,
  deleteData
} from "../../../../actions/actionMain";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../../../layout/AppMain/PageTitle";
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import { dataList } from "../../../../components/admin/dataList";
import SortIcon from "../../../../components/admin/sortIcon";
import FilterInputComponent from "../../../../components/admin/FilterInputComponent";
import Loading from "../../../../components/admin/loading";
import {customPageTitle} from "../../../../components/commonComponents/customPageTitle";
import {instance} from "../../../../actions/constants";
import {language} from "../../../../utils/locale/locale"

class ListMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filteredData: [],
      modal1: false,
      messageContents: "",
      messagetitle: "",
      loading: true
    };
  }

  messagetoggle = row => {
    this.setState(prevState => ({
      modal1: !prevState.modal
    }));
    this.setState({
      messageContents: row.original.messageContents,
      messagetitle: row.original.messageTitle
    });
  };

  modelclose = () => {
    this.setState(prevState => ({
      modal1: !prevState.modal1
    }));
  };

  componentWillReceiveProps({ listData }) {
    this.setState({
      data: listData,
      filteredData: listData
    });
  }

  componentDidMount() {
    this.props.currentState("lawschool/messages");
    this.props.getData();
    customPageTitle("Messages")
  }

  updateStatus = (row, e) => {
    var publishDate = null;
    if (row.messageStatus === "n") {
      let date = Date.now();
      publishDate = moment(date).format("MM-DD-YYYY");
    } else {
      publishDate = row.messagePublishedAt;
    }
    const body = JSON.stringify({
      messageTitle: row.messageTitle,
      messageOrganisation: row.messageOrganisation,
      messageContents: row.messageContents,
      messagePublishedTo: row.messagePublishedTo,
      messageStatus: row.messageStatus === "y" ? "n" : "y",
      messageCreatedBy: row.messageCreatedBy,
      messageCreatedAt: row.messageCreatedAt,
      messagePublishedBy: row.messagePublishedBy,
      messagePublishedAt: publishDate,
      messageArchive: row.messageArchive,
      messageRead: row.messageRead,
      messageType: 2
    });

    instance.put(`messages/${row.messageId}`, body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(response => {
        return response;
      })
      .then(response => {
        this.props.getData();
        if (response.data.status == 'Success' || response.data === true) {
          swal(language.updated, language.updatedMsg, "success");
        } else if (response.data.status === 'Failure' || response.data === false) {
          swal(language.oops, `${response.data.errorMessage}`, "error");
        }
      })

      .catch(error => {
        swal(language.oops, `${response.data.errorMessage}`, "error");
      });

  };

  deleteMessage = row => {
    const code = row.original.messageId;
    this.props.deleteData(`messages/${code}`);
  };

  columns = [
    {
      columns: [
        {
          Header: (
            <SortIcon dataList={dataList.date} sort={true} number={true} />
          ),
          Filter: props => (
            <FilterInputComponent aria_label="message created" {...props} />
          ),
          accessor: "messageCreatedAt",
          Cell: row => (
            <div className="msedge-table-content-right-align">
              <span> {row.value}</span>
            </div>
          )
        },
        {
          Header: <SortIcon dataList={dataList.message} sort={true} />,
          Filter: props => (
            <FilterInputComponent aria_label="message" {...props} />
          ),
          width: 500,
          id: "message",
          accessor: el => el.messageTitle + "  " + el.messageContents,
          Cell: row => {
            return (
              <div
                className="msedge-table-content-left-align"
                onClick={this.messagetoggle.bind(this, row)}
                style={{ cursor: "pointer" }}
              >
                <p>
                  <strong>{row.original.messageTitle}</strong>
                </p>
                <div>
                  <p>
                    {(row.original.messageContents || "").length > 100
                      ? (row.original.messageContents || "").substring(0, 100) +
                        "..."
                      : row.original.messageContents}
                  </p>
                </div>
              </div>
            );
          }
        },

        {
          Header: <SortIcon dataList={dataList.law_msg_publish} sort={false} />,
          accessor: "messageStatus",
          sortable: false,
          id: "messageStatus",
          Cell: row => {
            return (
              <div className="msedge-table-content-center-align">
                {row.value === "d" ? (
                  <div>
                    <h3 className="mb-0 delete-icon">X</h3>
                  </div>
                ) : (
                  <Switch
                    checked={row.value === "y" ? true : false}
                    onChange={() => this.updateStatus(row.original)}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={23}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={42}
                    aria-label="processed"
                    onHandleColor="#006EBD"
                    tabindex="0"
                  />
                )}
              </div>
            );
          },
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "y") {
              return row[filter.id] === "y";
            } else if (filter.value === "n") {
              return row[filter.id] === "n";
            } else {
              return row[filter.id] === "d";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="message published"
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">{dataList.show_all}</option>
              <option value="y">{dataList.published}</option>
              <option value="n">{dataList.draft}</option>
              <option value="d">{dataList.deleted}</option>
            </select>
          )
        },
        {
          Header: <SortIcon dataList={dataList.action} sort={false} />,
          filterable: false,
          sortable: false,
          width: 150,
          Cell: row => (
            <div className="msedge-table-content-center-align">
              <ReactTooltip
                className="customeTheme"
                id="delete_button"
                type="info"
                effect="solid"
              >
                <span>Delete</span>
              </ReactTooltip>
              <ReactTooltip
                className="customeTheme"
                id="edit_button"
                type="info"
                effect="solid"
              >
                <span>Edit</span>
              </ReactTooltip>
              <Link
                aria-label="link to edit"
                to={{
                  pathname: "/law-school/add-message",
                  query: row.original
                }}
                className="add-user-btn"
                id="edit"
              >
                <button
                  data-tip
                  data-for="edit_button"
                  className="btn btn-outline-primary fs-icon"
                  aria-label="user edit"
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </Link>

              <button
                data-tip
                data-for="delete_button"
                className="ml-3 btn btn-outline-primary fs-icon"
                onClick={() => this.deleteMessage(row)}
                aria-label="delete"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          )
        }
      ]
    }
  ];

  handleChange = event => {
    const query = event.target.value;
    this.setState({ query: event.target.value });
    this.setState(prevState => {
      const filteredData = this.state.data.filter(element => {
        return (
          (element.messageCreatedAt &&
            element.messageCreatedAt
              .toLowerCase()
              .includes(query.toLowerCase())) ||
          (element.messageTitle &&
            element.messageTitle.toLowerCase().includes(query.toLowerCase())) ||
          (element.messageContents &&
            element.messageContents.toLowerCase().includes(query.toString()))
        );
      });

      return {
        query,
        filteredData
      };
    });
  };

  render() {
    return (
      <div>
          <div className="msedge-lawschool-listmessage">
            <PageTitle
              heading="Messages"
              subheading="Compose a message to send to students at your law school. Click COMPOSE to begin and PUBLISH to send."
              brdcrumptwo="Inbox"
              brdcrumpthree="List messages"
              brdcrumptwolink="/law-school/messages"
              linkToHome="/law-school"
            />
            <Fragment>
              <Row>
                <div className="container-fluid bg-grey ptb-30">
                  <div className="mt-2 container-fluid">
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6"></Col>
                      <Col
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="6"
                        className="msedge-bank-listbtns"
                      >
                        <Row className="pull-right">
                          <Col
                            xs="12"
                            sm="12"
                            md="6"
                            lg="7"
                            xl="7"
                            className="pr-0"
                          >
                            <input
                              type="search"
                              className="form-control"
                              placeholder="Search..."
                              onChange={this.handleChange}
                              aria-label="Search Item Code"
                            />
                          </Col>
                          <Col
                            xs="12"
                            sm="12"
                            md="6"
                            lg="5"
                            xl="5"
                            className="pl-2"
                          >
                            <div className="form-group">
                              <span className="msedge-questions-start msedge-right-br msedge-student-list-btn">
                                <Link to="/law-school/add-message">
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary d-flex"
                                  >
                                    <li>
                                      <i
                                        class="pe-7s-plus"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                    <li className="text-uppercase">
                                      {dataList.law_compose}
                                    </li>
                                  </button>
                                </Link>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>

                  <Col md="12">
                    <div className="messages-table">
                      <ReactTable
                        className="bg-white"
                        data={
                          this.state.filteredData === null ||
                          this.state.filteredData === ""
                            ? []
                            : this.state.filteredData
                        }
                        columns={this.columns}
                        minRows={2}
                        defaultPageSize={10}
                        filterable
                        defaultFilterMethod={filterCaseInsensitive}
                        noDataText="No rows found"
                        loading={this.props.loading}
                      />
                    </div>
                  </Col>
                </div>
              </Row>
            </Fragment>

            <div classname="modal two">
              <Modal
                isOpen={this.state.modal1}
                className="messages-modal modal-center"
              >
                <ModalHeader>
                  <h5 className="text-primary mb-0">
                    {this.state.messagetitle}
                  </h5>
                </ModalHeader>
                <ModalBody className="pt-4 pb-4 msedge-message-modal">
                  <Row>
                    <Col md="12">
                      <p className="mb-0 msedge-no-of-questions-answered">
                        {this.state.messageContents}
                      </p>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <div className="pull-right msedge-close-btn">
                    <button
                      className="btn btn-outline-primary mr-2"
                      onClick={this.modelclose}
                    >
                      <li>
                        <i class="pe-7s-close" data-for="close"></i>
                      </li>
                      <li className="text-uppercase">Close</li>
                    </button>
                  </div>
                </ModalFooter>
              </Modal>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listData: state.main.data,
    loading: state.main.load
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getData,
      currentState,
      updateData,
      deleteData
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ListMessages);
