import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { getSession } from "../redux/slices/sessionSlice";

import {
  Button,
  ButtonGroup,
  Container,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { Input } from "reactstrap";
import { Search } from "react-bootstrap-table2-toolkit";

import { PlusCircleIcon, SyncIcon, XCircleIcon } from "@primer/octicons-react";

import Select from "react-select";

import { apiFnc } from "../utils";
import DestroySessionModal from "../components/DestroySessionModal";
import { refreshListOfLabs } from "../utils/lab";
import { categoryOptions } from "../utils/constants/categoryOptions";

const FilterSideBar = (props) => {
  const sessionInfo = useSelector(getSession);
  const userInfo = useSelector(getUser);

  const dispatch = useDispatch();

  const { SearchBar } = Search;
  const labActive =
    props.dataSession !== undefined ? props.dataSession.isLabActive : false;

  const [setShowError] = useState(false);
  const [setApiError] = useState({});

  // DestroySessionModal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="p-0">
      {userInfo.userAdmin || userInfo.userGroups.includes("Developer") ? (
        <Button
          data-cy="labs-newlab-button"
          className="mb-3"
          color="success"
          block
          tag={Link}
          to={`/additem`}
        >
          <PlusCircleIcon /> New Lab
        </Button>
      ) : null}
      <ButtonGroup className="d-flex" aria-label="Basic 2">
        <Button
          data-cy="labs-refresh-button"
          variant="primary"
          onClick={async () => {
            await apiFnc(
              refreshListOfLabs(dispatch),
              "Problem with Loading Labs",
              "Loading Labs Table failed, please refresh page or try again later.",
              setApiError,
              setShowError
            );
          }}
        >
          <SyncIcon /> Refresh
        </Button>
        <Button color="danger" disabled={!labActive} onClick={handleShow} data-cy="labs-endlab-button">
          <XCircleIcon /> End Lab
        </Button>
      </ButtonGroup>
      <hr />
      <Container fluid className="p-0" aria-label="Basic example">
        <span data-cy="labs-searchbar-input">
        <SearchBar
          
          className="form-control-lg"
          {...props.tableProps.searchProps}
        />
        </span>
      </Container>
      <hr />
      <Form>
        <FormGroup controlid="exampleForm.ControlSelect2">
          <Label>Category</Label>
          <Select
            isMulti
            className="react-select"
            classNamePrefix="react-select"
            options={categoryOptions}
            closeMenuOnSelect={false}
            onChange={props.selectCategories}
          />
        </FormGroup>
        <FormGroup controlid="exampleForm.ControlSelect2">
          <Label>Content Type</Label>
          <Select
            isMulti
            className="react-select"
            classNamePrefix="react-select"
            options={props.types}
            closeMenuOnSelect={false}
            onChange={props.selectTypes}
          />
        </FormGroup>
        <hr />
        {userInfo.userAdmin || userInfo.userGroups.includes("Developer") ? (
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                defaultChecked={props.activeFilter}
                onChange={props.activeClicks}
              ></Input>
              <span className="form-check-sign"></span>
              Active?
            </Label>
          </FormGroup>
        ) : null}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onChange={props.newClicks}></Input>
            <span className="form-check-sign"></span>
            New?
          </Label>
        </FormGroup>
      </Form>
      <DestroySessionModal
        sessionInfo={sessionInfo}
        show={show}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default FilterSideBar;
