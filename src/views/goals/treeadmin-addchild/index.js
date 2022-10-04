import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Button, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import HtmlHead from "components/html-head/HtmlHead";
import BreadcrumbList from "components/breadcrumb-list/BreadcrumbList";
import CsLineIcons from "cs-line-icons/CsLineIcons";
import useCustomLayout from "hooks/useCustomLayout";
import "react-datepicker/dist/react-datepicker.css";
// import { useWindowSize } from 'hooks/useWindowSize';
import { toast } from "react-toastify";
import { BlockPicker } from "react-color";
import { AddChildTreeService } from "../../../services/treeservice";
import { DEFAULT_PATHS } from "../../../config";
import { LAYOUT } from "../../../constants";
import { GetParentAreasSelection } from "services/areaservice";
import { debounce } from "lodash";
import { FindCluster } from "services/clusterservice";

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

const TreeAdminAddChild = (props) => {
  const appRoot = DEFAULT_PATHS.APP.endsWith("/")
    ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
    : DEFAULT_PATHS.APP;
  const { id } = useParams();
  const history = useHistory();
  const states = props;
  const parent = states.location.state;
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [areas, setAreas] = useState([]);
  const [initialClusters, setInitialClusters] = useState([]);
  useCustomLayout({ layout: LAYOUT.Boxed });
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");
  const isParentMode = !parent.id;

  const rowsId = [];

  const [rowState, setRowState] = useState(rowsId);

  const title = isParentMode ? "Add Parent Page" : "Add Child Page";
  const description = "An page for adding child the tree view node.";
  const breadcrumbs = [
    { to: ``, text: "Home" },
    { to: `tree/treeadmin`, text: "Tree Admin" },
    ...(!isParentMode
      ? [{ to: `tree/treadmin/${id}/detail`, text: "Tree Admin Detail" }]
      : []),
    // {
    //   to: `tree/treeadmin/addchild`,
    //   text: title,
    // },
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
            callback(response.responseData);
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
  };

  const updateValue = (e, idx) => {
    const rows = [...rowState]; // copy array because we don't want to mutate the previous one
    rows[idx].value = e.target.value;
    setRowState(rows);
  };

  const deleteRows = (val) => {
    const rows = [...rowState].filter((e) => e.value !== val);
    // console.log(rows);
    setRowState(rows);
  };

  const validationSchema = Yup.object().shape({
    childTitle: Yup.string().required("Title is required"),
    childDesc: Yup.string().required("Description is required"),
    issueGoals: Yup.string().required("Issue is required"),
    // startDate: Yup.string().required('Start date is required'),
    // dueDate: Yup.string().required('Due date is required'),
  });

  const initialValues = {
    childTitle: "",
    childDesc: "",
    issueGoals: "",
    startDate: "",
    dueDate: "",
    backCol: blockPickerColor,
    idArea: null,
    idCluster: null,
  };

  const onSubmit = (values) => {
    let textCol = "#000";
    // const ind = [];
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
    const payload = {
      title_goals: values.childTitle,
      desc_goals: values.childDesc,
      pic_goals: currentUser.email,
      start_date: startDate,
      due_date: dueDate,
      parent_goals: parent.id || 0,
      type_goals: JSON.stringify(type),
      indikator: indRes ? JSON.stringify(indRes) : null,
      ...(values.idArea && { id_area: values.idArea }),
      ...(values.idCluster && { id_cluster: values.idCluster }),
      issue_goals: values.issueGoals,
    };
    AddChildTreeService(currentUser.token, payload)
      .then(function (response) {
        //   console.log(response);
        if (response) {
          if (response.responseCode === 200) {
            toast.success(response.responseDesc, {
              position: "top-right",
              autoClose: 1000,
            });
            history.goBack();
          } else {
            throw response;
          }
        } else {
          throw response;
        }
      })
      .catch((response) => {
        let message;
        if (typeof response.responseDesc === "string") {
          message = response.responseDesc;
        } else if (Array.isArray(response.responseDesc)) {
          message = response.responseDesc.join(", ");
        }
        toast.error(message, {
          position: "top-right",
        });
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } =
    formik;

  console.log("values", values);

  useEffect(() => {
    fetchParentArea();
    initialFetchClusters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App" style={{}}>
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          {/* Title Start */}
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
          {parent.id && <h2 className="small-title">Parent Info</h2>}

          <Form
            id="loginForm"
            className="tooltip-end-bottom"
            onSubmit={handleSubmit}
          >
            {parent.id && (
              <Card className="mb-3">
                <Card.Body className="p-3">
                  <Row>
                    <Col lg="2" md="3" sm="4">
                      <Form.Label className="col-form-label">
                        Title Parent
                      </Form.Label>
                    </Col>
                    <Col sm="8" md="9" lg="10">
                      <Form.Label
                        type="text"
                        className="col-form-label"
                        text={parent.title}
                        name="parentTitle"
                        id="parentTitle"
                        value={parent.title}
                        defaultValue={parent.title}
                        readOnly={1}
                      >
                        {parent.title}
                      </Form.Label>
                      {errors.parentTitle && touched.parentTitle && (
                        <div className="d-block invalid-tooltip">
                          {errors.parentTitle}
                        </div>
                      )}
                      <Form.Label
                        type="text"
                        name="parentId"
                        id="parentId"
                        defaultValue={parent.id}
                        value={parent.id}
                        readOnly={1}
                        hidden={1}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            <h2 className="small-title">
              {parent.id ? "Child Info" : "Parent Info"}
            </h2>
            <Card className="mb-2">
              <Card.Body className="p-3">
                <Row className="mb-2 filled tooltip-end-top">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      Title {!isParentMode && "Child"}
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      name="childTitle"
                      id="childTitle"
                      values={values.childTitle}
                      value={values.childTitle}
                      onChange={handleChange}
                    />
                    {errors.childTitle && touched.childTitle && (
                      <div className="d-block invalid-tooltip">
                        {errors.childTitle}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-2 filled tooltip-end-top">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      Description {!isParentMode && "Child"}
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      name="childDesc"
                      id="childDesc"
                      value={values.childDesc}
                      onChange={handleChange}
                    />
                    {errors.childDesc && touched.childDesc && (
                      <div className="d-block invalid-tooltip">
                        {errors.childDesc}
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
                    <Form.Label className="col-form-label">Cluster</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    {/* <Form.Control type="text" name="desc_parent_area" id="desc_parent_area" value={values.desc_parent_area}  onChange={handleChange} readOnly={values.id_sub_area == 1? 1 : 0}/> */}
                    <AsyncSelect
                      defaultOptions={initialClusters}
                      cacheOptions
                      classNamePrefix="react-select"
                      placeholder="Search cluster here..."
                      onChange={(e) => setFieldValue("idCluster", e.id_cluster)}
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
                      value={startDate}
                      values={startDate}
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
                    <Form.Label className="col-form-label">Due Date</Form.Label>
                  </Col>
                  <Col sm="4" md="4" lg="4">
                    {/* <Form.Control type="text" name="dueDate" id="dueDate" defaultValue=""/> */}
                    <DatePicker
                      className="form-control"
                      name="dueDates"
                      id="dueDates"
                      value={dueDate}
                      values={dueDate}
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
    </div>
  );
};

export default TreeAdminAddChild;
