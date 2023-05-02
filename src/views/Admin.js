import React, { useState, useEffect } from "react";

// Import table2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

// Import utils
import { getUsers, getGroups } from "../utils/aws";
import { pagination } from "../utils/constants/tableOptions";
import { expandRow, columns } from "../utils/constants/adminTableOptions";

// Import components
import AlertModal from "../components/AlertModal";
import NoDataIndication from "../components/NoDataIndication";
import FixedWhiteNavbar from "components/Navbars/FixedWhiteNavbar.js";

// Import reactstrap components
import { Breadcrumb, BreadcrumbItem, Container, Col, Row } from "reactstrap";

// Import css
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./Admin.css";

const Admin = () => {
  const [apiError, setApiError] = useState({});
  const [showError, setShowError] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const onLoad = async () => {
      let grps = [];
      await Promise.all([
        getGroups().then((item) =>
          item.map((data) =>
            grps.push({ value: data.groupName, label: data.description })
          )
        ),
        getUsers().then((users) => setUsers(users)),
      ]);
      setGroups(grps);
    };
    onLoad();
  }, []);

  const AdminTable = (props) => {
    return (
      <ToolkitProvider
        keyField="Username"
        data={props.data}
        bootstrap4
        columns={columns(groups)}
      >
        {(tableProps) => (
          <Container className="m-0 mt-3" fluid>
            <Row>
              <Col>
                <BootstrapTable
                  {...tableProps.baseProps}
                  keyField="UserCreateDate"
                  pagination={paginationFactory(pagination)}
                  expandRow={expandRow}
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
          <BreadcrumbItem>User Management</BreadcrumbItem>
        </Breadcrumb>
        <AdminTable data={users} />
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
      </Container>
    </>
  );
};

export default Admin;
