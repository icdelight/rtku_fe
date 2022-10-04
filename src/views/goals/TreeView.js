import React from 'react';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';


const initechOrg = {
    name: "Bill Lumbergh",
    actor: "Gary Cole",
    children: [
      {
        name: "Peter Gibbons",
        actor: "Ron Livingston",
        children: [
          {
            name: "And More!!",
            actor: "This is just to show how to build a complex tree with multiple levels of children. Enjoy!"
          }
        ]
      },
      {
        name: "Milton Waddams",
        actor: "Stephen Root"
      },
      {
        name: "Bob Slydell",
        actor: "John C. McGi..."
      },
    ]
};

const MyNodeComponent = ({node}) => {
    return (
      <div className="initechNode" onClick={() => alert(`Hi my real name is:  + ${node.actor}`)}>{ node.name }</div>
    );
};
const title = 'Tree Admin Page';
const description = 'An page for configure the tree view.';

const breadcrumbs = [{ to: '', text: 'Home' }];

function TreeView() {
  return (
    <div>
        <HtmlHead title={title} description={description} />
        <Row>
            <Col>
                {/* Title Start */}
                <section className="scroll-section" id="title">
                <div className="page-title-container">
                    <h1 className="mb-0 pb-0 display-4">{title}</h1>
                    <BreadcrumbList items={breadcrumbs} />
                </div>
                <Card className="mb-5" body>
                    <Card.Text>{description}</Card.Text>
                    <OrgChart 
                    tree={initechOrg} 
                    NodeComponent={MyNodeComponent} />
                </Card>
                </section>
            {/* Title End */}
            </Col>
        </Row>
    </div>
  )
}

export default TreeView