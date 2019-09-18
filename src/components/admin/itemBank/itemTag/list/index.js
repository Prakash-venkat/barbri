//Authorization:
//Designed : by Usha M
//Purpose : created for Item tag list
//Description: Table for displaying data Item tags
import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Button, Col, Row } from "reactstrap";
import '../../../../../assets/custom/admin/_admin_item_bank.scss'
import ReactTable from "react-table";
//import { makeData } from "./components/utils"; //dummy data taken from utils.js
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Loader from 'react-loaders'

export default class DataTableCustomComps extends React.Component {
  constructor() {
    super();
    this.state = {
      // data: makeData()
      data: [],
      loading: true
    };
  }
  componentDidMount() {
    this.fetchData();
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
  }
  fetchData() {
    try {
      fetch("http://barbri.thinrootsoftware.com/barbriapi/item_tag.php")
        .then(response => response.json())
        .then(data => this.setState({ data }));
    }
    catch (e) {
      console.log("error found in admin item tags list data")
    }
  }

  deleteUser = row => {
    try {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this !",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          const code = row.original.item_tag_code
          let url = `http://barbri.thinrootsoftware.com/barbriapi/delete_item_tag.php?id=${code}`;
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
    catch (e) {
      console.log("error found in admin item tags delete")
    }
  }
  columns = [
    {
      columns: [
        {
          Header: () => (
            <div>
              <span>Tag Code </span>
              <i class="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "item_tag_code",
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
          )
        },

        {
          Header: () => (
            <div>
              <span>Tag Name </span>
              <i class="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "item_tag_name",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: () => (
            <div>
              <span>Tag Category</span>
              <i class="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "item_tag_category",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: () => (
            <div>
              <span>Status</span>
              {/* <i class="lnr-sort-alpha-asc" /> */}
            </div>
          ),
          sortable: false,
          accessor: "item_tag_status",
          id: "item_tag_status",
          Cell: ({ value }) =>
            value == "y"
              ? "Active"
              : value == "n"
                ? "InActive"
                : "Deleted",
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "y") {
              return row[filter.id] === 'y';
            }
            if (filter.value === "n") {
              return row[filter.id] === 'n';
            }
            if (filter.value === "d") {
              return row[filter.id] === 'd';
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
              <option value="d">Deleted</option>
            </select>
          )
        },
        {
          Header: () => (
            <div>
              <span> Last Modified Date </span>
              <i class="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "item_tag_created_date.date",
          filterable: false,
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>  {row.value.split(" ")[0].split("-")[1]}-{row.value.split(" ")[0].split("-")[2]}-{row.value.split(" ")[0].split("-")[0]}</div>
          )
        },
        {
          Header: "Action",
          filterable: false,
          sortable: false,
          Cell: row => (
            <div className="">
              <Link
                to={{
                  pathname: "/admin/item-tag-add",
                  query: row
                }}

              >
                <Button
                  className="mb-1 ml-3 btn-icon btn-icon-only"
                  color="primary"
                // onClick={this.getTrProps}
                >
                  <i className="pe-7s-pen btn-icon-wrapper "> </i>
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

  render() {
    const { data } = this.state;
    console.log(this.state.data);

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
          <Fragment>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div className="mb-2 heading-section">
                <Row className="w-100">
                  <Col xs="12" sm="12" md="7" lg="7" xl="7">
                    <h5 className="text-primary"> Item Tag List</h5>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                  </Col>
                  <Col xs="12" sm="12" md="5" lg="5" xl="5" className="text-right">
                    <div className="form-group">
                      <Link to="/admin/item-tag-add">
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
                    <ReactTable
                      className="bg-white"
                      data={data}
                      columns={this.columns}
                      defaultPageSize={5}
                      filterable
                      minRows={0}
                    />
                  </div>
                </Col>
              </Row>
            </ReactCSSTransitionGroup>
          </Fragment>
        }
      </div>
    );
  }
}
