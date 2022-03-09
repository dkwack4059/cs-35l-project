import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { Container, Button, Card } from "react-bootstrap";
import { firestore } from "../../util/firebaseConfig";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Loading from "../Misc/Loading";
import Popup from "./popup.js";
import "../../images/delta-terrace.jpg";

const FirestoreService = () => {
  const [userReview, setReview] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const ref = collection(firestore, "reviews");
  const [isLoading, setLoading] = useState(true);

  const writeReview = async () => {
    if (userReview.length > 0) {
      try {
        const docRef = await addDoc(ref, {
          review: userReview,
          timestamp: serverTimestamp(),
        });
        console.log("document written with id: ", docRef.id);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // TODO: UPDATE PAGE IN REAL TIME WHEN REVIEW SUBMITTED
  // TODO: DISPLAY DATE OF REVIEW ALONG WITH RATINGS
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(
        query(collection(firestore, "reviews"), orderBy("timestamp", "desc"))
      );
      setAllReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getUsers();
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <Container
      className="justify-content-center"
      style={{
        backgroundColor: "#DAEBFE",
        minHeight: "60vh",
      }}
    >
      <center>
        {/* <h1>This review system uses Firebase Firestore</h1> */}
        <br />
        <br />
        <br />
        <Card
          className="dormPlacard"
          // key={idx}
          style={{
            backgroundColor: "#2774AE",
            width: "60rem",
            height: "23.5rem",
            border: "3px solid",
            color: "#FFD100",
          }}
        >
          <Card.Body>
            <Row>
              <Col>
                <div className="averageRatings">
                  <Card.Title>
                    <h2>Dummy Housing Name</h2>
                    <br></br>
                    {/* <h1>{attr['title']}</h1> */}
                  </Card.Title>

                  <Card.Text>
                    {/* ADD RATING NUMBERS BASED ON DORM */}
                    <h4>{"Overall Rating: " + "Dummy number 0"}</h4>
                  </Card.Text>
                  <br />
                  <Card.Text>
                    {/* ADD RATING NUMBERS BASED ON DORM */}
                    {"Quality of Essentials: " + "Dummy number 1"}
                  </Card.Text>
                  <Card.Text>
                    {/* ADD RATING NUMBERS BASED ON DORM */}
                    {"Access to Food: " + "Dummy Number 2"}
                  </Card.Text>
                  {/* ADD RATING NUMBERS BASED ON DORM */}
                  <Card.Text>{"Noise Level: " + "Dummy Number 3"}</Card.Text>
                  <Card.Text>
                    {"Proximity to Parking: " + "Dummy Number 4"}
                  </Card.Text>
                  <Card.Text>
                    {/* ADD RATING NUMBERS BASED ON DORM */}
                    {"Proximity to Campus: " + "Dummy Number 5"}
                  </Card.Text>

                  {/* <div style={{ border: '3px solid', width: '300px' }}>
                     <center>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={'/' + keys[idx]}
                        // This opens links in a new tab
                        // target="_blank"
                      >
                        <h4>{attr['title'] + ' Page'}</h4>
                      </Link>
                    </center> 
                  </div> */}
                </div>
              </Col>

              <Col>
                <figure className="figure">
                  <img
                    src={require("../../images/delta-terrace.jpg")}
                    className="figure-img img-fluid rounded"
                  ></img>
                </figure>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />
        {/* REPLACE WITH ADD REVIEW BUTTON */}
        <Popup></Popup>
        <br />
        <br />
        <br />
        {allReviews.map((review) => {
          return (
            <div key={review.id} className= "scroll">
              <Card>
                <Card.Body>
                  <Card.Text>
                    <Container>
                      <Row>
                        <Col sm={4}>
                          <Row>accessibility to food</Row>
                          <IoIosStar />
                          <Row>proximity to UCLA</Row>
                          <IoIosStar />
                          <Row>parking</Row>
                          <IoIosStar />
                          <Row>noise level</Row>
                          <IoIosStar />
                          <Row>access to essentials</Row>
                          <IoIosStar />
                        </Col>
                        <Col sm={8}>Review: {review.review}</Col>
                      </Row>
                    </Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </center>
    </Container>
  );
};

export default FirestoreService;