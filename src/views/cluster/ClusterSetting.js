import {React,useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, Form , Button, Pagination} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GetAllCluster, FindCluster } from '../../services/clusterservice';
import { GetAllAreas, FindAreas } from '../../services/areaservice';
import { DEFAULT_PATHS } from '../../config';

const RowInd = function(propss){
    const {idcluster, idarea, desccluster, descarea, createdat, modifiedat, subareas, active, onClickSubArea, onClick} = propss;
    let newDate= new Date(createdat); 
    const cratedString = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(newDate);
    newDate= new Date(modifiedat); 
    const modString = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(newDate);
    // const newDate= new Date(createDate); 
    // const cratedString = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(newDate);
    // console.log(cratedString)
    // console.log('act',active);
    return (
      <Card className="mb-2">
      <Row className="g-0 h-auto sh-sm-19 sh-lg-9">
        <Col xs="12" sm="auto">
          <img src="/img/logo/locations.gif" className="card-img card-img-horizontal-sm rounded-xl sh-10 h-sm-100 sw-lg-9 sw-sm-12" alt="thumb" />
        </Col>
        <Col xs="12" className="col-sm">
          <Card.Body className="pt-sm-0 pb-sm-0 h-100">
            <Row className="g-0 h-100 align-content-center">
              <Col lg="2" xs="6" sm="6" className="d-flex flex-column mb-lg-0 mb-3 mb-lg-0 pe-3 d-flex">
                  <div className="lh-1">{desccluster}</div>
                  <div className="text-small text-muted text-truncate">Cluster</div>
              </Col>
              <Col lg="2" sm="6" xs="6" className="d-flex flex-column pe-1 mb-2 mb-lg-0 ">
                <div className="lh-1 text-alternate" style={{textAlign:"left"}}>{descarea}</div>
                <div className="text-muted text-small" style={{textAlign:"left"}}>Area</div>
              </Col>
              {/* <Col lg="3" xs="6" sm="6" className="d-flex flex-column mb-lg-0 mb-3 mb-lg-0 pe-3 d-flex">
                <Button size="xs" variant="outline-muted" className="btn-icon btn-icon-only hover-outline" onClick={onClickSubArea}>
                    <CsLineIcons icon="more-horizontal" />
                </Button>
                <div className="text-muted text-small" style={{textAlign:"left"}}>Sub Area</div>
              </Col> */}
              <Col lg="3" sm="6" xs="6" className="d-flex flex-column pe-1 mb-2 mb-lg-0 ">
                <div className="lh-1 text-alternate" style={{textAlign:"left"}}>{cratedString}</div>
                <div className="text-muted text-small" style={{textAlign:"left"}}>Created</div>
              </Col>
              <Col lg="3" sm="6" xs="6" className="d-flex flex-column pe-1 mb-2 mb-lg-0 ">
                <div className="lh-1 text-alternate" style={{textAlign:"left"}}>{modString}</div>
                <div className="text-muted text-small" style={{textAlign:"left"}}>Modified</div>
              </Col>
              <Col lg="1" sm="6" xs="6" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-lg-end">
                <div className="lh-1 text-alternate" style={{textAlign:"left"}}>{active == "1" ? 'Active' : 'Not Active'}</div>
                <div className="text-muted text-small" style={{textAlign:"left"}}>Flag Active</div>
              </Col>
              <Col lg="1" sm="1" xs="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-lg-end">
                <Button size="sm" variant="outline-muted" className="btn-icon btn-icon-only hover-outline" onClick={onClick}>
                  <CsLineIcons icon="edit-square" />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
    );
}

const RowSubs = function(propss) {
    const {id_sub_area, desc_sub_area} = propss;
    return (
        <div className="row mt-0 mb-0">
            <small id="passwordHelpBlock" className="form-text text-muted sm-12">Sub Area {id_sub_area}</small>
            <span className="sm-12"><Card.Text>{desc_sub_area}</Card.Text></span>
        </div>
    );
}

const ClusterSettingPage = () => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const title = 'Cluster Setting Page';
    const description = 'List of Clusters.';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Boxed });
    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const rowsId = [];
    const [ds, getCluster] = useState(rowsId);
    const [dsSub, setSubs] = useState(rowsId);
    const [show,setShow] = useState(false);
    const [rowData, setRow] = useState(true);
 
    const CompClose = () => setShow(false);
    const CompShow = () => setShow(true);

    const getAllCluster = (paging) => {
        setLoading(true);
        let result = null;
        // console.log(paging);
        GetAllCluster(currentUser.token, paging).then(function(response) {
          if(response) {
            // console.log(response);
            if(response.responseCode === 200) {
              toast.success(response.responseDesc, {
                position: "top-right",
                autoClose: 1000,
              });
              // console.log(response.responseData);
              result = response.responseData;
              getCluster(result);
              setLoading(false);
              setPage(paging);
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

    const findCluster = (paging,search) => {
        setLoading(true);
        let result = null;
        if(search == "") {
            getAllCluster(paging);
        }else{
            FindCluster(currentUser.token, paging, search).then(function(response) {
                if(response) {
                // console.log(response);
                if(response.responseCode === 200) {
                    toast.success(response.responseDesc, {
                    position: "top-right",
                    autoClose: 1000,
                    });
                    // console.log(response.responseData);
                    result = response.responseData;
                    getCluster(result);
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
        }
    };

    const addClusterClick = () => {
        const path = `${appRoot}/setting/clustersetting/addcluster`; 
            // console.log(path);
          history.push(path);
    };
  
    const clickRows = (val) => {
        // console.log(val);
        const path = `${appRoot}/setting/clustersetting/editcluster`; 
        // console.log(path);
        history.push(path,{
            idCluster: val.id_cluster,
            namacluster: val.nama_cluster,
            idarea: val.id_area,
            descarea: val.desc_area,
            idsubareas: val.id_sub_areas,
            flagactive: val.flag_active,
        });
    };

    const clickRowsSubArea = (val) => {
        // console.log(val);
        setRow(val);
        const subs = JSON.parse(val.id_sub_areas);
        setSubs(subs);
        CompShow();
    }
  
    const onSubmit = (values) => {
        // console.log(values);
        // console.log(paging);
        findCluster(page,values.searchField);
    };

    const nextPage = () => {
        const paging = page + 1;
        // console.log(values.searchField);
        if(values.searchField != '') {
            findCluster(paging,values.searchField);
        }else{
            getAllCluster(paging);
        }
    };

    const prevPage = () => {
        let paging = 0;
        if(page == 1) {
            paging = page;
        }else{
            paging = page - 1;
        }
        // console.log(values.searchField);
        if(values.searchField != '') {
            findCluster(paging,values.searchField);
        }else{
            getAllCluster(paging);
        }
    };

    const initialValues = { searchField: '' };
    const validationSchema = Yup.object().shape({
        // searchField: Yup.string().required('Search is required'),
    });
    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;

    useEffect(() => {
        getAllCluster(page);
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
  
    return (
        <div className="App2">
        <HtmlHead title={title} description={description} />
        <Row>
            <Col>
                <section className="scroll-section" id="title">
                {/* Title Start */}
                <Row className="g-0">
                      <Col xs="auto" className="mb-2 mb-md-0 me-auto">
                          <div className="page-title-container">
                          <h1 className="mb-0 pb-0 display-4">{title}</h1>
                          <BreadcrumbList items={breadcrumbs} />
                          </div>
                      </Col>
                      {/* Title End */}
                      <div className="w-100 d-md-none" />
                      {/* <Col>
                      <Card className="mb-5" body> */}
                      <Col xs="12" sm="6" md="auto" className="d-flex align-items-start justify-content-end order-3 order-sm-2">
                          <div className="g-0 row mb-3">
                              <div className="d-flex align-items-start justify-content-end justify-content-lg-start col-md col-12">
                                  <form id="searchForm" className="tooltip-end-bottom me-lg-auto w-md-auto search-input-container border border-separator col-12" onSubmit={handleSubmit}>
                                      <div className="input-group">
                                          <Form.Control id="searchField" className="" placeholder="Search" value={values.searchField} onChange={handleChange} />
                                          <button id="button-addon" type="submit" className="btn btn-outline-secondary">
                                              <span className="search-magnifier-icon pe-none">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cs-icon search ">
                                                  <circle cx="9" cy="9" r="7"> </circle>
                                                  <path d="M14 14L17.5 17.5"> </path>
                                                  </svg>
                                              </span>
                                          </button>
                                          <button id="button-addon" type="submit" className="btn btn-outline-warning" onClick={()=>addClusterClick()} >
                                            <CsLineIcons icon="plus" className="me-2" size="17" />
                                          </button>
                                      </div>
                                  </form> 
                              </div>
                          </div> 
                      </Col>
                  </Row>
                  {/* </Card>
                  </Col> */}
                  <Row>
                  </Row>
                  {/* <section className="scroll-section" id="responsiveVertical"> */}
                  <h2 className="small-title">List Clusters</h2>
                  <Row className="mb-5">
                  <Col>
                      <div className="display-data-Container">
                            {ds.map((row, idx) => {
                                delete row.pass;
                                return(
                                    <RowInd 
                                    key={idx}
                                    idcluster={row.id_cluster}
                                    desccluster={row.nama_cluster}
                                    idarea={row.id_area}
                                    descarea={row.desc_area}
                                    subareas={row.id_sub_areas}
                                    createdat={row.createdAt}
                                    modifiedat={row.modifiedAt}
                                    active={row.flag_active}
                                    onClick={(e) => clickRows(row)}
                                    onClickSubArea={(e) => clickRowsSubArea(row)}
                                    /> 
                                )
                            })
                            }
                      </div>
                  </Col>
                  </Row>
                  <div className="mb-5">
                    <nav>
                      <Pagination className="justify-content-center">
                          <Pagination.Prev className="shadow" onClick={() => prevPage()}>
                              <CsLineIcons icon="chevron-left" />
                          </Pagination.Prev>
                          <Pagination.Item className="shadow" disabled>{page}</Pagination.Item>
                          <Pagination.Next className="shadow" onClick={() => nextPage()}>
                              <CsLineIcons icon="chevron-right" />
                          </Pagination.Next>
                      </Pagination>
                    </nav>
                  </div>
                  </section>
              </Col>
              
          </Row>
        <Offcanvas show={show} onHide={CompClose} placement="end" name="end">
            <Offcanvas.Header closeButton className="row">
                <small id="passwordHelpBlock" className="form-text text-muted sm-12">Cluster</small>
                <Offcanvas.Title className="sm-12">
                    {rowData.nama_cluster}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{background:"var(--background-navcolor-dark)"}}>
            <Card className="mb-3" body style={{background:"rgba(255,255,255,.05) !important"}}>
                <Card.Header className="pt-0 pb-1">
                    <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                        <small id="passwordHelpBlock" className="form-text text-muted sm-12">Area</small>
                        <span className="col-md col-6 sm-6">{rowData.desc_area}</span>
                        <span className="col-md col-6 sm-6"> </span>
                    </div>
                </Card.Header>
                <Card.Body>
                    {dsSub.map((row, idx) => {
                        delete row.pass;
                        return(
                            <RowSubs 
                            key={idx}
                            id_sub_area={row.id_sub_area}
                            desc_sub_area={row.desc_sub_area}
                            /> 
                        )
                    })
                    }
                </Card.Body>
            </Card>
            </Offcanvas.Body>
        </Offcanvas>
        </div>
    
    );
};
  
export default ClusterSettingPage;