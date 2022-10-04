import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useHistory, useParams } from "react-router-dom";
import SortableTree from "react-sortable-tree";
import {
  Alert,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import CsLineIcons from "cs-line-icons/CsLineIcons";
import HtmlHead from "components/html-head/HtmlHead";
import BreadcrumbList from "components/breadcrumb-list/BreadcrumbList";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  RemapNode,
  SearchGoals,
  TreeGoals,
  TreeGoalsAdmin,
} from "../../../services/treeservice";
import { DEFAULT_PATHS } from "../../../config";
import SelectServerSide from "components/select/SelectServerSide";

const TreeAdminDetail = ({ location }) => {
  const stateData = location.state;
  const appRoot = DEFAULT_PATHS.APP.endsWith("/")
    ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
    : DEFAULT_PATHS.APP;
  const history = useHistory();
  const { id } = useParams();
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const [treeData, setTreeData] = useState([]);
  const [canvas, setCanvas] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [nodeClicked, clickNode] = useState(true);
  const [show, setShow] = useState(false);
  const [dismissingAlertShow, setDismissingAlertShow] = useState(true);
  const [styleBackround, setStyleBack] = useState(true);
  const [styleColor, setStyleCol] = useState(true);
  const [indData, setInd] = useState(true);
  const [selectedSearch, setSelectedSearch] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const searchGoals = (inputValue, callback) => {
    SearchGoals(currentUser.token, {
      searchTerm: inputValue,
      parent_family: id,
    })
      .then((response) => {
        if (response) {
          // console.log(response);
          if (response.responseCode === 200) {
            callback(response.responseData);
            return;
          }
        }
        callback([]);
      })
      .catch(() => {
        callback([]);
      });
  };
  const getTreeGoals = (idGoals) => {
    let result = [];
    setLoading(true);
    TreeGoalsAdmin(currentUser.token, {
      parent_family: Number(id),
      id_goals: idGoals,
    })
      .then(function (response) {
        if (response) {
          if (response.responseCode === 200) {
            result = response.responseData;
            setTreeData(result);
            setDismissingAlertShow(false);
          } else {
            toast.error(response.responseDesc, {
              position: "top-right",
              autoClose: 1000,
            });
            setTreeData(result?.[0]);
            setDismissingAlertShow(true);
          }
        }
        // console.log(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNodeClick = (node) => {
    // setState({
    //     // nodeClicked: node

    // });
    clickNode(node);
  };

  const handleTreeOnChange = (treeDataS) => {
    // setState({ treeData });
    setTreeData(treeDataS);
  };

  const alertNodeInfo = ({ node, path, treeIndex }) => {
    // console.log(node);
    // console.log(path);
    // console.log(treeIndex);
    const objectString = Object.keys(node)
      .map((k) => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
      .join(",\n   ");

    // alert(
    //   "Info passed to the button generator:\n\n" +
    //     `node: {\n   ${objectString}\n},\n` +
    //     `path: [${path.join(", ")}],\n` +
    //     `treeIndex: ${treeIndex}`
    // );
    setCanvas(node);
    const ind = [];
    node.indikator.forEach((el) => {
      ind.push(
        <Row className="g-0 py-1" key={el.key}>
          <Col xs="auto">
            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
              <div className="sh-3">
                <CsLineIcons
                  icon="dashboard-1"
                  className="text-primary align-top"
                />
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
              <div className="d-flex flex-column">
                <div
                  className="text-alternate mt-n1 lh-1-25"
                  style={{ fontSize: "12px" }}
                >
                  {el.indikator}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      );
    });

    const styBack =
      node.type_goals?.background !== null && node.type_goals?.background !== ""
        ? node.type_goals?.background
        : "";
    const styCol =
      node.type_goals?.color !== null && node.type_goals?.color !== ""
        ? node.type_goals?.color
        : "";
    setStyleBack(styBack);
    setStyleCol(styCol);
    setInd(ind);
    handleShow();
  };

  const resJson = [];
  const loopParseData = (res, data, parent) => {
    if (data) {
      let obj = {};
      data.forEach(function (d, idx, arr) {
        if (d.expanded) {
          // this.loopParseData(d);
          obj = {
            id_goals: d.id_goals,
            parent_goals: parent,
            title_goals: d.title,
            pic_goals: currentUser.email,
          };
          // console.log(`${d.title}, id : ${d.id}, parent : ${parent} Parent of : `);
          // resJson += `${d.title} Parent of : `;
          // console.log(obj);
          loopParseData(res, d.children, d.id_goals);
        } else {
          obj = {
            id_goals: d.id_goals,
            parent_goals: parent,
            title_goals: d.title,
            pic_goals: currentUser.email,
          };
          // resJson += `${d.title}, id : ${d.id}, parent : ${parent}`;
          // console.log(`${d.title}, id : ${d.id}, parent : ${parent}`);
          // console.log(obj);
        }

        res.push(obj);
      });
    }
    return res;
  };

  const handleClickButton = () => {
    // const { treeData } = this.state;
    // const loopData = '';
    // console.log(treeData.keys("children"));
    // treeData.forEach(
    //     function(d) {
    //         console.log(d);
    //         if(d.expanded) {

    //         }
    //     }
    // );
    loopParseData(resJson, treeData, 0);
  };

  const handleClickRemapButton = () => {
    const newMap = loopParseData(resJson, treeData, 0);
    // console.log(newMap);
    RemapNode(currentUser.token, newMap).then(function (response) {
      if (response) {
        if (response.responseCode === 200) {
          toast.success(response.responseDesc, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // console.log(response.responseData);
          // result = response.responseData;
          // console.log(result);
          // getGoals(result);
          // setLoading(false);
          getTreeGoals(
            newMap?.find((item) => item.parent_goals === 0)?.id_goals
          );
        } else {
          toast.error(response.responseDesc, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    });
  };

  const handleClickCancelButton = () => {
    getTreeGoals(stateData?.id_goals);
  };

  const handleClickAddParentButton = (parentCanvas) => {
    // console.log(`${appRoot}/tree/treeadmf/addchild`);
    const path = `${appRoot}/tree/treeadmin/${parentCanvas.id_goals}/addchild`;
    // console.log(path);
    history.push(path, {
      id: parentCanvas.id_goals,
      parentFamilyId: parentCanvas.parent_family,
      title: parentCanvas.title,
    });
  };

  const handleClicUpdkButton = (parentCanvas) => {
    console.log("parentCanvas", parentCanvas);
    const path = `${appRoot}/tree/treeadmin/${parentCanvas.id_goals}/update`;
    // console.log(path);
    history.push(path, {
      id: parentCanvas.id_goals,
      title: parentCanvas.title,
      desc: parentCanvas.desc_goals,
      startDate: parentCanvas.start_date,
      dueDate: parentCanvas.due_date,
      typeGoals: parentCanvas.type_goals,
      indikator: parentCanvas.indikator,
      status: parentCanvas.status_goals,
      idArea: parentCanvas.id_area,
      idCluster: parentCanvas.id_cluster,
      namaCluster: parentCanvas.nama_cluster,
      issueGoals: parentCanvas.issue_goals,
    });
  };

  const handleClickAddButton = (parentCanvas) => {
    // console.log(`${appRoot}/tree/treeadmf/addchild`);
    const path = `${appRoot}/tree/treeadmin/${parentCanvas.id_goals}/addchild`;
    // console.log(path);
    history.push(path, {
      id: parentCanvas.id_goals,
      title: parentCanvas.title,
      parentFamilyId: parentCanvas.parent_family,
    });
  };

  useEffect(() => {
    getTreeGoals(
      selectedSearch ? selectedSearch?.id_goals : stateData?.id_goals
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSearch]);

  // const maxDepth = 5;
  const title = "Tree Admin Page";
  const description = "An page for configure the tree view.";
  const breadcrumbs = [
    { to: "", text: "Home" },
    { to: "tree/treeadmin", text: "Tree Admin" },
  ];

  return (
    <div className="App scroll-out">
      <HtmlHead title={title} description={description} />
      <div className="override-native overflow-auto sh-100 pe-3">
        <Row>
          <Col>
            {/* Title Start */}
            <section className="scroll-section" id="title">
              <div className="page-title-container">
                <h1 className="mb-0 pb-0 display-4">{title}</h1>
                <BreadcrumbList items={breadcrumbs} />
              </div>
              <Card className="mb-2" body>
                <Card.Text>{description}</Card.Text>
                <div className="g-0 row">
                  <div className="col-md col-12 mb-1 mr-2">
                    <SelectServerSide
                      value={selectedSearch}
                      placeholder="Search here..."
                      loadOptions={debounce(searchGoals, 500)}
                      onChange={setSelectedSearch}
                      getOptionLabel={(e) => e.title_goals}
                      getOptionValue={(e) => e.id_goals}
                    />
                  </div>
                  <div className="d-flex align-items-start justify-content-end justify-content-lg-start col-md col-12 mb-1">
                    <Button
                      variant="outline-muted"
                      className="btn-icon btn-icon-start mb-1 mx-2"
                      onClick={() => setSelectedSearch(null)}
                    >
                      <CsLineIcons icon="close" /> <span>Clear</span>
                    </Button>{" "}
                  </div>
                </div>
              </Card>
              <Card className="mb-3" body>
                {dismissingAlertShow && (
                  <Alert
                    variant="alert"
                    onClose={() => setDismissingAlertShow(false)}
                  >
                    <strong>Data goals is empty! </strong> You should add Parent
                    Node.
                  </Alert>
                )}
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <SortableTree
                    className="mb-3"
                    treeData={treeData}
                    onChange={handleTreeOnChange}
                    isVirtualized={false}
                    // maxDepth={maxDepth}
                    generateNodeProps={(rowInfo) => {
                      const { node } = rowInfo;
                      // console.log(node);
                      return {
                        buttons: [
                          <button
                            type="button"
                            key={node}
                            className="btn-xs btn-outline-default"
                            style={{
                              verticalAlign: "middle",
                              background:
                                node.type_goals?.background !== null &&
                                node.type_goals?.background !== ""
                                  ? node.type_goals?.background
                                  : "",
                              color:
                                node.type_goals?.color !== null &&
                                node.type_goals?.color !== ""
                                  ? node.type_goals?.color
                                  : "",
                              width: "50px",
                            }}
                            onClick={() => alertNodeInfo(rowInfo)}
                          >
                            ℹ
                          </button>,
                        ],
                        onClick: () => {
                          handleNodeClick(node);
                        },
                        style:
                          node === nodeClicked
                            ? {
                                border: "3px solid yellow",
                              }
                            : {},
                      };
                    }}
                  />
                )}
                <ButtonGroup aria-label="Basic outlined example">
                  <button
                    type="button"
                    onClick={() => handleClickRemapButton()}
                    className="btn-icon btn-icon-start ms-1 btn btn-outline-primary"
                  >
                    Submit New Map
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClickCancelButton()}
                    className="btn-icon btn-icon-start ms-1 btn btn-outline-warning"
                  >
                    Cancel
                  </button>
                  {dismissingAlertShow && (
                    <button
                      type="button"
                      onClick={() => handleClickAddParentButton(canvas)}
                      className="btn-icon btn-icon-start ms-1 btn btn-outline-primary"
                    >
                      Add Parent
                    </button>
                  )}
                </ButtonGroup>
              </Card>
            </section>
            {/* Title End */}
          </Col>
        </Row>
        <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
          <Offcanvas.Header
            closeButton
            className="row"
            style={{ backgroundColor: styleBackround, color: styleColor }}
          >
            <small
              id="passwordHelpBlock"
              className="form-text text-muted sm-12"
            >
              Title
            </small>
            <Offcanvas.Title className="sm-12">{canvas.title}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{ background: "var(--background-navcolor-dark)" }}
          >
            <Card
              className="mb-3"
              body
              style={{ background: "rgba(255,255,255,.05) !important" }}
            >
              <Card.Header className="pt-0 pb-1">
                <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-muted sm-12"
                  >
                    PIC
                  </small>
                  <span className="col-md col-6 sm-6">{canvas.pic_goals}</span>
                  {/* <span className="col-md col-6 sm-6">{canvas.pic_goals}</span> */}
                </div>
              </Card.Header>
              <Card.Body>
                <div className="row mt-0 mb-0">
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-muted sm-12"
                  >
                    Description
                  </small>
                  <span className="sm-12">
                    <Card.Text>{canvas.desc_goals}</Card.Text>
                  </span>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row mt-0 mb-0">
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-muted sm-12"
                  >
                    Progress
                  </small>
                  <span className="sm-12">
                    <Card.Text>{canvas.progress}</Card.Text>
                  </span>
                </div>
              </Card.Body>
              <Card.Footer className="pt-0 pb-1">
                <div className="row mt-0 mb-0">
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-muted sm-12 col-md col-6"
                  >
                    Start Date
                  </small>
                  <span className="col-md col-6 sm-12">
                    <Card.Text>
                      {dayjs(canvas.start_date).format("DD/MM/YYYY, HH:mm")}
                    </Card.Text>
                  </span>
                </div>
                <div className="row mt-0 mb-0">
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-muted sm-12 col-md col-6"
                  >
                    End Date
                  </small>
                  <span className="col-md col-6 sm-12">
                    <Card.Text>
                      {dayjs(canvas.due_date).format("DD/MM/YYYY, HH:mm")}
                    </Card.Text>
                  </span>
                </div>
              </Card.Footer>
            </Card>
            <Card
              className="mb-3"
              body
              style={{ background: "rgba(255,255,255,.05) !important" }}
            >
              <Card.Header className="pt-0 pb-1">
                <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-muted sm-12"
                  >
                    Indikator :{" "}
                  </small>
                </div>
              </Card.Header>
              <Card.Body className="mb-n2 py-1">{indData}</Card.Body>
            </Card>
            <div className="btn-group">
              <button
                type="button"
                onClick={() => {
                  handleClickAddButton(canvas);
                }}
                className="btn-icon btn-icon-start ms-1 btn btn-outline-primary"
              >
                Add Child
              </button>
              <button
                type="button"
                onClick={() => {
                  handleClicUpdkButton(canvas);
                }}
                className="btn-icon btn-icon-start ms-1 btn btn-outline-warning"
              >
                Update
              </button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default TreeAdminDetail;
