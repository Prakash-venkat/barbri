// import React, { Component } from 'react'
// import Slider from "react-slick";
// import axios from 'axios'
// import './login.scss'


// export class Settings extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password:''
//         };
//       }

//       handleUserName=(event) =>{
//         this.setState({username: event.target.value});
//       }

//       handlePassword=(event) =>{
//         this.setState({password: event.target.value});
//       }

//       handleSubmit=(event)=> {
//         event.preventDefault();

//         if(this.state.username === "admin@barbri.com" && this.state.password === "password"){
//             this.props.history.push('/admin')
//         }
//         else if(this.state.username === "students@barbri.com" && this.state.password === "password"){
//                     this.props.history.push('/students')
//         }
//         else if(this.state.username === "lawschool@barbri.com" && this.state.password === "password"){
//                     this.props.history.push('/law-school')
//         }
//         else{
//         alert("Plese Enter Correct Username and Password")
//         }

//     //         var name = this.state.username;
//     // var password= this.state.password;

//     // axios.post('http://barbri.thinrootsoftware.com/barbriapi/users.php', {
//     //     user_email: name,
//     //     user_password:password,
//     // })       



//     //     // fetch('http://barbri.thinrootsoftware.com/barbriapi/login.php',{
//     //     //     method: 'post',
//     //     //     body: JSON.stringify({
//     //     //             "user_email": name,
//     //     //             "user_password": password  
//     //     //     }),
//     //     // })
//     //     .then(response => {
//     //         console.log("response here",response)
//     //         // this.props.history.push('/admin')
//     //         // if (res) {
//     //         //   if (res.data === 1) {
//     //         //         console.log("Admin Loggedin")
//     //         //   } else if (res.data === 2) {
//     //         //         console.log("Student Loggedin")
//     //         //   }else if (res.data === 3) {
//     //         //         console.log("LawSchool Loggedin")
//     //         //   } else {
//     //         //         console.log("Error! Please Check the Credentials")
//     //         //   }
//     //         // }
//     //       })
//     //       .catch(err => {
//     //         console.log(err, 'from Login')
//     //       })
//       }

//     render() {
//         const settings = {
//             dots: false,
//             infinite: true,
//             speed: 500,
//             slidesToShow: 1,
//             slidesToScroll: 1
//           };
//         return (
//             <div className="container-fluid login">
//                 <div className="row">
//                     <div className="col-lg-6 left-section h-100">
//                         <div className="col-lg-12 no-padding">
//                             <Slider {...settings}>
//                                 <div className="col-lg-12 block-wrapper">
//                                     <h4>Lorem Ipsum passage</h4>
//                                     <div>Lorem ipsum dolor sit amet, 
//                                         consectetur adipiscing elit. Proin arcu ex, fringilla lacinia 
//                                         condimentum vitae, iaculis nec quam
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-12 block-wrapper">
//                                     <h4>Lorem Ipsum passage</h4>
//                                     <div>Lorem ipsum dolor sit amet, 
//                                         consectetur adipiscing elit. Proin arcu ex, fringilla lacinia 
//                                         condimentum vitae, iaculis nec quam
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-12 block-wrapper">
//                                     <h4>Lorem Ipsum passage</h4>
//                                     <div>Lorem ipsum dolor sit amet, 
//                                         consectetur adipiscing elit. Proin arcu ex, fringilla lacinia 
//                                         condimentum vitae, iaculis nec quam
//                                     </div>
//                                 </div>
//                             </Slider>
//                         </div>
//                         {/* <button className="left-arrow"><i class="pe-7s-angle-left"> </i></button>
//                         <button className="right-arrow"><i class="pe-7s-angle-right"> </i></button> */}
//                     </div>
//                     <div className="col-lg-6 right-section">
//                         <div className="col-lg-12 img-wrapper">
//                             <img alt="Barbri logo" src="/d531a4eb6c1bd37f3e8137b1380d3151.png"/>
//                         </div>

//                         <form onSubmit={this.handleSubmit}>

//                         <div className="col-lg-12 welcome">
//                             <h3>Welcome!</h3>
//                         </div>
//                         <div className="col-lg-12 msg">
//                             <h6>Please sign in into your account.</h6>
//                         </div>
//                         <div className="input-field-wrapper">      
//                             <div className="col-lg-6 form-group">
//                                 <label for="email">Email</label>
//                                 <input type="email" id="email" name="Email" className="form-control" placeholder="Email here..." value={this.state.username} onChange={this.handleUserName}/>
//                             </div>
//                             <div className="col-lg-6 form-group">
//                                 <label for="email">Password</label>
//                                 <input type="password" id="password" name="Email" className="form-control" placeholder="Password here..." value={this.state.password} onChange={this.handlePassword}/>
//                             </div>
//                         </div>
//                         {/* <div className="col-lg-12">
//                             <input type="checkbox" id="keepMeLoggedIn" name="KeepMeLoggedIn"/>
//                             <label for="keepMeLoggedIn">Keep me logged in</label>
//                         </div> */}
//                         <div className="btn-wrapper">
//                             <div className="col-lg-6 signUp">No account? <a href="">Sign up now</a></div>
//                             <div className="col-lg-6 login-btn row">
//                                 <div className="col-lg-6"><button type="submit" className="btn btn-primary">Login</button></div>
//                                 <div className="col-lg-6"><a href="">Recover Password</a></div>
//                             </div>
//                         </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Settings



import React, { Component } from 'react'
import Slider from "react-slick";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { CardBody, Col, Row } from 'reactstrap';
import axios from 'axios'
import './login.scss'


export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      invalidEmail: ''

    };
  }

  handleInputChange = (event) => {
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="container-fluid login">
        <div className="row">
          <div className="col-lg-6 left-section h-100">
            <div className="col-lg-12 no-padding">
              <Slider {...settings}>
                <div className="col-lg-12 block-wrapper">
                  <h4>Lorem Ipsum passage</h4>
                  <div><h3>"Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.</h3>
                  </div>
                </div>
                <div className="col-lg-12 block-wrapper">
                  <h4>Lorem Ipsum passage</h4>
                  <div><h3>"Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.</h3>
                  </div>
                </div>
                <div className="col-lg-12 block-wrapper">
                  <h4>Lorem Ipsum passage</h4>
                  <div><h3>"Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.</h3>
                  </div>
                </div>
              </Slider>
            </div>
          </div>

          <div className="col-lg-6 right-section">
            <div className="row">
              <div className="col-lg-12 img-wrapper pt-3">
                <img alt="Barbri logo" src="/d531a4eb6c1bd37f3e8137b1380d3151.png" />
              </div>

              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                  password: Yup.string()
                    .required('Password is required'),
                })}
                onSubmit={fields => {
                  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                  const user = {
                    email: fields.email,
                    password: fields.password
                  }
                  console.log(user)


                  fetch('http://barbri.thinrootsoftware.com/barbriapi/login.php', {
                    method: 'post',
                    body: JSON.stringify({
                      "user_email": user.email,
                      "user_password": user.password
                    }),
                  })

                    .then(response => response.json())
                    .then(response => {
                      console.log("response here", response)
                      if (response.status === 1) {
                        if (response.user_role === "controller") {
                          console.log("Admin loggedin")
                          if(this.state.checked){
                            localStorage.setItem("userDetails-Admin", response.user_role)
                            this.props.history.push('/admin')
                          }
                          else{
                            sessionStorage.setItem("userDetails-Admin", response.user_role)
                            this.props.history.push('/admin')
                          }
                        }
                        else if (response.user_role === "operator") {
                          console.log("LawSchool Loggedin")
                          localStorage.setItem("userDetails-LawSchool", response.user_role)
                          this.props.history.push('/law-school')
                        } else if (response.user_role === "viewer") {
                          console.log("Students Loggedin")
                          localStorage.setItem("userDetails-Students", response.user_role)
                          this.props.history.push('/students')
                        }
                      }

                      else {
                        console.log("Error! Please Check the Credentials")
                        this.setState({ invalidEmail: <h6 className="invalid-email">Please Enter the valid Credentials!</h6> })
                      }
                    })
                    .catch(err => {
                      console.log(err, 'from Login')
                    })

                }}



                render={({ errors, status, touched }) => (

                  <Col md="12 login-form-main">
                    <CardBody>
                      <Row className="welcome-segment">
                        <Col md="12">
                          <h1 className="pb-4 welcome-text">Welcome!</h1>
                        </Col>
                        <Col md="12">
                          <h6 className="signin-text">Please sign in into your account.</h6>
                        </Col>
                        <Col md="12">
                          {this.state.invalidEmail}
                        </Col>
                      </Row>

                      <Form className="pt-3">
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <Field name="email" type="text" placeholder="Email here..." className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                          </Col>

                          <Col>
                            <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <Field name="password" type="password" placeholder="Password here..." className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                              <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="12 logged-in">
                            {/* <input type="checkbox"/>Keep me logged in */}
                            <label>
                              <input
                                name="isGoing"
                                type="checkbox"
                                checked={this.state.checked}
                                onChange={this.handleInputChange} />
                              Keep me logged in
                                    </label>
                          </Col>


                          <Col md="12" className="btn-segment">
                            <Row>
                              <Col md="7" className="pt-4 no-account">No account? <Link to={`/`}>Sign up now</Link></Col>
                              <Col md="5" className="pt-3">
                                <Row>
                                  <Col md="12" className="text-right"><button type="submit" className="btn btn-primary login-btn">Login</button></Col>
                                  <Col md="12 pt-3 text-right" className="recover-link-text"><Link to={`/`}>Recover Password</Link></Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                      </Form>
                    </CardBody>
                  </Col>

                )}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings