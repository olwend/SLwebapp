import React from "react";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";

// Import utils
import { yupForgotPasswordSubmitSchema } from "../utils/constants/yupAuthSchema";

// Import components
import PasswordField from "../components/PasswordField";
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

const ForgotPasswordSubmit = (props) => {
  const urlParams = new URLSearchParams(props.location.search);

  const initialState = {
    email: urlParams.get("email"),
    password: "",
    passwordConfirmation: "",
    code: "",
  };

  const history = useHistory();

  const submitForm = async (
    values,
    { setSubmitting, setFieldError, setStatus }
  ) => {
    // Set form as submitting
    setSubmitting(true);
    setStatus();

    // Register the user
    try {
      await Auth.forgotPasswordSubmit(
        values.email,
        values.code,
        values.password
      );
      history.push({
        pathname: "/",
      });
    } catch (e) {
      setStatus(
        "Unable to change password. Check details have been entered correctly"
      );
    }
    setSubmitting(false);
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
                      Change Password
                    </CardTitle>
                    <Formik
                      validationSchema={yupForgotPasswordSubmitSchema}
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
                              value={values.email}
                              type="text"
                              name="email"
                              onChange={handleChange}
                              invalid={touched.email && errors.email}
                            ></Input>
                            <FormFeedback type="invalid">
                              {errors.email}
                            </FormFeedback>
                          </FormGroup>
                          <FormGroup className={"input-lg"}>
                            <Input
                              placeholder="Code"
                              type="text"
                              name="code"
                              onChange={handleChange}
                              invalid={touched.code && errors.code}
                            ></Input>
                            <FormFeedback type="invalid">
                              {errors.email}
                            </FormFeedback>
                          </FormGroup>
                          <PasswordField
                            name="password"
                            value={values.password}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched.password}
                            error={errors.password}
                          />
                          <FormGroup className={"input-lg"}>
                            <Input
                              autoComplete="password"
                              placeholder="Confirm Password"
                              type="password"
                              name="passwordConfirmation"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={
                                touched.passwordConfirmation &&
                                errors.passwordConfirmation
                              }
                            />
                            <FormFeedback type="invalid">
                              {errors.passwordConfirmation}
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

export default ForgotPasswordSubmit;
