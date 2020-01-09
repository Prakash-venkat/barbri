import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Col, Row ,Modal,ModalBody,ModalHeader } from "reactstrap";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import SortIcon from "../../../../components/admin/sortIcon";
import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import FilterInputComponent from "../../../../components/admin/FilterInputComponent";
import {
  getData,
  deleteData,
  updateData,
  currentState,
  redirectPath
} from "../../../../actions/actionMain";
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import { getSession } from "../../../routes/routePaths";
import { instance } from '../../../../actions/constants';
import {language} from '../../../../utils/locale/locale';
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';


class ItemTagList extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      filteredData: [],
      data: [],
      isLoading: true,
      rowdata:[],
      modal:false,
      studentLog:[],
      selectedAuditUser:"",

    };
  }

  componentDidMount() {
    customPageTitle('Audit Log')
    let getSessionData = this.state.adminSession
    let userRole = getSessionData.user_role;
    this.setState({ userRole: userRole ,  });
    this.props.currentState("admin/auditlog");
    // this.props.getData();
    this.fetchData();

  }

  componentWillReceiveProps({ listData }) {

    var datalist = listData == null || listData == undefined ? [] : listData;
    this.setState({
      data: datalist,
      filteredData: datalist
    });
  }

  detailReports = (index, rowdata) => {
    this.setState({
      rowdata:rowdata
    })
    
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  fetchData = () => {
    instance.get(`admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .then(res => {
            let result = res.data.data === null ? [] : res.data.data.map((value, index) => {
                return (
                    { value: value.userPrimaryEmail, label: value.userPrimaryEmail}
                )
            })
            this.setState({ studentLog: result, selectedAuditUser: result[0]},()=>this.fetchAuditData(result[0].value));
        })
    };

    fetchAuditData = (email) => {
      const params = new URLSearchParams();
      params.append('email', email);
  
      const body = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: params,
        url : `/admin/logs/audit`
      }
      this.setState({isLoading: true})
  
      instance(body)
        .then(res => {
            this.setState({
              isLoading: false,
              filteredData: res.data.data,
              data:res.data.data
            });
        })
        .catch(err => {
          this.setState({isLoading: false})
          console.log(err)
        })
    }

  auditStudent = (selectedValue) => {
    this.setState({
      selectedAuditUser: selectedValue
    },()=>this.fetchAuditData(selectedValue.value));
   
  }

  goBack = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      rowdata: []
    }));
  };
  
    
  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList="Date / Time" sort={true} />,
          accessor: "auditLogCreatedDate",
          width: 200,
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList="Screen / Path" sort={true} />,
          accessor: "auditLogRequestURL",
          width:250,
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: (
            <SortIcon dataList="Error Code" sort={true} />
          ),
          accessor: "auditLogResponseCode",
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          width: 140,
          Cell: row => (
            <div className="msedge-table-content-right-align">
              {row.value}
            </div>
          )
        },
        {
          Header: (
            <SortIcon dataList="Username" sort={true} />
          ),
          accessor: "auditLogUserPrimaryEmail",
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          width: 220,
          Cell: row => (
            <div className="msedge-table-content-right-align">
              {row.value}
            </div>
          )
        },
        {
          Header: (
            <SortIcon dataList="Type" sort={true} />
          ),
          accessor: "auditLogRequestType",
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-right-align">
              {row.value}
            </div>
          )
        },
        {
          Header: "Action",
          filterable: false,
          sortable: false,
          Cell: row => (
            <div className="text-center">
              <button
                data-tip
                data-for="view"

                className="ml-3 btn btn-outline-primary fs-icon"
                onClick={() => this.detailReports(row.index, row.original)}
              >
                <i className="lnr-book" ></i>
              </button>
              <ReactTooltip className="customeTheme" id='view' type='info' effect='solid'>
          <span>View</span>
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
 
  render() {
    return (
      <div className="msedge-audit-log">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div className="container-fluid mt-2">
              <Row>
                <Col xs="12" sm="12" md="4" lg="4" xl="4">
                  <h1 className="msedge-overview-text" tabIndex="-1">
                    Audit Log
                  </h1>
                </Col>
                <Col
                  xs="12"
                  sm="12"
                  md="4"
                  lg="4"
                  xl="4"
                  className="msedge-bank-listbtns"
                >
                  <Row className="pull-right">
                    <Col xs="12" sm="12" md="6" lg="11" xl="11" className="pr-0">
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
                  </Row>
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" className="pl-2">
                      <Select
                        aria-label=""
                        className="rect-select-useraudit"
                        onChange={this.auditStudent}
                        value={this.state.selectedAuditUser}
                        options={this.state.studentLog}
                      />
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
                        this.state.filteredData === null ||
                          this.state.filteredData === []
                          ? []
                          : this.state.filteredData
                      }
                      columns={this.columns}
                      defaultPageSize={50}
                      filterable
                      minRows={2}
                      defaultFilterMethod={filterCaseInsensitive}
                      noDataText={"No rows found"}
                      loading={this.state.isLoading}
                    />
                  </div>
                </Col>
              </div>
            </Row>

            <Modal
          isOpen={this.state.modal}
          toggle={this.goBack}
          className={`${this.props.className} item_error_popup-width`}
        >
          <ModalHeader toggle={this.goBack}>
                    <h5 className="mb-0">Description</h5>
          </ModalHeader>
          <ModalBody className="">
            <div>
              <div className="scroller">
               <Row>
                 <Col md="6">
                   <h5 className="text-left">Request body</h5>
                    <p className="request-body" style={{wordBreak:"break-word"}}>{this.state.rowdata.auditLogRequestBody}</p>
                 </Col>
                 <Col md="6">
                 <h5 className="text-left">Response body</h5>
                 <p className="response-body" style={{wordBreak:"break-word"}}>{this.state.rowdata.auditLogResponseBody}</p>
                 </Col>
               </Row>
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
                <li className="text-uppercase">Back</li>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>


          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listData: state.main.data,
    isLoading: state.main.load
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getData,
      deleteData,
      updateData,
      currentState,
      redirectPath
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemTagList);
