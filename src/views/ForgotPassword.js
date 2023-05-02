import React from "react";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";
import { alert } from "react-bootstrap-confirmation";

// Import utils
import { yupForgotPasswordSchema } from "../utils/constants/yupAuthSchema";

// Import components
import FixedTransparentNavbar from "components/Navbars/FixedTransparentNavbar.js";
import Footer from "components/Footers/Footer.js";

// Import reactstrap components
import {
  Button,
  FormGroup,
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Form,
  FormFeedback,
  Input,
  Container,
  Col,
  Row,
  Alert,
} from "reactstrap";

const ForgotPassword = () => {
  const initialState = {
    email: "",
  };

  const history = useHistory();

  const passwordRedirect = async (setSubmitting, values) => {
    await alert(
      "If the email is found in our system, a reset email has be sent"
    );

    setSubmitting(false);

    history.push({
      pathname: "/forgotpasswordsubmit",
      search: "?email=" + values.email,
    });
  };

  const submitForm = async (values, { setSubmitting, setStatus }) => {
    // Set form as submitting
    setSubmitting(true);
    setStatus();

    // Register the user
    try {
      await Auth.forgotPassword(values.email);
      await passwordRedirect(setSubmitting, values);
    } catch (e) {
      if (e.code === "UserNotFoundException") {
        await passwordRedirect(setSubmitting, values);
      } else {
        setStatus(e.message);
        setSubmitting(false);
      }
    }
  };

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
                      Forgot Password
                    </CardTitle>
                    <Formik
                      validationSchema={yupForgotPasswordSchema}
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
                              autoComplete="email"
                              placeholder="Email"
                              type="text"
                              name="email"
                              onChange={handleChange}
                              invalid={touched.email && errors.email}
                            ></Input>
                            <FormFeedback type="invalid">
                              {errors.email}
                            </FormFeedback>
                          </FormGroup>

                          <CardFooter className="text-center m-0">
                            <Button
                              className="btn-round m-3"
                              color="danger"
                              disabled={isSubmitting}
                              size="lg"
                              tag={Link}
                              to={`/login`}
                            >
                              Go back
                            </Button>
                            <Button
                              className="btn-round m-3"
                              color="info"
                              type="submit"
                              disabled={isSubmitting}
                              size="lg"
                            >
                              Submit
                            </Button>
                          </CardFooter>
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
};

export default ForgotPassword;
