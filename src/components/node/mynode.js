import React, { useState } from "react";
import PropTypes, { node } from "prop-types";
import "./mynode.css";
import { Row, Col, Card } from "react-bootstrap";
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import "bootstrap/dist/css/bootstrap.css";
// import styled from "styled-components";
// import { Link } from 'react-router-dom';
// import CardHeader from 'react-bootstrap/esm/CardHeader';
import CsLineIcons from "cs-line-icons/CsLineIcons";

// const DropDownContainerNew = styled("div")`
//   width: 200px;
//   margin: 0 auto;
// `;

// const DropDownContainerEdit = styled("div")`
//   width: 200px;
//   margin: 0 auto;
// `;

// const DropDownHeaderNew = styled("div")`
//   margin-bottom: 0.8em;
//   padding: 0.4em 2em 0.4em 1em;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
//   font-weight: 500;
//   font-size: 15px;
//   color: #ffffff;
//   background: #6593F5;
//   border-radius:5px;
// `;

// const DropDownHeaderEdit = styled("div")`
//   margin-bottom: 0.8em;
//   padding: 0.4em 2em 0.4em 1em;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
//   font-weight: 500;
//   font-size: 15px;
//   color: #6593F5;
//   background: #ffffff;
//   border-radius:5px;
//   border-color: #6593f5;
//   border-width: 2px;
//   border-style: solid;
// `;

// const DropDownListContainerNew = styled("div")``;
// const DropDownListContainerEdit = styled("div")``;

// const DropDownListNew = styled("ul")`
//   padding:0;
//   margin-bottom: 40px;
//   background: #ffffff;
//   border: 2px solid #e5e5e5;
//   box-sizing: border-box;
//   color: #646464;
//   font-size: 0px;
//   font-weight: 400;
//   &:first-child {
//     padding-top: 0.8em;
//   }
//   border-radius:5px;
// `;

// const DropDownListEdit = styled("ul")`
//  padding:0;
//   margin-bottom: 40px;
//   background: #ffffff;
//   border: 2px solid #e5e5e5;
//   box-sizing: border-box;
//   color: #646464;
//   font-size: 0px;
//   font-weight: 400;
//   &:first-child {
//     padding-top: 0.8em;
//   }
//   border-radius:5px;
// `;

// const ListItemNew = styled("li")`
//   list-style: none;
//   padding:6px;
//   margin-bottom:5px;
//   font-size: 15px;
// `;

// const ListItemEdit = styled("li")`
//   list-style: none;
//   padding:6px;
//   margin-bottom:5px;
//   font-size: 15px;
// `;

const propTypes = {
  // nodeData: PropTypes.object.isRequired
  nodeData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const MyNode = ({ nodeData }) => {
  // console.log(nodeData);
  const [show, setShow] = useState(false);

  //  const CompClose = () => setShow(false);
  const CompShow = () => setShow(true);

  const ind = [];
  if (nodeData !== undefined && nodeData) {
    if (
      nodeData.indikator !== undefined &&
      nodeData.indikator !== null &&
      nodeData.indikator !== []
    ) {
      nodeData.indikator.forEach((el) => {
        // console.log(el);
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
    }
  }
  let back = null;
  let col = null;
  if (nodeData.clustered == "1") {
    if (
      nodeData.id_cluster == undefined ||
      nodeData.id_cluster == null ||
      nodeData.id_cluster == ""
    ) {
      back = "#D8D8D8";
      col = "#000";
    } else {
      if (
        nodeData.type_goals !== undefined &&
        nodeData.type_goals !== "" &&
        nodeData.type_goals !== null
      ) {
        back =
          nodeData.type_goals.background !== null &&
          nodeData.type_goals.background !== ""
            ? nodeData.type_goals.background
            : "";
        col =
          nodeData.type_goals.color !== null && nodeData.type_goals.color !== ""
            ? nodeData.type_goals.color
            : "";
      }
    }
  } else {
    if (
      nodeData.type_goals !== undefined &&
      nodeData.type_goals !== "" &&
      nodeData.type_goals !== null
    ) {
      back =
        nodeData.type_goals.background !== null &&
        nodeData.type_goals.background !== ""
          ? nodeData.type_goals.background
          : "";
      col =
        nodeData.type_goals.color !== null && nodeData.type_goals.color !== ""
          ? nodeData.type_goals.color
          : "";
    }
  }
  //  console.log(back);
  //  console.log(nodeData.id_goals);

  return (
    <div
      className="org-node-container"
      key={nodeData.id_goals !== undefined ? nodeData.id_goals : ""}
      onClick={CompShow}
      style={{
        border: "1px solid #dedede",
        borderRadius: "16px",
      }}
    >
      <div className="sw-40 hover-scale-up cursor-pointer card">
        <div
          className="h-200 py-3 align-items-top card-body"
          style={{ backgroundColor: back, color: col, borderRadius: 10 }}
        >
          <div className="g-0 h-200 align-items-top row">
            <div className="pe-3 col-auto">
              <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cs-icon sync-horizontal text-white"
                >
                  <path d="M3 5 16 5.00001C17.1046 5.00001 18 5.89544 18 7.00001V8M17 15 4.00001 15C2.89544 15 2.00001 14.1046 2.00001 13V12">
                    {" "}
                  </path>
                  <path d="M5 8 2 5 5 2M15 12 18 15 15 18"> </path>
                </svg>
                {/* <canvas className="sw-8 sh-8" width="128" height="128" style={{ display: 'block', bordersizing:'border-box',height:'64px', width:'64px' }} > </canvas> */}
              </div>
            </div>
            <div className="col">
              <div className="gx-2 d-flex align-content-center row">
                <div className="col-14 d-flex col-14">
                  <div
                    className="d-flex align-items-center lh-2-25 "
                    style={{ fontSize: "9px" }}
                  >
                    PIC :{" "}
                    {nodeData.pic_goals !== undefined ? nodeData.pic_goals : ""}
                  </div>
                </div>
                <div className="col-14 d-flex col-14">
                  <div
                    className="cta-2"
                    style={{ fontSize: "14px", color: col }}
                  >
                    {nodeData.title_goals !== undefined
                      ? nodeData.title_goals
                      : ""}
                  </div>
                </div>
                <div className="col-14 d-flex col-14">
                  <div className="d-flex align-items-center lh-1-25 clamp">
                    {nodeData.desc_goals !== undefined
                      ? nodeData.desc_goals
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-100 py-2 align-items-top card-footer">
          <div className="g-0 h-100 align-items-top row">
            <div className="col">
              <div className="gx-2 d-flex align-content-center row">
                <div className="col-14 d-flex col-14">
                  <div
                    className="d-flex align-items-center lh-2-25 "
                    style={{ fontSize: "12px" }}
                  >
                    Indikator :{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="scroll-section" id="default">
            <div className="row">
              <Card>
                <Card.Body className="mb-n2 py-1">{ind}</Card.Body>
              </Card>
            </div>
          </section>
        </div>
      </div>
      {/* <Card bg="warning" text="white" style={{ width: '18rem' }} className="mb-2" onClick={ CompShow }>
        <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
           <Card.Title>{nodeData.title_goals}</Card.Title>
            <Card.Text>
            {nodeData.desc_goals}
            </Card.Text>
          </Card.Body>
          <Card.Footer>2 days ago</Card.Footer>
        </Card> */}

      {/* <Modal className="" show={ show } onHide={ CompClose }>
        <Modal.Header closeButton>
            <Modal.Title><div className="cta-2 text-primary">{nodeData.title_goals}</div></Modal.Title>
        </Modal.Header>
        <Modal.Body className="Model">
            <div className="modelBody"> 
              <form className=''>
                <fieldset disabled>
                    <div className='mb-3 form-floating'>
                      <input disabled className='form-control' value={nodeData.desc_goals !== "" && nodeData.desc_goals !== null ? nodeData.desc_goals : " "} />
                      <label className='form-label'>desc goals</label>
                    </div>
                </fieldset>
                <fieldset disabled>
                    <div className='mb-3 form-floating'>
                      <input disabled className='form-control' value={nodeData.pic_goals !== "" && nodeData.pic_goals !== null ? nodeData.pic_goals : " "} />
                      <label className='form-label'>PIC</label>
                    </div>
                </fieldset>
                <fieldset disabled className='row'>
                    <div className='mb-3 form-floating col-sm-6'>
                      <input disabled className='form-control' value={nodeData.start_date !== "" && nodeData.start_date !== null? nodeData.start_date  : " " } />
                      <label className='form-label'>Start Date</label>
                    </div>
                    <div className='mb-3 form-floating col-sm-6'>
                      <input disabled className='form-control' value={nodeData.due_date !== "" && nodeData.due_date !== null ? nodeData.due_date : " " } />
                      <label className='form-label'>Due Date</label>
                    </div>
                </fieldset>
                <fieldset disabled>
                <div className='mb-3 form-floating'>
                      <input disabled className='form-control' value={nodeData.last_modified_date !== "" && nodeData.last_modified_date !== null? nodeData.last_modified_date : " " } />
                      <label className='form-label'>Last Modify Date</label>
                    </div>
                </fieldset>
                <fieldset disabled>
                    <div className='mb-3 form-floating'>
                      <input disabled className='form-control' value={nodeData.progress !== "" && nodeData.progress !== null ? nodeData.progress : " " } />
                      <label className='form-label'>Progress</label>
                    </div>
                </fieldset>
                <fieldset disabled>
                    <div className='mb-3 form-floating'>
                      <input disabled className='form-control' value={nodeData.type_goals !== "" &&  nodeData.type_goals !== null ? nodeData.type_goals : " " } />
                      <label className='form-label'>Indikator</label>
                    </div>
                </fieldset>
              </form>
            </div>
        </Modal.Body>
        
      </Modal> */}
      {/* <Offcanvas show={show} onHide={CompClose} placement="end" name="end">
          <Offcanvas.Header closeButton className="row">
              <small id="passwordHelpBlock" className="form-text text-muted sm-12">Title</small>
              <Offcanvas.Title className="sm-12">
                  {nodeData.title_goals}
              </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{background:"var(--background-navcolor-dark)"}}>
              <Card className="mb-3" body style={{background:"rgba(255,255,255,.05) !important"}}>
                  <Card.Header className="pt-0 pb-1">
                      <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                          <small id="passwordHelpBlock" className="form-text text-muted sm-12">PIC</small>
                          <span className="col-md col-6 sm-6"> </span>
                          <span className="col-md col-6 sm-6">{nodeData.pic_goals}</span>
                      </div>
                  </Card.Header>
                  <Card.Body>
                      <div className="row mt-0 mb-0">
                          <small id="passwordHelpBlock" className="form-text text-muted sm-12">Description</small>
                          <span className="sm-12"><Card.Text>{nodeData.desc_goals}</Card.Text></span>
                      </div>
                  </Card.Body>
                  <Card.Body>
                      <div className="row mt-0 mb-0">
                          <small id="passwordHelpBlock" className="form-text text-muted sm-12">Progress</small>
                          <span className="sm-12"><Card.Text>{nodeData.progress}</Card.Text></span>
                      </div>
                  </Card.Body>
                  <Card.Footer className="pt-0 pb-1">
                      <div className="row mt-0 mb-0">
                          <small id="passwordHelpBlock" className="form-text text-muted sm-12 col-md col-6">Start Date</small>
                          <span className="col-md col-6 sm-12"><Card.Text>{nodeData.start_date}</Card.Text></span>
                      </div>
                      <div className="row mt-0 mb-0">
                          <small id="passwordHelpBlock" className="form-text text-muted sm-12 col-md col-6">End Date</small>
                          <span className="col-md col-6 sm-12"><Card.Text>{nodeData.due_date}</Card.Text></span>
                      </div>
                  </Card.Footer>
              </Card>
          </Offcanvas.Body>
      </Offcanvas> */}
    </div>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;
