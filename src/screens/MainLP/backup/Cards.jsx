import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Cards = () => {
  return (
    <Container fluid style={styles.container}>
      <h1
        style={{ fontWeight: "bold", textAlign: "center", color: "blueviolet" }}
      >
        tap into our capabilities
      </h1>
      <Row>
        <Col xs={12} md={4}>
          <div style={styles.card}>
            <img
              style={styles.image}
              src={"/images/Image121.png"}
              alt="Nature"
            />
            <h4 style={styles.heading4}>cnc turning</h4>
            <p style={styles.paragraph}>as fast as 1 days</p>
            <div>
              {[...Array(4)].map((_, i) => (
                <span key={i} className="fa fa-star checked"></span>
              ))}
            </div>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div style={styles.card}>
            <img
              style={styles.image}
              src={"/images/Image122.png"}
              alt="Architecture"
            />
            <h4 style={styles.heading4}>cnc milling</h4>
            <p style={styles.paragraph}>as fast as 2 days</p>
            <div>
              {[...Array(4)].map((_, i) => (
                <span key={i} className="fa fa-star checked"></span>
              ))}
            </div>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div style={styles.card}>
            <img
              style={styles.image}
              src={"/images/Image123.png"}
              alt="People"
            />
            <h4 style={styles.heading4}>3d printing</h4>
            <p style={styles.paragraph}>as fast as 1 day</p>
            <div>
              {[...Array(4)].map((_, i) => (
                <span key={i} className="fa fa-star checked"></span>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      
     
    </Container>
  );
};

export default Cards;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  //height: "100vh",
    justifyContent: "center",
    alignContent: "center",
  },

  card: {
    maxWidth: "300px",

    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
    margin: "30px",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "auto",
    height: "200px",
    marginBottom: "10px",
    backgroundColor: "lightgrey",
  },
  heading4: {
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "20px",
  },
  paragraph: {
    textAlign: "right",
    transform: "translate(0%,130%)",
  },
};
