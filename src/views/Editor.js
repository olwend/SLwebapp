import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { TrashcanIcon, PlusIcon } from "@primer/octicons-react";
import { Formik, FieldArray } from "formik";

// Import redux
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";

// Import utils
import { getLabId, addLab, updateLab, s3Upload, getGroups } from "../utils/aws";
import { processZip } from "../utils/lab";
import { initialFormValues } from "../utils/constants/initialFormValues";
import { compare } from "../utils/compare";
import { yupSchema } from "../utils/constants/yupSchema";
import {
  categoryOptions,
  timerOptions,
  resourceOptions,
} from "../utils/constants/categoryOptions";

// Import components
import AlertModal from "../components/AlertModal";
import FixedWhiteNavbar from "components/Navbars/FixedWhiteNavbar.js";

// Import reactstrap
import {
  Button,
  Col,
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  Breadcrumb,
  BreadcrumbItem,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form
} from "reactstrap";

// Import css
import "./Editor.css"



const EditItem = (props) => {
  const userInfo = useSelector(getUser);

  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [appError, setAppError] = useState({});
  const [initialState, setInitialState] = useState(initialFormValues);
  const [hTabs, setHTabs] = React.useState("1");
  const [groups, setGroups] = useState([]);

  const [disabled, setDisabled] = useState(true);
  const [isIntegratedWebsite, setIntegratedWebsite] = useState(true);


  useEffect(() => {
    const groupFilter = (data) => {
      let grps = [];
      data = data.filter((item) => item.groupName !== "Admin");
      data = data.filter((item) => item.groupName !== "Developer");
      console.log("data",data)
      if (
        userInfo.userGroups.length === 0 ||
        (userInfo.userGroups.length === 1 &&
          userInfo.userGroups.includes("Developer"))
      ) {
        data = data.filter((item) => item.groupName === "devopsplayground");
      } else if (userInfo.userGroups.includes("Admin")) {
        // nothing to do in Admin
      } else {
        data = data.filter(({ groupName: id1 }) =>
          userInfo.userGroups.some((item) => item === id1)
        );
      }
      data.map((item) =>
        grps.push({ value: item.groupName, label: item.description })
      );
      setGroups(grps);
    };

    const onLoad = async () => {
      await getGroups().then((groups) => groupFilter(groups));
      if (props.location.pathname.includes("/edititem")) {
        if (
          props.match.params.id !== "" ||
          props.match.params.id !== undefined
        ) {
          setLoadingData(true);
          try {
            await getLabId(props.match.params.id).then((item) => {
              setInitialState(item);
              setDisabled(!item.achievements)
              setIntegratedWebsite(!item.integratedWebsite)
            });
          } catch (error) {
            alertErrorFnc(
              "Problem during loading",
              "Lab loading failed, please refresh page or try again later.",
              error
            );
            console.error(error);
          }
          setLoadingData(false);
        }
      }
    };
    onLoad();
  }, [props, userInfo.userGroups]);

  const returnToLabs = () => history.push("/labs");

  const saveItem = async (values) => {
    let response
    try {
      if (props.location.pathname.includes("/edititem")) {
        response = await updateLab(values);
      } else {
        response = await addLab(values);
        return response
      }
      console.log("Saved");
    } catch (error) {
      alertErrorFnc(
        "Warning",
        "Lab creation error. Check your settings.",
        null
      );
      console.error(error);
    }
  };

  const alertErrorFnc = (header, message, err) => {
    setAppError({ header: header, message: message, data: err });
    setShowAlert(true);
  };

  const submitForm = async (values, { setSubmitting }) => {
    // Set form as submitting
    setSubmitting(true);

    let labUuid;
    // Store additional data required for new items
    if (props.location.pathname.includes("/additem")) {

      values["userUuid"] = userInfo.userUuid;
      
      let dbForm = {...values}      
      delete dbForm['file']   

      // Save the lab to DB
      let savedItem = await saveItem(dbForm);

      // Get new lab uuid
      labUuid = savedItem.message

      // Restore file field and add labuuid
      // values["file"] = FileToUpload
      values["uuid"] = labUuid

    } else {
      labUuid = props.match.params.id;
      await saveItem(values);
    }


    // Upload README or ZIP
    if (values.file !== null && values.file !== undefined) {
      if (values.file.name.toLowerCase().includes(".zip")) {
        console.log("process zip");
        await processZip(values.uuid, values.file);
      } else {
        await s3Upload(labUuid, values.file, values.file.type);
      }
    }



    // Sets setSubmitting to false after form is reset
    setSubmitting(false);

    // Return the user to the labs page
    returnToLabs();
  };

  return (
    <>
      <FixedWhiteNavbar />
      <Container className="px-0" fluid>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/">Home</a>
          </BreadcrumbItem>
          {props.location.pathname.includes("/edititem") ? (
            <>
              <BreadcrumbItem active>Edit item</BreadcrumbItem>
              <BreadcrumbItem active>{props.match.params.id}</BreadcrumbItem>
            </>
          ) : (
              <BreadcrumbItem active>Add item</BreadcrumbItem>
            )}
        </Breadcrumb>
        <Nav className="nav-pills-primary p-3 justify-content-center" pills>
          <NavItem>
            <NavLink
              data-cy="editlab-navbar-general-button"
              className={hTabs === "1" ? "active" : ""}
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setHTabs("1");
              }}
            >
              General
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              data-cy="editlab-navbar-base-container-button"
              className={hTabs === "2" ? "active" : ""}
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setHTabs("2");
              }}
            >
              Base Container
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              data-cy="editlab-navbar-custom-container-button"
              className={hTabs === "3" ? "active" : ""}
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setHTabs("3");
              }}
            >
              Custom Containers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              data-cy="editlab-navbar-achievements-container-button"
              className={hTabs === "4" ? "active" : ""}
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setHTabs("4");
              }}
            >
              Achievements Container
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              data-cy="editlab-navbar-integrated-url-button"
              className={hTabs === "5" ? "active" : ""}
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setHTabs("5");
              }}
            >
              Integrated Website
            </NavLink>
          </NavItem>
        </Nav>
        <Formik
         validationSchema={yupSchema(props)}
          initialValues={initialState}
          enableReinitialize
          onSubmit={submitForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <Row className="justify-content-center">
              <Col md={6}>
                <Form className="p-3 edit-form" onSubmit={handleSubmit}>
                  <TabContent className="tab-space" activeTab={"tabs" + hTabs}>
                    <TabPane tabId="tabs1">
                      <FormGroup>
                        <Row>
                          <Col>
                            <Label>Lab Name:</Label>
                          </Col>
                          <Col>
                            <FormText>
                              {touched.labName && errors.labName ? (
                                <div className="error-message">
                                  {errors.labName}
                                </div>
                              ) : null}
                            </FormText>
                          </Col>
                        </Row>
                        <Input
                          data-cy="editlab-general-labname-input"
                          value={values.labName}
                          name="labName"
                          placeholder="Name"
                          disabled={loadingData}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.labName && Boolean(errors.labName)}
                        />
                        <FormText>
                          The name of the lab you want to create
                        </FormText>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col>
                            <Label>Description:</Label>
                          </Col>
                          <Col>
                            <FormText>
                              {touched.description && errors.description ? (
                                <div className="error-message">
                                  {errors.description}
                                </div>
                              ) : null}
                            </FormText>
                          </Col>
                        </Row>
                        <Input
                          data-cy="editlab-general-description-input"
                          value={values.description}
                          type="textarea"
                          name="description"
                          placeholder="Description"
                          disabled={loadingData}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.description && Boolean(errors.description)}
                        />
                        <FormText>Description of the lab</FormText>
                      </FormGroup>
                      <div className="form-row">
                        <FormGroup className="col-md-6">
                          <Row>
                            <Col>
                              <Label>Categories:</Label>
                            </Col>
                            <Col>
                              <FormText>
                                {touched.categories && errors.categories ? (
                                  <div className="error-message">
                                    {errors.categories}
                                  </div>
                                ) : null}
                              </FormText>
                            </Col>
                          </Row>
                          <span data-cy="editlab-general-categories-input">
                          <Select
                            isMulti
                            value={values.categories}
                            options={categoryOptions.sort(compare)}
                            isDisabled={loadingData}
                            className={`react-select ${touched.categories && errors.categories
                              ? "rounded-error"
                              : null
                              }`}
                            classNamePrefix="react-select"
                            closeMenuOnSelect={false}
                            onBlue={handleBlur}
                            onChange={(e) => setFieldValue("categories", e)}
                          /></span>
                          <FormText>
                            Which technology categories are associated
                          </FormText>
                        </FormGroup>
                        <FormGroup className="col-md-6">
                          <Row>
                            <Col>
                              <Label>Type:</Label>
                            </Col>
                            <Col>
                              <FormText>
                                {touched.types && errors.types ? (
                                  <div className="error-message">
                                    {errors.types}
                                  </div>
                                ) : null}
                              </FormText>
                            </Col>
                          </Row>
                          <span data-cy="editlab-general-type-input">
                          <Select
                            isMulti
                            value={values.types}
                            options={groups.sort(compare)}
                            isDisabled={loadingData}
                            closeMenuOnSelect={false}
                            onBlue={handleBlur}
                            className={`react-select ${touched.types && errors.types
                              ? "rounded-error"
                              : null
                              }`}
                            classNamePrefix="react-select"
                            onChange={(e) => setFieldValue("types", e)}
                          /></span>
                          <FormText>
                            What type of content the lab belongs to.
                          </FormText>
                        </FormGroup>
                      </div>
                      <div className="form-row">
                        <FormGroup className="col-md-6">
                          <Row>
                            <Col>
                              <Label>Resource Setting:</Label>
                            </Col>
                            <Col>
                              <FormText>
                                {touched.resourcesCPUMEM &&
                                  errors.resourcesCPUMEM ? (
                                    <div className="error-message">
                                      {errors.resourcesCPUMEM}
                                    </div>
                                  ) : null}
                              </FormText>
                            </Col>
                          </Row>
                          <span data-cy="editlab-general-resource-input">
                          <Select
                            value={values.resourcesCPUMEM}
                            options={resourceOptions}
                            isDisabled={loadingData}
                            closeMenuOnSelect={true}
                            className={`react-select ${touched.resourcesCPUMEM && errors.resourcesCPUMEM
                              ? "rounded-error"
                              : null
                              }`}
                            classNamePrefix="react-select"
                            onChange={(e) =>
                              setFieldValue("resourcesCPUMEM", e)
                            }
                          /></span>
                          <FormText>
                            Memory and CPU settings for your lab
                          </FormText>
                        </FormGroup>
                        <FormGroup className="col-md-6">
                          <Row>
                            <Col>
                              <Label>Duration:</Label>
                            </Col>
                            <Col>
                              <FormText>
                                {touched.timer && errors.timer ? (
                                  <div className="error-message">
                                    {errors.timer}
                                  </div>
                                ) : null}
                              </FormText>
                            </Col>
                          </Row>
                          <span data-cy="editlab-general-timer-input">
                          <Select
                            required
                            options={timerOptions}
                            value={values.timer}
                            isDisabled={loadingData}
                            closeMenuOnSelect={true}
                            className={`react-select ${touched.timer && errors.timer
                              ? "rounded-error"
                              : null
                              }`}
                            classNamePrefix="react-select"
                            onChange={(e) => setFieldValue("timer", e)}
                          /></span>
                          <FormText>Maximum time for running lab</FormText>
                        </FormGroup>
                      </div>
                      <div className="form-row">
                        <FormGroup check className="col-md-6">
                          <Label check className="p-0">
                            <CustomInput
                              data-cy="editlab-general-active-switch"
                              type="switch"
                              name="active"
                              label="Activate Lab"
                              size="lg"
                              id="active"
                              disabled={loadingData}
                              checked={values.active}
                              onChange={handleChange}
                            />
                          </Label>
                        </FormGroup>
                        <FormGroup className="col-md-6">
                          <Row>
                            <Col>
                              <Label>File:</Label>
                            </Col>
                            <Col>
                              <FormText>
                                {errors.file ? (
                                  <div className="error-message">
                                    {errors.file}
                                  </div>
                                ) : null}
                              </FormText>
                            </Col>
                          </Row>
                          <Input
                            data-cy="editlab-general-filename-input"
                            type="file"
                            name="file"
                            disabled={loadingData}
                            onChange={(event) => {
                              setFieldValue(
                                "file",
                                event.currentTarget.files[0]
                              );
                            }}
                            className={errors.file ? "error" : null}
                          />
                          <FormText color="muted">
                            This is some placeholder block-level help text for
                            the above input. It's a bit lighter and easily wraps
                            to a new line.
                          </FormText>
                        </FormGroup>
                      </div>
                    </TabPane>
                    <TabPane tabId="tabs2">
                      <FormGroup>
                        <CustomInput
                          data-cy="editlab-base-ide-switch"
                          type="switch"
                          name="ide"
                          label="IDE Required?"
                          id="ide"
                          disabled={loadingData}
                          checked={values.ide}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <CustomInput
                          data-cy="editlab-base-shell-switch"
                          type="switch"
                          name="shell"
                          label="Shell Required?"
                          id="shell"
                          disabled={loadingData}
                          checked={values.shell}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Git URL for file import</Label>
                        <Input
                          data-cy="editlab-base-giturl-input"
                          value={values.baseGitUrl}
                          name="baseGitUrl"
                          placeholder="git@bitbucket.org:ecs-group/<repo>.git"
                          disabled={loadingData}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.baseGitUrl && errors.baseGitUrl}
                        />
                        <FormText>
                          Git URL to files you want to appear in the IDE. Should
                          be in SSH format!
                        </FormText>
                      </FormGroup>
                      <Label>Exposed Ports</Label>
                      <FieldArray
                        name="basePorts"
                        render={({ insert, remove, push }) => (
                          <Container className="p-0">
                            {values.basePorts.map((basePorts, baseIndex) => (
                              <div key={baseIndex} className="form-row pb-3 h-100  justify-content-center align-items-center">
                                <div className="col-md-11">
                                  <InputGroup className="m-0" key={baseIndex}>
                                    <Input
                                      type="name"
                                      name="basePort"
                                      placeholder="8080"
                                      value={basePorts.port ?? "8080"}
                                      onChange={(e) =>
                                        setFieldValue(
                                          `basePorts.${baseIndex}.port`,
                                          String(e.target.value)
                                        )
                                      }
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText
                                        className="m-0 p-1"
                                        style={{
                                          borderTopRightRadius: "30px",
                                          borderBottomRightRadius: "30px",
                                        }}
                                      >
                                        <FormGroup className="m-0" check>
                                          <Label check>
                                            <Input
                                              defaultChecked={basePorts.visible}
                                              onChange={(e) =>
                                                setFieldValue(
                                                  `basePorts.${baseIndex}.visible`,
                                                  e.target.checked
                                                )
                                              }
                                              className="form-control-sm"
                                              type="checkbox"
                                            ></Input>
                                            UI Visible?{" "}
                                            <span className="form-check-sign form-control-sm">
                                              <span className="check"></span>
                                            </span>
                                          </Label>
                                        </FormGroup>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </div>
                                <div className="col-md-1 text-center justify-content-center align-items-center">
                                  <Button
                                    className="btn-icon btn-round m-0"
                                    color="danger"
                                    onClick={() => remove(baseIndex)}
                                  >
                                    <TrashcanIcon />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <Button
                              data-cy="editlab-base-addport-button"
                              className="btn btn-primary btn-round m-2"
                              variant="danger"
                              onClick={() => push({})}
                            >
                              <PlusIcon /> Add a port
                            </Button>
                          </Container>
                        )}
                      />
                    </TabPane>
                    <TabPane tabId="tabs3">
                      <FieldArray
                        name="containerDefinition"
                        render={({ insert, remove, push }) => (
                          <FormGroup className="p-3">
                            {values.containerDefinition.map(
                              (containerDefinition, index) => (
                                <FormGroup className="p-3 mt-3" key={index}>
                                  <div className="form-row pb-3 h-100">
                                    <div className="col-md-11">
                                      <h3 className="m-0">
                                        Definition #{index + 1}
                                      </h3>
                                    </div>
                                    <div className="col-md-1 text-center justify-content-center align-items-center">
                                      <Button
                                        color="danger"
                                        className="btn-icon btn-round"
                                        style={{ float: "right" }}
                                        onClick={() => remove(index)}
                                      >
                                        <TrashcanIcon />
                                      </Button>
                                    </div>
                                  </div>
                                  <Row>
                                    <Col>
                                      <FormGroup>
                                        <Row>
                                          <Col>
                                            <Label>Short Name:</Label>
                                          </Col>
                                          <Col>
                                            <FormText>
                                              {errors.containerDefinition &&
                                                touched.containerDefinition &&
                                                touched.containerDefinition
                                                  .length > 0 &&
                                                errors.containerDefinition[index]
                                                  .shortName &&
                                                touched.containerDefinition[index]
                                                  .shortName !== undefined ? (
                                                  <div className="error-message">
                                                    {
                                                      errors.containerDefinition[
                                                        index
                                                      ].shortName
                                                    }
                                                  </div>
                                                ) : null}
                                            </FormText>
                                          </Col>
                                        </Row>
                                        <Input
                                          type="name"
                                          name="shortName"
                                          placeholder="jenkins"
                                          value={containerDefinition.shortName}
                                          onBlur={handleBlur}
                                          onChange={(e) =>
                                            setFieldValue(
                                              `containerDefinition.${index}.shortName`,
                                              e.target.value
                                            )
                                          }
                                          invalid={
                                            errors.containerDefinition &&
                                            touched.containerDefinition &&
                                            touched.containerDefinition.length >
                                            0 &&
                                            touched.containerDefinition[index]
                                              .shortName &&
                                            errors.containerDefinition[index]
                                              .shortName
                                          }
                                        />
                                        <FormText>
                                          Short word (no spaces) to identify
                                          image. E.g. jenkins
                                        </FormText>
                                      </FormGroup>
                                    </Col>
                                    <Col>
                                      <FormGroup>
                                        <Row>
                                          <Col>
                                            <Label>Image:</Label>
                                          </Col>
                                          <Col>
                                            <FormText>
                                              {errors.containerDefinition &&
                                                touched.containerDefinition &&
                                                touched.containerDefinition
                                                  .length > 0 &&
                                                touched.containerDefinition[index]
                                                  .image &&
                                                errors.containerDefinition[index]
                                                  .image ? (
                                                  <div className="error-message">
                                                    {
                                                      errors.containerDefinition[
                                                        index
                                                      ].image
                                                    }
                                                  </div>
                                                ) : null}
                                            </FormText>
                                          </Col>
                                        </Row>
                                        <Input
                                          value={containerDefinition.image}
                                          type="name"
                                          name="image"
                                          placeholder="myapp/myapp"
                                          onChange={(e) =>
                                            setFieldValue(
                                              `containerDefinition.${index}.image`,
                                              e.target.value
                                            )
                                          }
                                          invalid={
                                            errors.containerDefinition &&
                                            touched.containerDefinition &&
                                            touched.containerDefinition.length >
                                            0 &&
                                            errors.containerDefinition[index]
                                              .image &&
                                            errors.containerDefinition[index]
                                              .image
                                          }
                                        />
                                        <FormText>
                                          This is the name of the container
                                          image
                                        </FormText>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <FormGroup>
                                        <Label>Environment Variables</Label>
                                        <Input
                                          type="name"
                                          value={containerDefinition.envVars}
                                          name="envVars"
                                          placeholder="key1=value1,key2=value2"
                                          onChange={(e) =>
                                            setFieldValue(
                                              `containerDefinition.${index}.envVars`,
                                              e.target.value
                                            )
                                          }
                                        />
                                        <FormText>
                                          The image environment variables
                                        </FormText>
                                      </FormGroup>
                                    </Col>
                                    <Col>
                                      <FormGroup>
                                        <Label>Path</Label>
                                        <Input
                                          value={containerDefinition.path}
                                          type="name"
                                          name="path"
                                          placeholder="/jenkins"
                                          onChange={(e) =>
                                            setFieldValue(
                                              `containerDefinition.${index}.path`,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Label>Volume Mount</Label>
                                  <FieldArray
                                    name={`containerDefinition[${index}].mountPoints`}
                                    render={({ insert, remove, push }) => (
                                      <Container className="p-0">
                                        {values.containerDefinition[
                                          index
                                        ].mountPoints.map(
                                          (mountPoints, volumeIndex) => (
                                            <div key={volumeIndex} className="form-row pb-3 h-100  justify-content-center align-items-center">
                                              <div className="col-md-11">
                                                <Input
                                                  value={mountPoints.directory}
                                                  type="name"
                                                  name="path"
                                                  placeholder="/var/jenkins_home"
                                                  onChange={(e) =>
                                                    setFieldValue(
                                                      `containerDefinition.${index}.mountPoints.${volumeIndex}.directory`,
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="col-md-1 text-center justify-content-center align-items-center">
                                                <Button
                                                  className="btn-icon btn-round m-0"
                                                  color="danger"
                                                  onClick={() =>
                                                    remove(volumeIndex)
                                                  }
                                                >
                                                  <TrashcanIcon />
                                                </Button>
                                              </div>
                                            </div>
                                          )
                                        )}
                                        <Button
                                          className="btn btn-primary btn-round m-2"
                                          variant="danger"
                                          onClick={() =>
                                            push({ directory: "" })
                                          }
                                        >
                                          <PlusIcon /> Add a volume mount
                                        </Button>
                                      </Container>
                                    )}
                                  />
                                  <Label>Ports</Label>
                                  <FieldArray
                                    name={`containerDefinition[${index}].ports`}
                                    render={({ insert, remove, push }) => (
                                      <Container className="p-0">
                                        {values.containerDefinition[index]
                                          .ports &&
                                          values.containerDefinition[index].ports
                                            .length > 0
                                          ? values.containerDefinition[
                                            index
                                          ].ports.map((ports, portIndex) => (
                                            <div key={portIndex} className="form-row pb-3 h-100  justify-content-center align-items-center">
                                              <div className="col-md-11">
                                                <InputGroup
                                                  className="m-0"
                                                  key={portIndex}
                                                >
                                                  <Input
                                                    value={ports.port ?? ""}
                                                    type="name"
                                                    name="port"
                                                    placeholder="8080"
                                                    onChange={(e) =>
                                                      setFieldValue(
                                                        `containerDefinition.${index}.ports.${portIndex}.port`,
                                                        String(e.target.value)
                                                      )
                                                    }
                                                  />
                                                  <InputGroupAddon addonType="append">
                                                    <InputGroupText
                                                      className="m-0 p-1"
                                                      style={{
                                                        borderTopRightRadius:
                                                          "30px",
                                                        borderBottomRightRadius:
                                                          "30px",
                                                      }}
                                                    >
                                                      <FormGroup
                                                        className="m-0"
                                                        check
                                                      >
                                                        <Label check>
                                                          <Input
                                                            defaultChecked={
                                                              ports.visible
                                                            }
                                                            onChange={(e) =>
                                                              setFieldValue(
                                                                `containerDefinition.${index}.ports.${portIndex}.visible`,
                                                                e.target
                                                                  .checked
                                                              )
                                                            }
                                                            className="form-control-sm"
                                                            type="checkbox"
                                                          ></Input>
                                                            UI Visible?{" "}
                                                          <span className="form-check-sign form-control-sm">
                                                            <span className="check"></span>
                                                          </span>
                                                        </Label>
                                                      </FormGroup>
                                                    </InputGroupText>
                                                  </InputGroupAddon>
                                                </InputGroup>
                                              </div>
                                              <div className="col-md-1 text-center justify-content-center align-items-center">
                                                <Button
                                                  className="btn-icon btn-round m-0"
                                                  color="danger"
                                                  onClick={() =>
                                                    remove(portIndex)
                                                  }
                                                >
                                                  <TrashcanIcon />
                                                </Button>
                                              </div>
                                            </div>
                                          ))
                                          : null}
                                        <Button
                                          className="btn btn-primary btn-round m-2"
                                          variant="danger"
                                          onClick={() => push({})}
                                        >
                                          <PlusIcon /> Add a port
                                        </Button>
                                      </Container>
                                    )}
                                  />
                                </FormGroup>
                              )
                            )}
                            <div className="form-row py-3 h-100">
                              <div className="col-md-12 text-center justify-content-center align-items-center">
                                <Button
                                  color="primary"
                                  type="button"
                                  className="btn-round m-0"
                                  disabled={loadingData}
                                  onClick={() =>
                                    push({
                                      shortName: "",
                                      image: "",
                                      path: "",
                                      envVars: "",
                                      mountPoints: [],
                                    })
                                  }
                                >
                                  Add Custom Container <PlusIcon />
                                </Button>
                              </div>
                            </div>
                          </FormGroup>
                        )}
                      />
                    </TabPane>
                    <TabPane tabId="tabs4">
                      <FormGroup check className="col-md-6">
                        <Label check className="p-0">
                          <CustomInput
                            type="switch"
                            name="achievements"
                            label="Achievements Enabled?"
                            size="lg"
                            id="achievements"
                            disabled={loadingData}
                            checked={values.achievements}
                            onChange={handleChange}
                            onClick={() => {
                              setDisabled(!disabled);
                            }}
                          />
                        </Label>
                      </FormGroup>
                      <FormGroup>
                        <br></br>
                        <Row>
                          <Col>
                            <Label>Image:</Label>
                          </Col>
                          <Col>
                            <FormText>
                              {touched.achievementsImage && errors.achievementsImage ? (
                                <div className="error-message">
                                  {errors.achievementsImage}
                                </div>
                              ) : null}
                            </FormText>
                          </Col>
                        </Row>
                        <Input
                          value={values.achievementsImage}
                          name="achievementsImage"
                          placeholder=""
                          disabled={loadingData || disabled}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.achievementsImage && Boolean(errors.achievementsImage)}
                        />
                        <FormText>
                          This is the name of the achievements
                          image
                            </FormText>
                      </FormGroup>
                      <br></br>
                      <FormGroup check className="col-md-6">
                        <Label check className="p-0">
                          <CustomInput
                            type="switch"
                            name="achievementsDebug"
                            label="Debug Shell Enabled?"
                            size="lg"
                            id="achievementsDebug"
                            disabled={loadingData || disabled}
                            checked={values.achievementsDebug}
                            onChange={handleChange}
                          />
                        </Label>
                      </FormGroup>
                      <FormText>
                        Activates debug shell.
                        </FormText>
                      <FormText>
                        {touched.achievementsDebug && errors.achievementsDebug ? (
                          <div className="error-message">
                            {errors.achievementsDebug}
                          </div>
                        ) : null}
                      </FormText>
                    </TabPane>

                    <TabPane tabId="tabs5">
                      <FormGroup check className="col-md-6">
                        <Label check className="p-0">
                          <CustomInput
                            type="switch"
                            name="integratedWebsite"
                            label="Integrated Website Enabled?"
                            size="lg"
                            id="integratedWebsite"
                            disabled={loadingData}
                            checked={values.integratedWebsite}
                            onChange={handleChange}
                            onClick={() => {
                              setIntegratedWebsite(!isIntegratedWebsite);
                            }}
                          />
                        </Label>
                      </FormGroup>
                      <FormGroup>
                        <br></br>
                        <Row>
                          <Col>
                            <Label>Website:</Label>
                          </Col>
                          <Col>
                            <FormText>
                              {touched.integratedWebsiteURL && errors.integratedWebsiteURL ? (
                                <div className="error-message">
                                  {errors.integratedWebsiteURL}
                                </div>
                              ) : null}
                            </FormText>
                          </Col>
                        </Row>
                        <Input
                          value={values.integratedWebsiteURL}
                          name="integratedWebsiteURL"
                          placeholder=""
                          disabled={loadingData || isIntegratedWebsite}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.integratedWebsiteURL && Boolean(errors.integratedWebsiteURL)}
                        />
                        <FormText>
                          This is the URL of the website that will appear within the lab.
                            </FormText>
                      </FormGroup>
                      <br></br>
                    </TabPane>

                  </TabContent>
                  <Container fluid>
                    <Row>
                      <Col style={{ textAlign: "center" }}>
                        <Button
                          data-cy="editlab-back-button"
                          color="danger"
                          onClick={returnToLabs}
                          size="lg"
                          className="btn-round m-3"
                          disabled={isSubmitting || loadingData}
                        >
                          {" "}
                          Back{" "}
                        </Button>
                        <Button
                          data-cy="editlab-save-button"
                          color="info"
                          type="submit"
                          size="lg"
                          className="btn-round m-3"
                          disabled={isSubmitting || loadingData}
                        >
                          {" "}
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Col>
            </Row>
          )}
        </Formik>
        <AlertModal
          err={appError}
          show={showAlert}
          onHide={() => {
            setShowAlert(false);
            setAppError({});
          }}
        />
      </Container>
    </>
  );
};

export default EditItem;
