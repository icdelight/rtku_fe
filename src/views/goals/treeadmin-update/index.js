import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import HtmlHead from "components/html-head/HtmlHead";
import BreadcrumbList from "components/breadcrumb-list/BreadcrumbList";
import CsLineIcons from "cs-line-icons/CsLineIcons";
import useCustomLayout from "hooks/useCustomLayout";
import "react-datepicker/dist/react-datepicker.css";
import { useWindowSize } from "hooks/useWindowSize";
import { toast } from "react-toastify";
import { BlockPicker } from "react-color";
import { EditNode } from "../../../services/treeservice";
import { DEFAULT_PATHS } from "../../../config";
import { LAYOUT } from "../../../constants";
import { GetParentAreasSelection } from "services/areaservice";
import { FindCluster } from "services/clusterservice";
import { debounce } from "lodash";

const RowInd = function (propss) {
  const { value, onChange, onDelete } = propss;
  // console.log(props);
  return (
    <Row className="mb-2 filled tooltip-end-top">
      <Col lg="2" md="3" sm="4">
        {" "}
      </Col>
      <Col sm="8" md="9" lg="10" height="200px">
        <InputGroup>
          <Form.Control
            name="ind"
            placeholder="Indikator"
            aria-label=""
            value={value}
            onChange={onChange}
          />
          <Button variant="outline-danger" onClick={onDelete}>
            <CsLineIcons icon="multiply" />
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
};

const showModalInitialValue = { isVisible: false, data: null };

const TreeAdminUpdate = (props) => {
  const appRoot = DEFAULT_PATHS.APP.endsWith("/")
    ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
    : DEFAULT_PATHS.APP;
  const history = useHistory();
  const { id } = useParams();
  const states = props;
  const parent = states.location.state;
  // console.log(parent);
  // console.log(parent.title);
  // console.log(rowsId);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [modalConfirmation, setModalConfirmation] = useState(
    showModalInitialValue
  );
  const [areas, setAreas] = useState([]);
  const [initialClusters, setInitialClusters] = useState([]);

  useCustomLayout({ layout: LAYOUT.Boxed });
  const ref = useRef(null);
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const styBack =
    parent.typeGoals.background !== null && parent.typeGoals.background !== ""
      ? parent.typeGoals.background
      : "";
  const [blockPickerColor, setBlockPickerColor] = useState(styBack);

  const indik =
    parent.indikator !== null && parent.indikator !== ""
      ? parent.indikator
      : "";
  const rowsId = [];
  // console.log(indik);
  indik.forEach((el) => {
    const obj = { value: el.indikator };
    rowsId.push(obj);
  });
  // setRowState(rowsId);

  const [rowState, setRowState] = useState(rowsId);

  const title = "Update Node Page";
  const description = "An page for update the tree view node.";
  const breadcrumbs = [
    { to: ``, text: "Home" },
    { to: `tree/treeadmin`, text: "Tree Admin" },
    { to: `tree/treeadmin/${id}/detail`, text: "Tree Admin Detail" },
  ];

  const fetchParentArea = () => {
    GetParentAreasSelection(currentUser.token, currentUser.id_area).then(
      function (response) {
        if (response) {
          //   console.log(response);
          if (response.responseCode === 200) {
            setAreas(response.responseData);
          } else {
            toast.error(response.responseDesc, {
              position: "top-right",
              autoClose: 5000,
            });
          }
        }
      }
    );
  };

  const initialFetchClusters = () => {
    FindCluster(currentUser.token, 1, "").then((response) => {
      if (response) {
        // console.log(response);
        if (response.responseCode === 200) {
          setInitialClusters(response.responseData);
          return;
        } else {
          throw response;
        }
      } else {
        throw response;
      }
    });
  };

  const fetchClusters = (inputValue, callback) => {
    FindCluster(currentUser.token, 1, inputValue)
      .then((response) => {
        if (response) {
          // console.log(response);
          if (response.responseCode === 200) {
            console.log("response.responseData", response.responseData);
            callback(response.responseData);
            setInitialClusters(response.responseData);
            return;
          } else {
            throw response;
          }
        } else {
          throw response;
        }
      })
      .catch((response) => {
        callback([]);
        toast.error(response.responseDesc, {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  const handleClickBackButton = () => {
    history.goBack();
  };

  const handleClickAddIndButton = () => {
    const rows = [...rowState];
    // rows = rowState;
    rows.push({ value: "" });
    // console.log('click button',rows);
    setRowState(rows);
    // console.log(newrows);
    // this.displayData.push(<div  id="display-data"><pre>{this.state.postVal}</pre></div>);
    // this.setState({
    //     showdata : this.displayData,
    //     postVal : ""
    // });
  };

  const updateValue = (e, idx) => {
    const rows = [...rowState]; // copy array because we don't want to mutate the previous one
    rows[idx].value = e.target.value;
    // console.log('update value',rows);
    setRowState(rows);
  };

  const deleteRows = (val) => {
    const rows = [...rowState].filter((e) => e.value !== val);
    // console.log(rows);
    setRowState(rows);
  };

  const onSubmit = (values, isConfirm = false) => {
    let textCol = "#000";
    if (blockPickerColor === "#697689" || blockPickerColor === "#555555") {
      textCol = "#fff";
    }
    const type = {
      background: blockPickerColor,
      color: textCol,
    };
    const indRes = [];
    rowState.forEach((el, idx) => {
      const obj = { key: idx.toString(), indikator: el.value };
      indRes.push(obj);
    });

    if (values.status === "0" && !isConfirm) {
      setModalConfirmation({ isVisible: true, data: values });
      return;
    }

    const payload = {
      id_goals: values.id,
      title_goals: values.title,
      desc_goals: values.desc,
      pic_goals: currentUser.email,
      start_date: startDate,
      due_date: dueDate,
      status_goals: values.status,
      type_goals: JSON.stringify(type),
      indikator: indRes ? JSON.stringify(indRes) : null,
      ...(values.idArea && { id_area: values.idArea }),
      id_cluster: values.idCluster,
      issue_goals: values.issueGoals,
    };
    EditNode(currentUser.token, payload).then(function (response) {
        // console.log(response);
      if (response) {
        if (response.responseCode === 200) {
          toast.success(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
          history.goBack();
        } else {
          toast.error(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
        }
      }
    });
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("Id Title is required"),
    title: Yup.string().required("Title is required"),
    desc: Yup.string().required("Description is required"),
    issueGoals: Yup.string().required("Issue is required"),
    // startDate: Yup.string().required('Start date is required'),
    // dueDate: Yup.string().required('Due date is required'),
  });

  const initialValues = {
    id: parent.id,
    title: parent.title,
    desc: parent.desc,
    startDate: parent.startDate,
    dueDate: parent.dueDate,
    status: parent.status ? `${parent.status}` : "0",
    backCol: blockPickerColor,
    idArea: parent.idArea,
    idCluster: parent.idCluster,
    issueGoals: parent.issueGoals,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (val) => onSubmit(val),
  });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } =
    formik;

  useEffect(() => {
    fetchParentArea();
    initialFetchClusters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App" style={{}}>
      <HtmlHead title={title} description={description} />
      <>
        <Row>
          <Col>
            <section className="scroll-section" id="title">
              <div className="page-title-container">
                <h1 className="mb-0 pb-0 display-4">{title}</h1>
                <BreadcrumbList items={breadcrumbs} />
              </div>
            </section>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="small-title">Node Info</h2>
            <Form
              id="loginForm"
              className="tooltip-end-bottom"
              onSubmit={handleSubmit}
            >
              <Card className="mb-2">
                <Card.Body className="p-3">
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">
                        Id Title
                      </Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10">
                      <Form.Control
                        type="text"
                        name="title"
                        id="title"
                        value={values.id}
                        onChange={handleChange}
                        readOnly={1}
                      />
                      {errors.id && touched.id && (
                        <div className="d-block invalid-tooltip">
                          {errors.id}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">Title</Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10">
                      <Form.Control
                        type="text"
                        name="title"
                        id="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      {errors.title && touched.title && (
                        <div className="d-block invalid-tooltip">
                          {errors.title}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">
                        Description
                      </Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10">
                      <Form.Control
                        type="text"
                        name="desc"
                        id="desc"
                        value={values.desc}
                        onChange={handleChange}
                      />
                      {errors.desc && touched.desc && (
                        <div className="d-block invalid-tooltip">
                          {errors.desc}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">Issue</Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10">
                      <Form.Control
                        type="text"
                        name="issueGoals"
                        id="issueGoals"
                        value={values.issueGoals}
                        onChange={handleChange}
                      />
                      {errors.issueGoals && touched.issueGoals && (
                        <div className="d-block invalid-tooltip">
                          {errors.issueGoals}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">Area</Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10">
                      {/* <Form.Control type="text" name="desc_parent_area" id="desc_parent_area" value={values.desc_parent_area}  onChange={handleChange} readOnly={values.id_sub_area == 1? 1 : 0}/> */}
                      <Select
                        value={areas.find(
                          (item) => item.value === values.idArea
                        )}
                        classNamePrefix="react-select"
                        options={areas}
                        onChange={(e) => setFieldValue("idArea", e.value)}
                        placeholder=""
                      />
                      {errors.idArea && touched.idArea && (
                        <div className="d-block invalid-tooltip">
                          {errors.idArea}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">
                        Cluster
                      </Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10">
                      {/* <Form.Control type="text" name="desc_parent_area" id="desc_parent_area" value={values.desc_parent_area}  onChange={handleChange} readOnly={values.id_sub_area == 1? 1 : 0}/> */}
                      <AsyncSelect
                        defaultValue={{
                          id_cluster: parent.idCluster,
                          nama_cluster: parent.namaCluster,
                        }}
                        defaultOptions={initialClusters}
                        cacheOptions
                        classNamePrefix="react-select"
                        placeholder="Search cluster here..."
                        onChange={(e) =>
                          setFieldValue("idCluster", e.id_cluster)
                        }
                        loadOptions={debounce(fetchClusters, 500)}
                        getOptionValue={(e) => e.id_cluster}
                        formatOptionLabel={({ nama_cluster }) => (
                          <div>
                            <div className="clearfix" />
                            <div>{nama_cluster}</div>
                          </div>
                        )}
                      />
                      {errors.idCluster && touched.idCluster && (
                        <div className="d-block invalid-tooltip">
                          {errors.idCluster}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="2" sm="2">
                      <Form.Label className="col-form-label">
                        Start Date
                      </Form.Label>
                    </Col>
                    <Col sm="4" md="4" lg="4">
                      {/* <Form.Control type="text" name="startDate" id="startDate" defaultValue=""/> */}
                      <DatePicker
                        className="form-control"
                        name="startDates"
                        id="startDates"
                        value={startDate === "" ? parent.startDate : startDate}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      {errors.startDate && touched.startDate && (
                        <div className="d-block invalid-tooltip">
                          {errors.startDate}
                        </div>
                      )}
                    </Col>
                    <Col lg="2" md="2" sm="2">
                      <Form.Label className="col-form-label">
                        Due Date
                      </Form.Label>
                    </Col>
                    <Col sm="4" md="4" lg="4">
                      {/* <Form.Control type="text" name="dueDate" id="dueDate" defaultValue=""/> */}
                      <DatePicker
                        className="form-control"
                        name="dueDates"
                        id="dueDates"
                        value={dueDate === "" ? parent.dueDate : dueDate}
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                      />
                      {errors.dueDate && touched.dueDate && (
                        <div className="d-block invalid-tooltip">
                          {errors.dueDate}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">Status</Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10">
                      <Form.Check
                        type="checkbox"
                        className="mt-2"
                        label="active"
                        id="status"
                        name="status"
                        checked={values.status === "1"}
                        onChange={(e) =>
                          setFieldValue("status", e.target.checked ? "1" : "0")
                        }
                      />
                      {errors.status && touched.status && (
                        <div className="d-block invalid-tooltip">
                          {errors.status}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="2" sm="2">
                      <Form.Label className="col-form-label">
                        Background-color
                      </Form.Label>
                    </Col>
                    <Col sm="4" md="4" lg="4" height="200px">
                      <Form.Control
                        type="text"
                        name="backCol"
                        id="backCol"
                        value={blockPickerColor}
                        values={blockPickerColor}
                        readOnly={1}
                        onChange={handleChange}
                      />
                      {errors.backCol && touched.backCol && (
                        <div className="d-block invalid-tooltip">
                          {errors.backCol}
                        </div>
                      )}
                      <div className="blockpicker">
                        <BlockPicker
                          color={blockPickerColor}
                          onChange={(color) => {
                            setBlockPickerColor(color.hex);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="mb-2 filled tooltip-end-top">
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">
                        Indikator
                      </Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10" height="200px">
                      <InputGroup>
                        {/* <Form.Control name="ind" placeholder="Indikator" aria-label="" /> */}
                        <Button
                          variant="outline-primary"
                          onClick={() => handleClickAddIndButton()}
                        >
                          <CsLineIcons icon="plus" />
                        </Button>
                      </InputGroup>
                    </Col>
                  </Row>
                  {/* <Row className="mb-2 filled tooltip-end-top">
                                    <Col lg="2" md="3" sm="4"> </Col>
                                    <Col sm="8" md="9" lg="10" height="200px">  
                                        <InputGroup>
                                            <Form.Control name="ind" placeholder="Indikator" aria-label="" />
                                            <Button variant="outline-danger">
                                                <CsLineIcons icon="multiply" />
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                </Row> */}
                  <div className="display-data-Container">
                    {rowState.map((row, idx) => {
                      return (
                        <RowInd
                          key={idx}
                          value={row.value}
                          onChange={(e) => updateValue(e, idx)}
                          onDelete={(e) => deleteRows(row.value)}
                        />
                      );
                    })}
                  </div>
                  <Row className="mt-5">
                    <Col lg="2" md="3" sm="4" />
                    <Col sm="8" md="9" lg="10">
                      <div className="btn-group">
                        <Button
                          type="submit"
                          variant="outline-primary"
                          className="mb-1"
                        >
                          Submit
                        </Button>
                        <Button
                          id="backButton"
                          name="backButton"
                          type="button"
                          variant="outline-warning"
                          className="mb-1"
                          onClick={handleClickBackButton}
                        >
                          Back
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </Row>
        <Modal
          show={modalConfirmation.isVisible}
          onHide={() => setModalConfirmation(showModalInitialValue)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Attention</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to deactivate this node ?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setModalConfirmation(showModalInitialValue)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                onSubmit(modalConfirmation.data, true);
                setModalConfirmation(showModalInitialValue);
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default TreeAdminUpdate;
