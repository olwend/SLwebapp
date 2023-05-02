import React from "react";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Import utils
import { yupLoginSchema } from "../utils/constants/yupAuthSchema";
import { setUserData } from "../utils/authentication";
import { loadSession } from "../utils/session";

// Import components
import FixedTransparentNavbar from "components/Navbars/FixedTransparentNavbar.js";
import Footer from "components/Footers/Footer.js";
import PasswordField from "../components/PasswordField";

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

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

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
      const user = await Auth.signIn({
        username: values.email,
        password: values.password,
      });
      setUserData(dispatch, user);
      loadSession(dispatch, user.username);
      setSubmitting(false)
    } catch (e) {
      if (e.code === "UserNotConfirmedException") {
        setSubmitting(false);
        history.push({
          pathname: "/activate",
          search: "?email=" + values.email,
        });
      } else {
        if (
          e.code === "UserNotFoundException" ||
          e.code === "NotAuthorizedException"
        ) {
          setStatus("Incorrect username or password.");
        } else {
          setStatus(e.message);
        }
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
                  <CardBody data-cy="login-card">
                    <CardTitle className="text-center" tag="h4">
                      Login
                    </CardTitle>
                    <Formik
                      validationSchema={yupLoginSchema}
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
                              data-cy="login-email-input"
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
                          <PasswordField
                            name="password"
                            value={values.password}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched.password}
                            error={errors.password}
                            data-cy="login-password-input"
                          />

                          <CardFooter className="text-center m-0">
                            <Button
                              data-cy="login-form-button"
                              className="btn-round"
                              color="info"
                              type="submit"
                              disabled={isSubmitting}
                              size="lg"
                            >
                              Login
                            </Button>
                          </CardFooter>
                          <div className="pull-left">
                            <h6>
                              <a
                                data-cy="create-account-button"
                                className="link footer-link"
                                href={`/register`}
                              >
                                Create Account
                              </a>
                            </h6>
                          </div>
                          <div className="pull-right">
                            <h6>
                              <a
                                data-cy="forgot-password-button"
                                className="link footer-link"
                                href={`/forgotpassword`}
                              >
                                Forgotten password?
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
};

export default Login;
