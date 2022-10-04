import React, { useEffect, useMemo, useState } from "react";
import { Badge, Button, Col, Row, Spinner } from "react-bootstrap";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
  useRowState,
} from "react-table";
import HtmlHead from "components/html-head/HtmlHead";
import BreadcrumbList from "components/breadcrumb-list/BreadcrumbList";
import ControlsPageSize from "./components/ControlsPageSize";
import ControlsSearch from "./components/ControlsSearch";
import ModalAddEdit from "./components/ModalAddEdit";
import Table from "./components/Table";
import TablePagination from "./components/TablePagination";
import { Link } from "react-router-dom";
import { DEFAULT_PATHS } from "config";
import { InitialGoals, InitialGoalsAdmin } from "services/treeservice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CsLineIcons from "cs-line-icons/CsLineIcons";

const TreeAdminIndex = () => {
  const history = useHistory();
  const appRoot = DEFAULT_PATHS.APP.endsWith("/")
    ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
    : DEFAULT_PATHS.APP;
  const title = "Tree Admin";
  const description = "Separate rows with edit, delete and add.";

  const breadcrumbs = [
    { to: "", text: "Home" },
    // { to: "interface", text: "Interface" },
    // { to: "interface/plugins", title: "Plugins" },
    // { to: "interface/plugins/datatables", title: "Datatables" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [initialGoals, setInitialGoals] = useState([]);

  const columns = useMemo(() => {
    return [
      {
        Header: "Title",
        accessor: "title_goals",
        sortable: true,
        headerClassName: "text-muted text-small text-uppercase w-30",
        Cell: ({ cell, row }) => {
          return (
            <Link
              className="list-item-heading body"
              to={{
                pathname: `${appRoot}/tree/treeadmin/${row.original.parent_family}/detail`,
                state: row.original,
              }}
            >
              {cell.value}
            </Link>
          );
        },
      },
      {
        Header: "Description",
        accessor: "desc_goals",
        sortable: true,
        headerClassName: "text-muted text-small text-uppercase w-10",
      },
      {
        Header: "PIC",
        accessor: "pic_goals",
        sortable: true,
        headerClassName: "text-muted text-small text-uppercase w-10",
      },
      {
        Header: "Last Modified",
        accessor: "last_modified_date",
        sortable: true,
        headerClassName: "text-muted text-small text-uppercase w-20",
      },
      {
        Header: "Tag",
        accessor: "tag",
        sortable: true,
        headerClassName: "text-muted text-small text-uppercase w-10",
        Cell: ({ cell }) => {
          return <Badge bg="outline-primary">{cell.value}</Badge>;
        },
      },
    ];
  }, [appRoot]);

  const { currentUser } = useSelector((state) => state.auth);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const tableInstance = useTable(
    {
      columns,
      data: initialGoals,
      setData: setInitialGoals,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  const getInitialGoals = () => {
    let result = null;
    setIsLoading(true);
    InitialGoalsAdmin(currentUser.token)
      .then(function (response) {
        if (response) {
          console.log(response);
          if (response.responseCode === 200) {
            result = response.responseData;
            setInitialGoals(result);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClickAddParentButton = () => {
    const path = `${appRoot}/tree/treeadmin/addchild`;
    history.push({
      pathname: path,
      state: {
        id: null,
        title: null,
      },
    });
  };

  useEffect(() => {
    getInitialGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HtmlHead title={title} description={description} />

      <Row>
        <Col>
          <div className="page-title-container">
            <Row>
              <Col xs="12" md="7">
                <h1 className="mb-0 pb-0 display-4">{title}</h1>
                <BreadcrumbList items={breadcrumbs} />
              </Col>
              <Col
                xs="12"
                md="5"
                className="d-flex align-items-start justify-content-end"
              >
                <Button
                  variant="outline-primary"
                  className="btn-icon btn-icon-start w-100 w-md-auto add-datatable"
                  onClick={handleClickAddParentButton}
                >
                  <CsLineIcons icon="plus" /> <span>Add New Parent</span>
                </Button>
              </Col>
            </Row>
          </div>

          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  {/* <ControlsSearch tableInstance={tableInstance} /> */}
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none"></div>
                <div className="d-inline-block">
                  {/* <ControlsPageSize tableInstance={tableInstance} /> */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table
                  className="react-table rows"
                  tableInstance={tableInstance}
                />
              </Col>
              <Col xs="12">
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <TablePagination
                    id="table-treeadmin"
                    tableInstance={tableInstance}
                  />
                )}
              </Col>
            </Row>
          </div>
          <ModalAddEdit tableInstance={tableInstance} />
        </Col>
      </Row>
    </>
  );
};

export default TreeAdminIndex;
