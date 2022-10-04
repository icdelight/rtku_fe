import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Card, Form, InputGroup, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';
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
import { GetParentAreasSelection, GetAllAreasSelection, AddAreaService } from '../../services/areaservice';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const RegionArea = function(propss){
    const {role, valueAreas, setValueAreas, optParents} = propss;
    if(role !== 'superadmin') {
        return (<div></div>);
    }
    return (
        <Row className="mb-2 filled tooltip-end-top">
            <Col lg="2" md="3" sm="4">
                <Form.Label className="col-form-label">Region Area</Form.Label>
            </Col>
            <Col sm="8" md="9" lg="10">
                <Select classNamePrefix="react-select" name="desc_area" id="desc_area" options={optParents} value={valueAreas} onChange={setValueAreas} placeholder="Region" />
            </Col>
        </Row>
    );
}

const ButtonRegion =  function(propss){
    const {role, onclick} = propss;
    if(role !== 'superadmin') {
        return (<div></div>);
    }
    return (
        <Col xs="12" sm="6" md="auto" className="d-flex align-items-start justify-content-end order-3 order-sm-2">
            <button id="button-addon" type="submit" className="btn btn-outline-warning" onClick={onclick} >
                <CsLineIcons icon="plus" className="me-2" size="17" /> New Region
            </button>
        </Col>
    );
}

const AddArea = (props) => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const states = props;
    const area = states.location.state;
    const ref = useRef(null);
    const [isChecked, setIsChecked] = useState(false);

    const title = 'Add New Area Page';
    const description = 'An page for adding new area.';
    const breadcrumbs = [
        { to: ``, text: 'Home' },
        { to: `setting/areasetting`, text: 'Area Setting' },
    ];

    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const id_area = currentUser.id_area;
    const desc_area = currentUser.desc_area;
    // console.log(currentUser);
    const [isLoading, setLoading] = useState(true);
    const options = [];
    const [optRegion, setOptRegion] = useState(options);
    const [optParent, setOptParent] = useState(options);
    const [valueRegion, setValueRegion] = useState();
    const [valueParent, setValueParent] = useState();
    const [valueArea, setValueArea] = useState();

    const fetchParentArea = () => {
        setLoading(true);
        GetAllAreasSelection(currentUser.token,id_area,desc_area).then(function(response) {
            if(response) {
            //   console.log(response);
              if(response.responseCode === 200) {
                // toast.success(response.responseDesc, {
                //   position: "top-right",
                //   autoClose: 1000,
                // });
                // const objSelected = {
                //     value: area.idparentarea,
                //     label: area.descparentarea,
                // };
                // setValueParent(objSelected);
                setOptParent(response.responseData);
                // setLoading(false);
              }else{  
                // toast.error(response.responseDesc, {
                //   position: "top-right",
                //   autoClose: 5000,
                // });
                setLoading(false);
              }
            }
        });

        GetParentAreasSelection(currentUser.token,id_area,desc_area).then(function(response) {
            if(response) {
            //   console.log(response);
              if(response.responseCode === 200) {
                // toast.success(response.responseDesc, {
                //   position: "top-right",
                //   autoClose: 1000,
                // });
                // const objSelected = {
                //     value: area.idparentarea,
                //     label: area.descparentarea,
                // };
                // setValueParent(objSelected);
                setOptRegion(response.responseData);
                setLoading(false);
              }else{  
                // toast.error(response.responseDesc, {
                //   position: "top-right",
                //   autoClose: 5000,
                // });
                setLoading(false);
              }
            }
        });
    };

    const initialValues = { 
        desc_area: currentUser.desc_area, 
        id_area: currentUser.id_area,
        desc_parent_area: '',
        desc_sub_area: '',
    };
    const validationSchema = Yup.object().shape({
        desc_area: Yup.string().required('Area Region is required'),
        desc_sub_area: Yup.string().required('Sub Area is required'),
    });
    const onSubmit = (values) => {
        console.log(values);
        let act = "0";
        if (ref.current.checked) {
            act = "1";
        } 
        let id_area = currentUser.id_area;
        let desc_area = currentUser.desc_area;
        if(currentUser.role == 'superadmin') {
            id_area = valueArea.value;
            desc_area = valueArea.label;
        }
        AddAreaService(currentUser.token,id_area,desc_area,values.desc_sub_area,valueParent.value,act).then(function(response) {
            if(response) {
              console.log(response);
              if(response.responseCode === 200) {
                toast.success(response.responseDesc, {
                  position: "top-right",
                  autoClose: 1000,
                });
                const path = `${appRoot}/setting/areasetting`; 
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
        const path = `${appRoot}/setting/areasetting`; 
        history.push(path);
    };
    const handleaddregion = () => {
        const path = `${appRoot}/setting/areasetting/addarea/addregion`; 
        history.push(path);
    };
    const handleChecked = () => {
        setIsChecked(!isChecked);
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;

    useEffect(() => {
        fetchParentArea();
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
                <div className="w-100 d-md-none" />
                <ButtonRegion 
                    role = {currentUser.role}
                    onClick = {() => handleaddregion()}
                />
            </Row>
            <Row>
                <Col>
                    <h2 className="small-title">Area Info</h2>
                    <Form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                    <Card className="mb-2">
                        <Card.Body className="p-3">
                            <RegionArea 
                                role = {currentUser.role}
                                valueAreas = {valueRegion}
                                setValueAreas = {setValueRegion}
                                optParents = {optRegion}
                            />
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Parent Area</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    {/* <Form.Control type="text" name="desc_parent_area" id="desc_parent_area" value={values.desc_parent_area}  onChange={handleChange} readOnly={values.id_sub_area == 1? 1 : 0}/> */}
                                    <Select classNamePrefix="react-select" name="desc_parent_area" id="desc_parent_area" options={optParent} value={valueParent} onChange={setValueParent} placeholder="" />
                                    {errors.desc_parent_area  && touched.desc_parent_area && <div className="d-block invalid-tooltip">{errors.desc_parent_area}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Sub Area</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="desc_sub_area" id="desc_sub_area" value={values.desc_sub_area}  values={values.desc_sub_area} onChange={handleChange}/>
                                    {errors.desc_sub_area  && touched.desc_sub_area && <div className="d-block invalid-tooltip">{errors.desc_sub_area}</div>}
                                </Col>
                            </Row>
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

export default AddArea;