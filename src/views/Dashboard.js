import React from "react";
// react plugin used to create charts
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
// reactstrap components
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Col} from "reactstrap";
import CountUp from 'react-countup';
// core components


import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import { adminTopCards } from './../components/Shared/dashboardCards.js'
import axios from "axios";

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }




  componentDidMount(){

  }

  render() {


    return (
      <>
        <div className="content">
        <h4>Important :</h4>
          <Row>
          
          {adminTopCards.map((item)=>{

            return (
              <Col lg="6" md="6" sm="6" key={item.id}>
                <Link to={item.link} style={{textDecoration:"none"}}>
                  <Card className="card-stats">
                    <CardBody style={{fontSize:"0.7em"}}>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i className={item.icon} /> 
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="numbers">
                            <CardTitle>{item.label}</CardTitle>
                            <p className="card-category">{item.tag}</p>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <Link to={item.link}>
                          <i className="fas fa-sync-alt" /> {item.linkName}
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </Col>
            );
            
          })}
        </Row>

        <hr />
   
          
        </div>
      </>
    );
  }
}

export default Dashboard;
