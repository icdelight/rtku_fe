import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CsLineIcons from "cs-line-icons/CsLineIcons";

import {
  InitialGoals,
  TreeGoals,
  TreeViewCluster,
} from "../../../services/treeservice";
import View from "./view";

const TreeViewDabeng = () => {
  // const appRoot = DEFAULT_PATHS.APP.endsWith("/")
  //   ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
  //   : DEFAULT_PATHS.APP;

  const { currentUser } = useSelector((state) => state.auth);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [trees, setTrees] = useState(null);
  const [selectedParents, setSelectedParents] = useState([]);
  const [initialGoals, setInitialGoals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [nodeData, setNode] = useState(true);
  const [indData, setInd] = useState(true);
  const [styleBackround, setStyleBack] = useState(true);
  const [styleColor, setStyleCol] = useState(true);
  const [show, setShow] = useState(false);

  const compClose = () => setShow(false);
  const compShow = () => setShow(true);

  // console.log("trees", trees);

  const handleTreeGoals = (parentFamily, idGoals) => {
    let result = [];
    TreeGoals(currentUser.token, {
      parent_family: Number(parentFamily),
      id_goals: Number(idGoals),
    }).then(function (response) {
      if (response) {
        if (response.responseCode === 200) {
          result = response.responseData;
          const data = result?.[0];
          console.log(data);
          setTrees((prevState) => ({
            ...prevState,
            [data?.id_goals]: data,
          }));
          toast.success(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
        } else {
          toast.error(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
        }
      }
      // console.log(result);
    });
  };

  const getInitialGoals = () => {
    let result = null;
    setLoading(true);
    InitialGoals(currentUser.token)
      .then(function (response) {
        if (response) {
          if (response.responseCode === 200) {
            result = response.responseData;
            setInitialGoals(result);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickCluster = (id_goals, selectedSearch) => {
    const result = "";
    console.log("tes", selectedSearch);
    TreeViewCluster(currentUser.token, id_goals, selectedSearch.id_cluster)
      .then((response) => {
        if (response) {
          if (response.responseCode === 200) {
            // result = response.responseData;

            const data = response.responseData?.[0];
            console.log("result", data);
            setTrees((prevState) => ({
              ...prevState,
              [data?.id_goals]: data,
            }));
            if (selectedSearch) {
              toast.success(response.responseDesc, {
                position: "top-right",
                autoClose: 1000,
              });
            }
          } else {
            toast.error(response.responseDesc || "Failed to fetch cluster", {
              position: "top-right",
              autoClose: 1000,
            });
          }
        }
        // callback([]);
      })
      .catch((error) => {
        toast.error(error || "Failed to fetch cluster", {
          position: "top-right",
          autoClose: 1000,
        });
        // callback([]);
      });
  };

  const handleNodeClicked = (nodes) => {
    compShow();
    const ind = [];
    if (nodes !== undefined && nodes) {
      nodes.indikator.forEach((el) => {
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
    // console.log(nodes.type_goals);
    let styBack = null;
    let styCol = null;
    if (
      nodeData.type_goals !== undefined &&
      nodeData.type_goals !== "" &&
      nodeData.type_goals !== null
    ) {
      styBack =
        nodes.type_goals.background !== null &&
        nodes.type_goals.background !== ""
          ? nodes.type_goals.background
          : "";
      styCol =
        nodes.type_goals.color !== null && nodes.type_goals.color !== ""
          ? nodes.type_goals.color
          : "";
    }
    setStyleBack(styBack);
    setStyleCol(styCol);
    setInd(ind);
    setNode(nodes);
  };

  const title = "Tree Views Page";
  const description = "An page for view all goals as a tree view.";
  const breadcrumbs = [{ to: "", text: "Home" }];

  useEffect(() => {
    getInitialGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <View
      title={title}
      description={description}
      selectedSearch={selectedSearch}
      show={show}
      selectedParents={selectedParents}
      trees={trees}
      initialGoals={initialGoals}
      indData={indData}
      nodeData={nodeData}
      breadcrumbs={breadcrumbs}
      styleBackround={styleBackround}
      styleColor={styleColor}
      onNodeClicked={handleNodeClicked}
      onCompShow={compShow}
      onCompClose={compClose}
      onSelectedParents={setSelectedParents}
      onTreeLoaded={handleTreeGoals}
      onClickCluster={handleClickCluster}
      onClickClearCluster={handleTreeGoals}
      onSelectedSearch={setSelectedSearch}
    />
  );
};

export default TreeViewDabeng;
