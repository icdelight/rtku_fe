import React, { useEffect, useState , Component} from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Signup } from '../../services/signin';
import MyNode from "../../components/node/mynode";
import { TreeView } from '../../services/treeservice';


const title = 'Tree Admin Page';
const description = 'An page for configure the tree view.';

const breadcrumbs = [{ to: '', text: 'Home' }];
let token = null;
export default class TreeAdmin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          goals: null,
        };
        const { currentUser, isLogin } = useSelector((state) => state.auth);
        token = currentUser.token;
    };


    componentDidMount() {
        const Signups  =  TreeView(token).then(function(response) {
            if(response) {
              if(response.responseCode === 200) {
                toast.success(response.responseDesc, {
                  position: "top-right",
                  autoClose: 1000,
                });
                // getGoals(response.responseData);
                this.setState({goals: response.responseData})
              }else{  
                toast.error(response.responseDesc, {
                  position: "top-right",
                  autoClose: 1000,
                });
              }
            }
        });
    }

    render() {
        const {goals} = this.state;
        useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Boxed });
        return (
            <div className="App2">
                <HtmlHead title={title} description={description} />
                <Row>
                    <Col>
                        {/* Title Start */}
                        <section className="scroll-section" id="title">
                        <div className="page-title-container">
                            <h1 className="mb-0 pb-0 display-4">{title}</h1>
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        {/* <Card className="mb-5" body>
                            <Card.Text>{description}</Card.Text> */}
                            <div className="EmptyDiv"> </div>
                            <OrganizationChart
                                datasource={goals}
                                chartClass="myChart"
                                NodeTemplate={MyNode}
                            />
                            {/* </Card> */}
                        </section>
                    {/* Title End */}
                    </Col>
                </Row>
            </div>
          
        );
    }

}