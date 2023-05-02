import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLabs } from "../redux/slices/labsSlice";
import { PlusCircleIcon, XCircleIcon } from "@primer/octicons-react";
import { Modal, Button, Form, Spinner} from 'react-bootstrap'
import { Formik } from "formik";
import * as yup from "yup";

// Import table2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

// Import utils
import { getUsers, getGroups, createGroup, deleteGroup } from "../utils/aws";
import { pagination } from "../utils/constants/tableOptions";
import { refreshListOfLabs } from "../utils/lab";

// Import Components
import AlertModal from "../components/AlertModal";
import NoDataIndication from "../components/NoDataIndication";
import UsersSelect from "../components/UsersSelect";
import LabsSelect from "../components/LabsSelect";
import FixedWhiteNavbar from "components/Navbars/FixedWhiteNavbar.js";

// Import reactstrap components
import { Breadcrumb, BreadcrumbItem, Container, Col, Row } from "reactstrap";

// Import CSS
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./GroupsManagement.css";

const GroupsManagement = () => {
  const labsInfo = useSelector(getLabs);
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState({});
  const [showError, setShowError] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [processingCreating, setProcessingCreating] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const onLoad = async () => {
      await Promise.all([
        getUsers().then((users) => { console.log("users", users); setUsers(users)}),
        getGroups().then((groups) => {console.log(groups); setGroups(groups)}),
        refreshListOfLabs(dispatch, ["Admin"]),
      ]);

    };
    onLoad();
  }, [dispatch]);


  const schema = yup.object({
    groupName: yup.string().required(),
    groupDescription: yup.string().required(),
  });

  const submitForm = async (values) => {
    setProcessingCreating(true);
    let newgroupName = values.groupName.toLowerCase().trim();
    let newGroupDesc = values.groupDescription;
    let json = {
      groupName: newgroupName,
      groupDescription: newGroupDesc
    }
    await createGroup(json);
    await getGroups().then((groups) => setGroups(groups));
    setProcessingCreating(false);
    handleClose();

  }

  const destroyGroup = async (cell) => {
    if (window.confirm("Are you sure you want to delete group: '" + cell + "' ?")) {
      let json = {
        groupName: cell,
      }
      await deleteGroup(json);
      await getGroups().then((groups) => setGroups(groups));
    }
  }

  const createGroupColumn = (cell, row) => {
    console.log(labsInfo);
    console.log(row);
    console.log(cell);
    if(cell === "Admin" || cell === "Developer")
      return <div>{cell}</div>
    else{
      return <div><Button size="sm" variant="danger" onClick={()=>destroyGroup(cell)}> {cell} <XCircleIcon /> </Button></div>
    }
  }

  const columns = [
    {
      text: <div>Groups <Button size="sm" variant="success" onClick={handleShow}> <PlusCircleIcon /> </Button></div>,
      dataField: "groupName",
      sort: false,
      formatter: (cell, row) => ( createGroupColumn(cell,row) ),
      style: { width: "10%", verticalAlign: "middle" },
    },
    {
      text: "Users",
      dataField: "users",
      formatter: (cell, row) => (
        <UsersSelect row={row} cell={cell} users={users} setUsers={setUsers} />
      ),
      style: { width: "45%", whiteSpace: "nowrap" },
    },
    {
      text: "Labs",
      dataField: "labs",
      formatter: (cell, row) => (
        <LabsSelect
          row={row}
          cell={cell}
          labs={labsInfo.data}
          dispatch={dispatch}
        />
      ),
      style: { width: "45%", whiteSpace: "nowrap" },
    },
  ];

  const AdminGrpTable = (props) => {
    return (
      <ToolkitProvider
        keyField="Username"
        data={props.data}
        bootstrap4
        columns={columns}
      >
        {(tableProps) => (
          <Container className="m-0 mt-3" fluid>
            <Row>
              <Col>
                <BootstrapTable
                  {...tableProps.baseProps}
                  keyField="groupName"
                  pagination={paginationFactory(pagination)}
                  noDataIndication={() => <NoDataIndication />}
                />
              </Col>
            </Row>
          </Container>
        )}
      </ToolkitProvider>
    );
  };

  return (
    <>
      <FixedWhiteNavbar />
      <Container className="px-0 h-100" fluid>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/">Home</a>
          </BreadcrumbItem>
          <BreadcrumbItem>Admin</BreadcrumbItem>
          <BreadcrumbItem>Groups Management</BreadcrumbItem>
        </Breadcrumb>
        <AdminGrpTable data={groups} />
        {apiError !== {} ? (
          <AlertModal
            err={apiError}
            show={showError}
            onHide={() => {
              setShowError(false);
              setApiError({});
            }}
          />
        ) : null}
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={schema}
              onSubmit={submitForm}
              initialValues={{
                groupName: '',
                groupDescription: '',
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group controlid="validationgroupName">
                      <Form.Label>Group Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="groupName"
                        value={values.groupName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={(errors.groupName || groups.some(item => item.groupName.toLowerCase() === values.groupName.toLowerCase())) && touched.groupName}
                      />
                      <Form.Control.Feedback type="invalid">
                        Name Invalid or Already Exists
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                          Group Name have to be one word lowercase, if not the Group Name will be transform to lowercase and trim it into one word.
                      </Form.Text>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group controlid="validationGroupDescription">
                      <Form.Label>Group Description</Form.Label>
                      <Form.Control
                        type="text"
                        name="groupDescription"
                        value={values.groupDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.groupDescription && touched.groupDescription}
                      />
                      <Form.Text className="text-muted">
                          Group Desription is description of group who is using it or what kind part of project is belonging, there is no standard for desription can be empty.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Description is required
                      </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>
                    {
                    processingCreating ?  <Button disabled={processingCreating} type="submit">Create Group  <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /></Button> : <Button disabled={processingCreating} type="submit">Create Group</Button>
                  }
                </Form>
              )}
            </Formik>

          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default GroupsManagement;
