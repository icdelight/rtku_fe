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
import { GetAllUsers, FindUsers } from '../../services/userservice';
import { DEFAULT_PATHS } from '../../config';

const RowInd = function(propss){
    const {name, firstname, role, area, subarea, createDate, onClick} = propss;

    const newDate= new Date(createDate); 
    const cratedString = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(newDate);
    // console.log(cratedString)
           
    return (
      <Card className="mb-2">
      <Row className="g-0 h-auto sh-sm-19 sh-lg-9">
        <Col xs="12" sm="auto">
          <img src="/img/profile/profile-12.gif" className="card-img card-img-horizontal-sm rounded-xl sh-10 h-sm-100 sw-lg-9 sw-sm-12" alt="thumb" />
        </Col>
        <Col xs="12" className="col-sm">
          <Card.Body className="pt-sm-0 pb-sm-0 h-100">
            <Row className="g-0 h-100 align-content-center">
              <Col lg="2" className="d-flex flex-column mb-lg-0 mb-3 mb-lg-0 pe-3 d-flex">
                  <div className="lh-1">{name}</div>
                  <div className="text-small text-muted text-truncate">{firstname}</div>
              </Col>
              <Col xs="4" sm="4" lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-lg-end">
                <div className="lh-1 text-alternate" style={{textAlign:"left"}}>{role}</div>
                <div className="text-muted text-small" style={{textAlign:"left"}}>Role</div>
              </Col>
              <Col xs="4" sm="4" lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-lg-end">
                <div className="lh-1 text-alternate" style={{textAlign:"center"}}>{area}</div>
                <div className="text-muted text-small" style={{textAlign:"center"}}>Area</div>
              </Col>
              <Col xs="4" sm="4" lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-lg-end">
                <div className="lh-1 text-alternate" style={{textAlign:"center"}}>{subarea}</div>
                <div className="text-muted text-small" style={{textAlign:"center"}}>Sub Area</div>
              </Col>
              <Col xs="10" sm="11" lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-lg-end">
                <div className="lh-1 text-alternate pe-2" style={{textAlign:"left"}}>{cratedString}</div>
                <div className="text-muted text-small pe-2" style={{textAlign:"left", alignItems:"left"}}>Created</div>
              </Col>
              <Col xs="2" sm="1" lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-lg-end">
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

const UserSettingPage = () => {
  const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
  const history = useHistory();
  const title = 'User Setting Page';
  const description = 'List of Users.';
  const { currentUser, isLogin } = useSelector((state) => state.auth);

  const rowsId = [];
  // const [rowState, setRowState] = useState(rowsId);
  const [ds, getUsers] = useState(rowsId);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const breadcrumbs = [{ to: '', text: 'Home' }];

  const getAllUsers = (paging) => { 
    setLoading(true);
    let result = null;
    GetAllUsers(currentUser.token, paging).then(function(response) {
      if(response) {
        // console.log(response);
        if(response.responseCode === 200) {
          toast.success(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
          // console.log(response.responseData);
          result = response.responseData;
          getUsers(result);
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

  const findUsers = (paging,search) => { 
    setLoading(true);
    let result = null;
    FindUsers(currentUser.token, paging, search).then(function(response) {
      if(response) {
        // console.log(response);
        if(response.responseCode === 200) {
          toast.success(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
          // console.log(response.responseData);
          result = response.responseData;
          getUsers(result);
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

  const nextPage = () => {
      const paging = page + 1;
      // console.log(values.searchField);
      if(values.searchField != '') {
        findUsers(paging,values.searchField);
      }else{
        getAllUsers(paging);
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
        findUsers(paging,values.searchField);
      }else{
        getAllUsers(paging);
      }
  };

  useEffect(() => {
    getAllUsers(page);
  }, []);


  const onSubmit = (values) => {
    // console.log(values.searchField);
    findUsers(page,values.searchField);
  }

  const clickRows = (val) => {
      // console.log(val);;
      const path = `${appRoot}/setting/usersetting/upduser`; 
        // console.log(path);
      history.push(path,{
          name: val.name,
          flag_active: val.flag_active,
          createdAt: val.createdAt,
          updatedAt: val.updatedAt,
          role: val.role,
          role_name: val.role_name,
          firstname: val.firstName != null ? val.firstName: '',
          lastname: val.lastName != null ? val.lastName: '',
          id_area: val.id_area,
          desc_area: val.desc_area,
          id_sub_area: val.id_sub_area,
          desc_sub_area: val.desc_sub_area,
      });
  };

  const initialValues = { searchField: '' };
  const validationSchema = Yup.object().shape({
    // searchField: Yup.string().required('Search is required'),
  });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Boxed });

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          <section className="scroll-section" id="title">
            <Row className="g-0">
              {/* Title Start */}
              <Col xs="auto" className="mb-2 mb-md-0 me-auto">
                <div className="page-title-container">
                  <h1 className="mb-0 pb-0 display-4">{title}</h1>
                  <BreadcrumbList items={breadcrumbs} />
                </div>
              </Col>
              <div className="w-100 d-md-none" />
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
                        </div>
                        </form> 
                    </div>
                </div> 
              </Col>
            </Row>
            {/* <section className="scroll-section" id="responsiveVertical"> */}
            <h2 className="small-title">List Users</h2>
            <Row className="mb-5">
              <Col>
                <div className="display-data-Container">
                    {ds.map((row, idx) => {
                      delete row.pass;
                      return(
                        <RowInd 
                          key={idx}
                          name={row.name}
                          firstname={row.firstName}
                          role={row.role_name}
                          area={row.desc_area}
                          subarea={row.desc_sub_area}
                          createDate={row.createdAt}
                          onClick={(e) => clickRows(row)}
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
          {/* Title End */}
        </Col>
      </Row>
    </>
  );
};

export default UserSettingPage;
