import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Card, Form, InputGroup, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
// import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik, Formik, Field } from 'formik';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
// import CsLineIcons from 'cs-line-icons/CsLineIcons';
// import useCustomLayout from 'hooks/useCustomLayout';
import 'react-datepicker/dist/react-datepicker.css';
// import { useWindowSize } from 'hooks/useWindowSize';
import { toast } from 'react-toastify';
import { DEFAULT_PATHS } from '../../config';
import { GetParentAreasSelection, GetAllAreasSelection } from '../../services/areaservice';
import { EditClusterService } from '../../services/clusterservice';
import { LAYOUT } from '../../constants';

const EditCluster = (props) => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const states = props;
    const area = states.location.state;
    console.log(area);
    const ref = useRef(null);
    const [isChecked, setIsChecked] = useState(true);

    const title = 'Add New Cluster';
    const description = 'An page for adding new cluster.';
    const breadcrumbs = [
        { to: ``, text: 'Home' },
        { to: `setting/clustersetting`, text: 'Cluster Setting' },
    ];

    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const id_area = currentUser.id_area;
    const desc_area = currentUser.desc_area;

    const [isLoading, setLoading] = useState(true);
    const options = [];
    const [optParent, setOptParent] = useState(options);
    const [opt, setOpt] = useState(options);
    const [valueParent, setValueParent] = useState();
    const [valueArea, setValueArea] = useState();
    const [valueSubArea, setValueSubArea] = useState();
    const [optSub, setOptSub] = useState(options);

    const indik = area !== undefined && area.idsubareas !== null && area.idsubareas !== "" ? JSON.parse(area.idsubareas) : [];
    const rowsId = [];
    // console.log(indik);
    indik.forEach((el) => {
        const obj = {value:el.id_sub_area};
        rowsId.push(obj);
    });
    // setRowState(rowsId);
    const [rowState, setRowState] = useState(rowsId);

    const fetchParentArea = () => {
        setLoading(true);
        GetParentAreasSelection(currentUser.token,currentUser.id_area).then(function(response) {
            if(response) {
            //   console.log(response);
              if(response.responseCode === 200) {
                toast.success(response.responseDesc, {
                  position: "top-right",
                  autoClose: 1000,
                });
                const objSelected = {
                    value: area.idarea,
                    label: area.descarea,
                };
                setValueArea(objSelected);
                setOptParent(response.responseData);
                setLoading(false);
              }else{  
                toast.error(response.responseDesc, {
                  position: "top-right",
                  autoClose: 5000,
                });
                setLoading(false);
              }
            }
        });
    };

    const getSubArea = (area,sub_area,desc_sub_area) => {
        setLoading(true);
        let result = null;
        GetAllAreasSelection(currentUser.token, area, sub_area).then(function(response) {
            if(response) {
            // console.log(response);
            if(response.responseCode === 200) {
                toast.success(response.responseDesc, {
                    position: "top-right",
                    autoClose: 1000,
                });
                // if(area == user.id_area) {
                    const objSelected = {
                        value: sub_area,
                        label: desc_sub_area,
                    };
                    setValueSubArea(objSelected);
                // }else{
                //     const objSelected = {
                //         value: null,
                //         label: null,
                //     };
                //     setValueSubArea(objSelected);
                // }
                // result = response.responseData;
                // console.log(response.responseData);
                setOptSub(response.responseData);
                setLoading(false);
            }else{  
                toast.error(response.responseDesc, {
                    position: "top-right",
                    autoClose: 5000,
                });
                setLoading(false);

                // if(response.responseCode === 401) {
                //   // dispatch(setCurrentUser(''));
                //   const path = `${appRoot}/login`; 
                //   history.push(path);
                // }
            }
            }
        });
    };

    const initialValues = { 
        nama_cluster: area.namacluster,
    };
    const validationSchema = Yup.object().shape({
        // desc_area: Yup.string().required('Area Region is required'),
        // desc_sub_area: Yup.string().required('Sub Area is required'),
    });
    const onSubmit = (values) => {
        console.log(values);
        let act = "0";
        if (ref.current.checked) {
            act = "1";
        } 
        const subAreas = [];
        EditClusterService(currentUser.token,area.idCluster,values.nama_cluster,valueArea.value,subAreas,act,new Date()).then(function(response) {
            if(response) {
              console.log(response);
              if(response.responseCode === 200) {
                toast.success(response.responseDesc, {
                  position: "top-right",
                  autoClose: 1000,
                });
                const path = `${appRoot}/setting/clustersetting`; 
                history.push(path);
              }else{  
                toast.error(response.responseDesc, {
                  position: "top-right",
                  autoClose: 5000,
                });
              }
            }
        });
    };
    const handleClickBackButton = () => {
        const path = `${appRoot}/setting/clustersetting`; 
        history.push(path);
    };
    const handleChecked = () => {
        setIsChecked(!isChecked);
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;

    useEffect(() => {
        fetchParentArea();
        const area = currentUser.id_area;
        const subarea = currentUser.id_sub_area;
        const descsubarea = currentUser.desc_sub_area;
        getSubArea(area,subarea,descsubarea);
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return (
        <div className="App" style={{  }}>
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
                    <h2 className="small-title">Cluster Info</h2>
                    <Form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                    <Card className="mb-2">
                        <Card.Body className="p-3">
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Cluster Name</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="nama_cluster" id="nama_cluster" value={values.nama_cluster}  onChange={handleChange}/>
                                    {errors.nama_cluster  && touched.nama_cluster && <div className="d-block invalid-tooltip">{errors.nama_cluster}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Area</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    {/* <Form.Control type="text" name="desc_parent_area" id="desc_parent_area" value={values.desc_parent_area}  onChange={handleChange} readOnly={values.id_sub_area == 1? 1 : 0}/> */}
                                    <Select classNamePrefix="react-select" name="desc_area" id="desc_area" options={optParent} value={valueArea} onChange={setValueArea} placeholder="" />
                                    {errors.desc_area  && touched.desc_area && <div className="d-block invalid-tooltip">{errors.desc_area}</div>}
                                </Col>
                            </Row>
                            {/* <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Sub Area</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10" height="200px">  
                                    <InputGroup>
                                        <Button variant="outline-primary" onClick={() => handleClickAddButton()}> 
                                            <CsLineIcons icon="plus" />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <div className="display-data-Container">
                                {rowState.map((row, idx) => {
                                        return(
                                            <RowInd 
                                            key={idx}
                                            value={row.value}
                                            opt={optSub}
                                            valueSubArea={valueSubArea}
                                            setValueSubArea={setValueSubArea}
                                            onChange={(e) => updateValue(e, idx)} 
                                            onDelete={(e) => deleteRows(row.value)}
                                            /> 
                                        )
                                    })
                                }
                            </div> */}
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Flag Active</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Check ref={ref} type="checkbox" className="mt-2" label="active" id="status" name="status" checked={isChecked} onChange={() => handleChecked()}/>
                                    {errors.status  && touched.status && <div className="d-block invalid-tooltip">{errors.status}</div>}
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col lg="2" md="3" sm="4" />
                                <Col sm="8" md="9" lg="10">
                                    <div className="btn-group">
                                        <Button type="submit" variant="outline-primary" className="mb-1">Submit</Button>
                                        <Button id="backButton" name="backButton" type="button" variant="outline-warning" className="mb-1" onClick={() => handleClickBackButton()}>Back</Button>
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
}
export default EditCluster;