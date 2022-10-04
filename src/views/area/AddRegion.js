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
import { AddRegionService } from '../../services/areaservice';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const AddRegion = (props) => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const states = props;
    const area = states.location.state;
    const ref = useRef(null);
    const [isChecked, setIsChecked] = useState(false);

    const title = 'Add New Region';
    const description = 'An page for adding new region.';
    const breadcrumbs = [
        { to: ``, text: 'Home' },
        { to: `setting/areasetting`, text: 'Area Setting' },
        { to: `setting/areasetting/addarea`, text: 'Add Area' },
    ];

    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const initialValues = { 
        desc_area: '', 
        id_area: '',
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
        AddRegionService(currentUser.token,values.desc_area,values.desc_sub_area,act).then(function(response) {
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
        const path = `${appRoot}/setting/areasetting/addarea`; 
        history.push(path);
    };
    const handleChecked = () => {
        setIsChecked(!isChecked);
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;

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
                    <h2 className="small-title">Area Info</h2>
                    <Form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                    <Card className="mb-2">
                        <Card.Body className="p-3">
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Area</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="desc_area" id="desc_area" value={values.desc_area}  values={values.desc_area} onChange={handleChange}/>
                                    {errors.desc_area  && touched.desc_area && <div className="d-block invalid-tooltip">{errors.desc_area}</div>}
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
export default AddRegion;