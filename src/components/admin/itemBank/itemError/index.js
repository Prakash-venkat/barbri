//Authorization:
//Designed : by Usha M
//Purpose: Created for listing item errors
//Description: Table for displaying data Item errors
import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Button, Col, Row } from "reactstrap";
import ReactTable from "react-table";
import Loader from 'react-loaders'


export default class DataTableCustomComps extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading:true
    };
  }

  fetchData = () => {
    fetch("http://barbri.thinrootsoftware.com/barbriapi/item_error.php")
      .then(response => response.json())
      .then(response => this.setState({ data: response }));
  }
  componentDidMount() {
    this.fetchData();
    setTimeout(() => {
      this.setState({loading:false})
  }, 1000);
  }

  columns = [
    {
      columns: [
        {
          Header: () => (
            <div>
              <span>Item Title </span>
              <i class="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "item_error_title",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: () => (
            <div>
              <span>Error Title </span>
              <i class="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "item_error_errortitle",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: () => (
            <div>
              <span>Item Category </span>
              <i class="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "item_error_category",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: "Item Description",
          accessor: "item_error_desc",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: () => (
            <div>
              <span>Status </span>

            </div>
          ),
          sortable: false,
          accessor: "item_error_status",
          id: "item_error_status",
          Cell: ({ value }) => (value >= 'A' ? "Active" : "Inactive"),
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "A") {
              return row[filter.id] === "A";
            }
            else {
              return row[filter.id] === "I";
            }

          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="A">Active</option>
              <option value="I">InActive</option>
            </select>
          )
        },
        {
          Header: () => (
            <div>
              <span>Reported Date </span>
              <i class="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "item_error_reported_date.date",
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>{row.value.split(" ")[0]}</div>
          )
        },
        {
          Header: "Action",

          Cell: () => (
            <div className="">
              <select className='form-control'
                style={{ width: "100%" }}
              >
                <option value="true">Error Fixed</option>
                <option value="false">Unfixed</option>
              </select>
            </div>
          )
        }
      ]
    }
  ];
  render() {
    const { data } = this.state;
    return (
      <Fragment>
                    <div>
            {this.state.loading ?           
            <div className="loader-custom">
            <div className="loader-container-inner">
                <div className="text-center">
                    <Loader type="line-scale-pulse-out-rapid"/>
                    <h6 className="mt-2">
                    Please Wait... Fetching Information
                </h6>
                </div>
            </div>
        </div>
        
            :
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Row>
            <Col xs="12" sm="12" md="7" lg="7" xl="7">
              <h5 className="text-primary"> Item Error List</h5>
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
            ></Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="main-card mb-3">
                <ReactTable
                  className="bg-white"
                  data={data}
                  columns={this.columns}
                  minRows={0}
                  defaultPageSize={5}
                  filterable
                />
              </div>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
            }
            </div>
      </Fragment>
    );
  }
}
