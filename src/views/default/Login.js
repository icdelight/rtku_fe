import React from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import {useSelector , useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { Signin } from '../../services/signin';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  // console.log(currentUser);
  const title = 'Login';
  const description = 'Login Page';

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().min(3, 'Must be at least 6 chars!').required('Password is required'),
  });
  const initialValues = { email: '', password: '' };
  const onSubmit = (values) => {
    // console.log('submit form', values);
    Signin(values.email, values.password, dispatch).then(function(response) {
      // console.log(response);
      if(response) {
        if(response.responseCode === 200) {
          toast.success(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
          const path = `home`; 
          history.push(path);
        }else{  
          toast.error(response.responseDesc, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }
    });
    
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Goals Tree Planner</h1>
            <h1 className="display-3 text-white">Aplikasi Penyusunan Target Rencana Kinerja</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
            Mengintegrasikan seluruh rencana kinerja instansi dengan tetap berfokus pada cluster utama kinerja area anda <br />
            Permudah penata-kerjaan target anda dengan preview as Tree Planner
          </p>
          <div className="mb-5">
            {/* <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
     
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">
            <div className="logo-default" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Selamat Datang,</h2>
          <h2 className="cta-1 text-primary">susun pohon kerja anda</h2>
        </div>
        <div className="mb-5">
          <p className="h6" style={{color:"#000"}}>Silahkan masukkan credentials untuk login.</p>
          <p className="h6" style={{color:"#000"}} >
            Jika anda bukan member, silahkan melakukan <NavLink to="/register">registrasi</NavLink>.
          </p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="email" placeholder="User" value={values.email} onChange={handleChange} />
              {errors.email  && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              {/* <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Forgot?
              </NavLink> */}
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Login;
