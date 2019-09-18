//Authorization:prakash
//Designed:Muthuraja r.
//purpose:created for adding student list user table.
//description: To create the list user table and view the admin only. Admin see all the students list. admin edit and delete the student list.

import React, { Fragment } from "react";

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';


import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Button, Modal, ModalHeader, ModalBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import swal from "sweetalert";
import Loader from 'react-loaders';

import { getService } from '../../../../../utils/Requester';
import { ADMIN_USERS } from '../../../../../constants/requester'
import { adminCurrentState } from '../../../../../actions/action-admin'

const path = ADMIN_USERS ;

class DataTableCustomComps extends React.Component {
  constructor() {
    super();
    this.state = {
      // data: makeData(),
      modal: false,
      status: "Active",
      error: null,
      isLoaded: false,
      loading:true,
      data: []

    };
  }
  columns = [
    {

      columns: [
        {
         
          Header: props => (
            <div>
              <span>Name </span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "user_name",
         
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>
              {row.value}
            </div>
          )
        },
        {
          id:"fullName",
          Header: props => (
            <div>
              <span>User Name </span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: el => el.user_first_name + ' ' + el.user_last_name,
          
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%" }}>
              {row.value}
            </div>
          )
        },
        {
          Header: props => (
            <div>
              <span>Mobile Number </span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor:"user_phone",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>
              {row.value}
            </div>
          )
        },
        {
          Header: props => (
            <div>
              <span>Email </span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "user_primary_email",
       
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>
              {row.value}
            </div>
          )
        },
        {
          Header: props => (
            <div>
              <span>Role </span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "user_role",
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>
              {row.value}
            </div>
          )
        },
        {
          Header: "Status",
          accessor: "user_profile_active",
          sortable: false,
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
          ),
          id: "user_profile_active",
          Cell: ({ value }) => (value === 'y' ? "Active" : "Inactive"),
          filterMethod: (filter, row) => {
              if (filter.value === "all") {
                  return true;
              }
              if (filter.value === "y") {
                  return row[filter.id] === 'y';
              }
              else {
                  return row[filter.id] === 'n';
              }
            
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="y">Active</option>
              <option value="n">InActive</option>
            </select>
          )
        },
        {
          Header: props => (
            <div>
              <span>Last Modification Date</span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "user_last_modified_at",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>
              {row.value}
            </div>
          )
        },
        {
          Header: "Actions",
          accessor: "action",
          filterable: false,
          sortable: false,
          width: 150,
          Cell: row => (
            <div className="text-center">
              <Link
                to={{
                  pathname: "/admin/user-add",
                  query: row
                }}
                className="add-user-btn"
              >
                <Button
                  className="mb-1 ml-3 btn-icon btn-icon-only"
                 // onClick={this.toggle}
                  color="primary"
                >
                  <i className="pe-7s-pen btn-icon-wrapper"> </i>
                </Button>
              </Link>
              <Button
                className="mb-1 ml-3 btn-icon btn-icon-only"
                color="primary"
               onClick={this.deleteUser.bind(this, row)}
              >
                <i className="pe-7s-trash btn-icon-wrapper"> </i>
              </Button>
            </div>
          )
        }
      ]
    }
  ];
  componentWillMount(){
    const {getList, adminCurrentState} = this.props
    adminCurrentState(path);

    getList();
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({loading:false})
  }, 1000);
   
  }
  
  deleteUser = row => {
    try{
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        const code = row.original.user_id
    let url = `http://barbri.thinrootsoftware.com/barbriapi/deleteuser.php?id=${code}`;
    console.log(url);
    fetch(url, { method: "post" }).then(resp => console.log(resp));
        swal("Row deleted successfully!", {
          icon: "success"
        });
        this.fetchData();
      } else {
        swal("Cancelled!");
      }
    }); 
  }
  catch(e)
  {
   // alert('Error thrown from  deleteUser function catch block')
   console.log("Error thrown from try...catch",e , e.message)
  }
  };


  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    const content = row[id];
    if (typeof content !== 'undefined') {
      // filter by text in the table or if it's a object, filter by key
      if (typeof content === 'object' && content !== null && content.key) {
        return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
      } else {
        return String(content).toLowerCase().includes(filter.value.toLowerCase());
      }
    }
    return true;
  };


  render() {
    const { data } = this.state;
    const {list} = this.props;
    const pageSize = data.length < 5 ? data.length : 5
    console.log('state', this.state.data);
    return (
      <div>
      {this.state.loading ?               <div className="loader-custom">
      <div className="loader-container-inner">
          <div className="text-center">
              <Loader type="line-scale-pulse-out-rapid"/>
              <h6 className="mt-2">
              Please Wait... Fetching Information
          </h6>
          </div>               </div>
  </div>
      :
      <div className="user-list">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div />
            <div className="mb-2 heading-section">
              <Row className="page-title">
                <Col xs="12" sm="12" md="7" lg="7" xl="7">
                  <h5 className="text-primary"> Users List</h5>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
                    <Link to="/admin/user-add">
                      <button
                        type="submit"
                        className="btn btn-outline-primary pr-5 pl-5 mr-2"
                      >
                        Add
                      </button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>

            <Row>
              <Col md="12">
                <div className="main-card mb-3">
                  <div>
                    <ReactTable
                      className="bg-white"
                      data={list}
                      columns={this.columns}
                      minRows={0}
                      defaultPageSize={5}
                      filterable
                      defaultFilterMethod={this.filterCaseInsensitive}
                      // defaultFilterMethod={(filter, row) =>
                      //   String(row[filter.id]) === filter.value
                      // }
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
      }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  list : state.RequestReducer.list
}
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getList : getService,
  adminCurrentState : adminCurrentState,

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableCustomComps );
