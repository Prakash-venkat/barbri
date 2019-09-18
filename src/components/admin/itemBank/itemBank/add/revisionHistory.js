import React, { Component } from 'react'
import {
   Button,
   Card,
   CardBody,
   CardHeader,
   Collapse,
   Tooltip
} from "reactstrap";
const data = [{ name: 'steve john', content: ' deleted tag practice test 4', months: '2 months ago' },
{ name: 'steve john', content: ' modified multiple  choice', months: '2 months ago' },
{ name: 'smith', content: ' modified multiple  choice', months: '2 months ago' },
{ name: 'paul', content: ' published this item', months: '2 months ago' },
]
export class RevisionHistory extends Component {
   constructor(props) {
       super(props);
       this.state = {
           accordion: [true],
       };
       this.toggleAccordion = this.toggleAccordion.bind(this);
   }
   toggleAccordion(tab) {
       const prevState = this.state.accordion;
       const state = prevState.map((x, index) => (tab === index ? !x : false));
       this.setState({
           accordion: state
       });
   }
   render() {
       return (
           <div className="itembank-revisionhistory">
               <div className='mt-4 p-3'>
                   <div id="accordion" className="accordion-wrapper   mb-3">
                       <Card className=''>
                           <CardHeader id="headingOne">
                               <Button
                                   block
                                   color="link"
                                   className="text-left m-0 p-0"
                                   onClick={() => this.toggleAccordion(0)}
                                   aria-expanded={this.state.accordion[0]}
                                   aria-controls="collapseOne"
                               >
                                   <div className="revisionhistory-heading">
                                       <h5 className="text-primary d-inline">History</h5>
                                       <i className="d-inline pe-7s-angle-down down-arrow text-muted float-right revisionhistory-heading-icon "> </i>
                                   </div>
                               </Button>
                           </CardHeader>
                           <Collapse
                               isOpen={this.state.accordion[0]}
                               data-parent="#accordion"
                               id="collapseOne"
                               aria-labelledby="headingOne"
                           >
                               <div className="row">
                                   <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                       {
                                           data.map((data, index) =>
                                               <div className="border-bottom revision-history-border">
                                                   <h6 className="mb-0 ">
                                                       <span className="font-weight-bold">{data.name}</span>
                                                       <span className="font-weight-light">{data.content}</span>
                                                   </h6>
                                                   <span className="font-weight-light">{data.months}</span>
                                               </div>
                                           )}
                                   </div>
                               </div>
                           </Collapse>
                       </Card>
                   </div>
               </div>
           </div>
       )
   }
}
export default RevisionHistory