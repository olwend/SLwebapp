import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";

// Import utils
import { changingPassword } from "../utils/authentication";
import { yupChangePasswordValidation } from "../utils/constants/yupAuthSchema";

// Import components
import FixedWhiteNavbar from "components/Navbars/FixedWhiteNavbar.js";

// Import reactstrap components
import {
  Container,
  Row,
  Col,
  Form,
  FormFeedback,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
} from "reactstrap";

const UserPreferences = () => {
  const userInfo = useSelector(getUser);
  const history = useHistory();

  const [validationMessage, setValidationMessage] = useState("");

  const submitForm = async (values) => {
    try {
      await changingPassword(history, values);
    } catch (error) {
      setValidationMessage(error.message);
    }
  };

  const initialState = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <>
      <FixedWhiteNavbar />
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem active>User Preferences</BreadcrumbItem>
      </Breadcrumb>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={6}>
            <h4>Details</h4>
            <Form>
              <FormGroup controlid="userName">
                <Label>Name</Label>
                <Input
                  data-cy="userdetails-username"
                  disabled
                  value={userInfo.userName}
                  type="string"
                  placeholder="Enter Password"
                />
              </FormGroup>
              <FormGroup controlid="userEmail">
                <Label>Email</Label>
                <Input
                  data-cy="userdetails-email"
                  disabled
                  value={userInfo.userEmail}
                  type="email"
                  placeholder="Enter Password"
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <h4>Password</h4>
            {validationMessage === undefined ||
            validationMessage === "" ? null : (
              <Alert color="danger">{validationMessage}</Alert>
            )}
            <Formik
              validationSchema={yupChangePasswordValidation}
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
                  <FormGroup>
                    <Label>Current Password</Label>
                    <Input
                      data-cy="userdetails-current-password"
                      name="oldPassword"
                      autoComplete="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.oldPassword && errors.oldPassword}
                      value={values.oldPassword}
                      type="password"
                      placeholder="Enter Password"
                    />
                    <FormFeedback type="invalid">
                      {errors.oldPassword}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>New Password</Label>
                    <Input
                      data-cy="userdetails-new-password"
                      name="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.password && errors.password}
                      value={values.password}
                      type="password"
                      placeholder="Enter Password"
                    />
                    <FormFeedback type="invalid">
                      {errors.password}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm New Password</Label>
                    <Input
                      data-cy="userdetails-confirm-new-password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      value={values.confirmPassword}
                      type="password"
                      placeholder="Enter Password"
                    />
                    <FormFeedback type="invalid">
                      {errors.confirmPassword}
                    </FormFeedback>
                  </FormGroup>

                  <Button
                    data-cy="userdetails-save-button"
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserPreferences;
