import React from 'react'
import { Formik } from "formik";
import { Auth } from 'aws-amplify'
import './Global.css'
import { yupActivationSchema } from "../utils/constants/yupAuthSchema";
import { useHistory } from "react-router-dom";
import { alert } from 'react-bootstrap-confirmation';
import FixedTransparentNavbar from "components/Navbars/FixedTransparentNavbar.js";
import Footer from "components/Footers/Footer.js";
import { Container, Col, Row, Card, CardBody, CardFooter, CardTitle, Form, FormGroup, FormFeedback, Input, Button, Alert } from 'reactstrap'


const Activate = (props) => {

    const urlParams = new URLSearchParams(props.location.search)

    const initialState = {
        code: "",
    }

    const history = useHistory();

    const submitForm = async (values, { setSubmitting, setFieldError, setStatus }) => {
        // Set form as submitting
        setSubmitting(true);
        setStatus()

        // Register the user
        try{
            await Auth.confirmSignUp(urlParams.get('email'),values.code)

            await alert('Account activation was successful. Please login on the next screen.');

            history.push({
                pathname: "/login",
            });
        } catch (e) {
            setStatus(e.message)
        }
        setSubmitting(false);
    }

    const resendCode = async (email) => {
        try{
            await Auth.resendSignUp(urlParams.get('email'))
        } catch (e) {
            console.log(e)
        }
    }


  return (
    <div className="signup-page">
      <FixedTransparentNavbar />
      <div className="page-header header-filter" filter-color="blue-solid">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/coding7.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Row>
              <Col />
              <Col className="mr-auto" md="6" lg="5">
                <Card
                  className="card-signup"
                  style={{
                    borderRadius: ".5rem",
                  }}
                >
                  <CardBody>
                    <CardTitle className="text-center" tag="h4">
                      Activate
                    </CardTitle>
                    <Formik
                      validationSchema={yupActivationSchema}
                      initialValues={initialState}
                      onSubmit={submitForm}
                    >
                      {({
                        values,
                        status,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        setFieldError,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                          <Alert
                            color="danger"
                            style={{ borderRadius: "1rem" }}
                            isOpen={status !== undefined}
                          >
                            {status}
                          </Alert>
                          <FormGroup className={"input-lg"}>
                            <Input
                              data-cy="activate-code-input"
                              name="code"
                              type="text"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Activation Code"
                              invalid={touched.code && errors.code}
                            ></Input>
                            <FormFeedback type="invalid">
                              {errors.code}
                            </FormFeedback>
                          </FormGroup>

                          <CardFooter className="text-center m-0">
                            <Button
                              data-cy="activate-submit-button"
                              className="btn-round"
                              color="info"
                              type="submit"
                              disabled={isSubmitting}
                              size="lg"
                            >
                              Activate Account
                            </Button>
                          </CardFooter>
                          <div className="pull-right" style={{ color: "#444" }}>
                            <h6>
                              Lost the email?&nbsp;?{" "}
                              <a
                                data-cy="activate-resend-code-button"
                                className="link footer-link"
                                href="#!"
                                onClick={() =>
                                  resendCode(urlParams.get("email"))
                                }
                              >
                                Send another
                              </a>
                            </h6>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </Col>
              <Col />
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Activate
