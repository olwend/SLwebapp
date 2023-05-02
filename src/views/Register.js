import React, { useState } from "react";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../config";

// Import utils
import { yupRegistrationSchema } from "../utils/constants/yupAuthSchema";

// Import components
import FixedTransparentNavbar from "components/Navbars/FixedTransparentNavbar.js";
import Footer from "components/Footers/Footer.js";
import TosModal from "../components/TosModal";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import PasswordField from "../components/PasswordField";

// Import reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  FormFeedback,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

const Registration = () => {
  const [recaptchaToken, setRecaptchaToken] = useState();
  const [tosShow, setTosShow] = useState(false);
  const [ppShow, setPpShow] = useState(false);
  const initialState = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    tos: "false",
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
      await Auth.signUp({
        username: values.email,
        password: values.password,
        validationData: [
          {
            Name: "recaptchaToken",
            Value: recaptchaToken,
          },
        ],
        attributes: {
          name: values.name,
        },
      });
      setSubmitting(false);
      history.push({
        pathname: "/activate",
        search: "?email=" + encodeURIComponent(values.email),
      });
    } catch (e) {
      if (e.code === "UsernameExistsException") {
        setFieldError(
          "email",
          "This email already exists. Please use the login page instead"
        );
      } else {
        setStatus(e.code);
      }
      setSubmitting(false);
    }
  };

  const captchaChange = (value) => {
    setRecaptchaToken(value);
  };

  return (
    <div className="signup-page">
      <FixedTransparentNavbar />
      <div className="page-header header-filter" filter-color="blue-solid">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/coding6.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="6" lg="7">
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons tech_tv"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">Enriched Workspace</h5>
                    <p className="description">
                      SkillsLounge labs are provisioned with Eclipse Theia that
                      supports a varity of plugins and programming languages
                      that offers a more realstic, enriched, working
                      environment.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons tech_watch-time"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">Self Paced Learning</h5>
                    <p className="description">
                      Learn at a pace that is managable and convient for you.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons objects_spaceship"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">Hassle Free</h5>
                    <p className="description">
                      No installation steps neccessary. All tools and
                      dependencies are automatically provisioned.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="6" lg="5">
                <Card
                  className="card-signup"
                  style={{
                    borderRadius: ".5rem",
                  }}
                >
                  <CardBody>
                    <CardTitle className="text-center" tag="h4">
                      Register
                    </CardTitle>
                    <Formik
                      validationSchema={yupRegistrationSchema}
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
                          {console.log(errors)}
                          {console.log(values)}
                          <FormGroup className={"input-lg"}>
                            <Input
                              data-cy="register-fullname-input"
                              autoComplete="fullname"
                              placeholder="Name"
                              type="text"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={touched.name && errors.name}
                            />
                            <FormFeedback type="invalid">
                              {errors.name}
                            </FormFeedback>
                          </FormGroup>
                          <FormGroup className={"input-lg"}>
                            <Input
                              data-cy="register-email-input"
                              autoComplete="email"
                              placeholder="Email"
                              type="text"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={touched.email && errors.email}
                            />
                            <FormFeedback type="invalid">
                              {errors.email}
                            </FormFeedback>
                          </FormGroup>
                          <PasswordField
                            data-cy="register-password-input"
                            name="password"
                            value={values.password}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched.password}
                            error={errors.password}
                          />
                          <FormGroup className={"input-lg"}>
                            <Input
                              data-cy="register-password-confirm-input"
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
                          <FormGroup check>
                            <Label check>
                              <Input
                                data-cy="register-terms-checkbox"
                                type="checkbox"
                                name="tos"
                                value={values.tos}
                                onChange={handleChange}
                              ></Input>
                              <span className="form-check-sign"></span>I agree to
                              the&nbsp;
                              <Button
                                color="info"
                                className="p-0 m-0 btn-link"
                                onClick={() => setTosShow(true)}
                              >
                                terms of service
                              </Button>
                              &nbsp;&amp;&nbsp;
                              <Button
                                color="info"
                                className="p-0 m-0 btn-link"
                                onClick={() => setPpShow(true)}
                              >
                                privacy policy
                              </Button>
                              .
                            </Label>
                          </FormGroup>
                          <ReCAPTCHA
                            className="mt-3"
                            sitekey={config.CAPTCHA_SITE_KEY}
                            onChange={captchaChange}
                            style={{ display: "inline-block" }}
                          />
                          <CardFooter className="text-center m-0">
                            <Button
                              data-cy="register-submit-button"
                              className="btn-round"
                              color="info"
                              type="submit"
                              disabled={isSubmitting}
                              size="lg"
                            >
                              Get Started
                            </Button>
                          </CardFooter>
                          <div className="pull-right" style={{ color: "#444" }}>
                            <h6>
                              Already have an account?{" "}
                              <a className="link footer-link" href="/login">
                                Sign In
                              </a>
                            </h6>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
        <TosModal show={tosShow} onHide={() => setTosShow(false)} />
        <PrivacyPolicyModal show={ppShow} onHide={() => setPpShow(false)} />
      </div>
    </div>
  );
};

export default Registration;
