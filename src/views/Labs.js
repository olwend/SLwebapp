import React, { useState, useEffect } from "react";

// Import redux
import { useSelector, useDispatch } from "react-redux";
import { getLabs } from "../redux/slices/labsSlice";
import { getSession } from "../redux/slices/sessionSlice";
import { getUser } from '../redux/slices/userSlice'

// Import utils
import { apiFnc } from '../utils'
import { refreshListOfLabs } from '../utils/lab'
import { getGroups } from '../utils/aws'
import { pagination } from '../utils/constants/tableOptions'

// Import components 
import AlertModal from "../components/AlertModal";
import LoadingModal from "../components/LoadingModal";
import ActionButtons from "../components/ActionButtons";
import FilterSideBar from "../components/FilterSideBar";
import NoDataIndication from "../components/NoDataIndication";
import FixedWhiteNavbar from "components/Navbars/FixedWhiteNavbar.js";

// Import reactstrap
import { Container, Row, Col, Badge, Breadcrumb, BreadcrumbItem } from "reactstrap";

// Import table components
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter, numberFilter, Comparator } from "react-bootstrap-table2-filter";

// Import CSS
import "./Labs.css";

const Labs = () => {
  
  const [ pbValue, setPbValue ] = useState(0)
  const [ dpgLoading, setDpgLoading ] = useState(false)
  const [ apiError, setApiError ] = useState({})
  const [ showError, setShowError ] = useState(false)
  const [ groups, setGroups ] = useState([])

  const sessionInfo = useSelector(getSession)
  const labsInfo = useSelector(getLabs)
  const userInfo = useSelector(getUser)

  const dispatch = useDispatch();

  useEffect(() => {
    const groupFilter = (data) => {
      let grps = []
      data = data.filter(item => item.groupName !== "Admin" );
      data = data.filter(item => item.groupName !== "Developer" );
      if (userInfo.userGroups.length === 0 || (userInfo.userGroups.length === 1 && userInfo.userGroups.includes("Developer")) ) {
        data = data.filter(item => item.groupName === "devopsplayground" );
      }else if(userInfo.userGroups.includes("Admin")){
        // nothing to do in Admin
      } else {
        data = data.filter(({groupName: id1}) => userInfo.userGroups.some((item) => item === id1));
      }
      data.map(item => grps.push({value:item.groupName, label:item.Description}))
      setGroups(grps)
    }

    const onLoad = async () => 
      await Promise.all([ 
        getGroups().then((groups) => groupFilter(groups)),
        apiFnc(
        refreshListOfLabs(dispatch, userInfo.userGroups),
        'Problem with Loading Labs','Loading Labs Table failed, please refresh page or try again later.',
        setApiError,
        setShowError) 
      ]);
    onLoad()
  },[dispatch, userInfo.userGroups])

  const newBadgeFormatter = (cell, row) => {
    if (Date.now() - row.createdDateTime < 604800000) {
      return (
        <div>
          {cell}{" "}
          <Badge color="primary">
            New
          </Badge>
        </div>
      );
    } else {
      return cell;

    }
  };

  const activeClicks = (event, activeFilter) =>
    activeFilter(event.target.checked);

  const selectTypes = (event, typeFilter) =>
    typeFilter(
      event !== null
        ? event
            .map((a) => a.value)
            .sort()
            .join(",")
        : ""
    );

  const selectCategories = (event, categoriesFilter) =>
    categoriesFilter(
      event !== null
        ? event
            .map((a) => a.value)
            .sort()
            .join(",")
        : ""
    );

  const newClicks = (event, createdDateTimeFilter) => {
    if (event.target.checked) {
      createdDateTimeFilter({
        number: Date.now() - 604800000,
        comparator: Comparator.GT,
      });
    } else {
      createdDateTimeFilter({});
    }
  };

  const LabsTable = (props) => {
    const arrayFormatter = (cell, row) => {
      if (cell !== undefined) {
        try {
          return cell
            .map((a) => a.value)
            .sort()
            .join(",");
        } catch (error) {
          console.log(error);
        }
      }
    };

    const sessionList = props.sessionList;

    let activeFilter = "true";
    let categoriesFilter;
    let typeFilter;
    let createdDateTimeFilter;

    const columns = [
      { text: 'Name', dataField: 'labName', sort:true, style: {verticalAlign: 'middle'}, formatter: newBadgeFormatter },
      { text: 'Active', dataField: 'active', headerStyle: (column, colIndex) => ({ width: 0 , 'display': 'none' }),
          style: { 'display': 'none' }, filter: textFilter({getFilter: (filter) => {activeFilter = filter}, style: {'display': 'none','height':'20px'}, defaultValue: activeFilter})},
      { text: 'Created', dataField: 'createdDateTime', headerStyle: (column, colIndex) => ({ width: 0 , 'display': 'none' }),
          style: { 'display': 'none' }, filter: numberFilter({ getFilter: filter => { createdDateTimeFilter = filter }, style: { 'display': 'none', 'height': '20px' }})},
      { text: 'Categories', dataField: 'categories', headerStyle: (column, colIndex) => ({ width: 0 , 'display': 'none' }),
        style: { 'display': 'none' }, filterValue: arrayFormatter, formatter: arrayFormatter,
        filter: textFilter({ getFilter: filter => { categoriesFilter = filter }, style: { 'display': 'none','height':'20px' }})},
      { text: 'Type', dataField: 'types', headerStyle: (column, colIndex) => ({ width: 0 , 'display': 'none'}),
        style: { 'display': 'none'}, filterValue: arrayFormatter, formatter: arrayFormatter,
        filter: textFilter({ getFilter: filter => { typeFilter = filter }, style: { 'display': 'none','height':'20px' }})},
      { text: 'Actions', dataField: 'df1', style: {'whiteSpace': 'nowrap', width: '5%'}, headerStyle: (colum, colIndex) => {return { width: '5%', textAlign: 'left', whiteSpace: 'nowrap' };}, isDummyField: true, sort: false,
        formatter: (cellContent, row) => <ActionButtons row={row} dataSession={sessionList} setDpgLoading={setDpgLoading} setPbValue={setPbValue} setApiError={setApiError} setShowError={setShowError} userInfo={userInfo} />}
    ]

    const selectRow = { mode: 'radio', style: { backgroundColor: '#c8e6c9' }, hideSelectColumn: true, selected: [ sessionList.session.labName ]}

      return (
          <ToolkitProvider keyField='uuid' data={props.labs.data} bootstrap4 search columns={columns}>
            {
              tableProps => (
                  <Container className="m-0 mt-3" fluid>
                    <Row>
                      <Col sm={5} md={6} lg={2}>
                        <FilterSideBar
                            types={groups}
                            tableProps={tableProps}
                            activeFilter={activeFilter}
                            activeClicks={(event) => activeClicks(event, activeFilter)}
                            newClicks={(event) => newClicks(event, createdDateTimeFilter)}
                            selectCategories={(event) => selectCategories(event, categoriesFilter)}
                            selectTypes={(event) => selectTypes(event, typeFilter)}
                            dataSession={sessionList}
                            userInfo={userInfo}
                        />
                      </Col>
                      <Col sm={7} md={6} lg={10} >
                        <BootstrapTable { ...tableProps.baseProps } 
                          key={sessionList.session.uuid} 
                          pagination={ paginationFactory(pagination) } 
                          filter={ filterFactory() } 
                          selectRow={ selectRow }       
                          noDataIndication={ () =>
                            labsInfo.isLoaded
                            ? <Container>No data found!</Container>
                            : <NoDataIndication /> 
                          }
                        />
                      </Col>
                    </Row>
                  </Container>
              )
            }
          </ToolkitProvider>
      )
  }

  return (
    <>
      <FixedWhiteNavbar />
      <Container className="px-0" fluid>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem active>Labs</BreadcrumbItem>
      </Breadcrumb>
        <LoadingModal dpgLoading={dpgLoading} pbValue={pbValue} />
        <LabsTable labs={labsInfo} sessionList={sessionInfo} />
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

export default Labs;
