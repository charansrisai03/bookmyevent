import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Layout>
        <div className="hp">
          <h2 id="title">Want to be an environmentalist??</h2>
          <h4 id="subtitle">Sign Up for free and join our community!!</h4>
          <div class="row">
            <div class="col">
              <Link to="/ongoingevents" class="text-decoration-none">
              <div class="card" id="firstimage" style={{width: "20rem",height:"20rem"}}>
                  <img src="./ongoingevents.jpg" class="card-img-top" alt="..." style={{width: "20rem",height:"15rem"}}/>
                  <div class="card-body">
                    <h5 class="card-title" id="cardtitle">Up coming events</h5>
                    <p class="card-text" id="carddesc">Check all the events happening</p>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col">
            <Link to="/yourparticipations" class="text-decoration-none">
              <div class="card" id="secondimage" style={{width: "20rem",height:"20rem"}}>
                  <img src="./yourparticipations.jpg" class="card-img-top" alt="..." style={{width: "20rem",height:"15rem"}}/>
                  <div class="card-body">
                    <h5 class="card-title" id="cardtitle">Your PARTICIPIONS</h5>
                    <p class="card-text" id="carddesc">Check all the events you participated</p>
                  </div>
                </div>
              </Link>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <Link to="/hostanevent" class="text-decoration-none">
              <div class="card" id="thirdimage" style={{width: "20rem",height:"20rem"}}>
                  <img src="./hostanevent.avif" class="card-img-top" alt="..." style={{width: "20rem",height:"15rem"}}/>
                  <div class="card-body">
                    <h5 class="card-title" id="cardtitle">HOST AN EVENT</h5>
                    <p class="card-text" id="carddesc">Want to host an event!</p>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col">
            <Link to="/yourevents" class="text-decoration-none">
              <div class="card" id="fourthimage" style={{width: "20rem",height:"20rem"}}>
                  <img src="./yourevents.jpg" class="card-img-top" alt="..." style={{width: "20rem",height:"15rem"}}/>
                  <div class="card-body">
                    <h5 class="card-title" id="cardtitle">YOUR EVENTS</h5>
                    <p class="card-text" id="carddesc">See the events you participated</p>
                  </div>
                </div>
              </Link>
            </div>
            </div>
          </div>
    </Layout>
  );
};

export default HomePage;
