import React, { Component, Fragment } from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";

import PerfectScrollbar from "react-perfect-scrollbar";

class TimelineEx extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch("http://barbri.thinrootsoftware.com/barbriapi/notification.php")
      .then(response => response.json())
      .then(data => this.setState({ notifications: data }));
  };
  render() {
    console.log(this.state.notifications);
    return (
      <Fragment>
        <div className="scroll-area-sm">
          <PerfectScrollbar>
            <div className="p-3">
              <VerticalTimeline
                className="vertical-time-simple vertical-without-time"
                layout="1-column"
              >
                {this.state.notifications.map(n => (
                  <VerticalTimelineElement className="vertical-timeline-item">
                    <p>
                      {n.notification_message.split(".")[0]} on
                      <b className="text-warning">
                        {" "}
                        {n.notification_created_date.date.split(" ")[0]}
                      </b>
                    </p>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </div>
          </PerfectScrollbar>
        </div>
      </Fragment>
    );
  }
}

export default TimelineEx;
