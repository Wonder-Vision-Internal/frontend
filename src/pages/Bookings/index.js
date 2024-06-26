import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import OpenApi from "../../components/OpenApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MyBookings = () => {
  let mail = localStorage.getItem("mail");
  let name = localStorage.getItem("userName");
  const [booking, setBooking] = useState([]);
  const [travellerData, setTravellerData] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const fetchMyBookings = async () => {
    const token = await localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("token", token);
    OpenApi.post(`/get-my-bookings/${mail}`, formData)
      .then((res) => {
        console.log("booking", res.data);
        setBooking(res.data.bookingData);

        {
          travellerData && console.log("tra", travellerData);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="cms-page">
      <HomeHeader />
      <section className="tour-section section-padding mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card padding30 rounded-5">
                <div className="profile_avatar text-center">
                  <div className="profile_img">
                    <img src="../img/client1.jpg" alt />
                  </div>
                  <div className="profile_name">
                    <h4>
                      {name && name}
                      <span className="profile_username text-gray">
                        {mail && mail}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="spacer-20" />
                <ul className="menu-col">
                  <li>
                    <a href="/my-profile">
                      <i className="fa fa-user" />
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a href="/my-bookings" className="active">
                      <i className="fa fa-calendar" />
                      My Bookings
                    </a>
                  </li>

                  <li
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                      toast.success("Logged out");
                    }}
                  >
                    <a href="">
                      <i className="fas fa-sign-out-alt" />
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card padding30 rounded-5">
                <h5>My Bookings</h5>
                {booking.length > 0 ? (
                  <table className="table de-table">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span className="fs-12 text-gray">Booking ID</span>
                        </th>
                        <th scope="col">
                          <span className="fs-12 text-gray">Name</span>
                        </th>
                        <th scope="col">
                          <span className="fs-12 text-gray">Package</span>
                        </th>
                        <th scope="col">
                          <span className="fs-12 text-gray">
                            Booking Details
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking.length > 0 &&
                        booking.map((x, index) => (
                          <tr key={index}>
                            <td>
                              <span className="d-lg-none d-sm-block"></span>
                              <span className="bold">{x.bookingId}</span>
                            </td>
                            <td>
                              <span className="d-lg-none d-sm-block"></span>
                              <span className="bold">{x.name}</span>
                            </td>
                            <td>
                              <span className="d-lg-none d-sm-block"></span>
                              <span className="bold">
                                {x.myBookings[0].title}
                              </span>
                            </td>
                            <td>
                              <button className="view-travellers mt-1">
                                <span className="d-lg-none d-sm-block"></span>
                                <span
                                  className="bold"
                                  onClick={() => {
                                    setTravellerData(x);
                                    setShow(true);
                                    return;
                                  }}
                                >
                                  View Details
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <h4>No Bookings Found</h4>
                )}
                {travellerData && (
                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Booking Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        <b>Name : </b>
                        {travellerData.name}
                      </p>
                      <p>
                        <b>Booking ID : </b>
                        {travellerData.bookingId}
                      </p>
                      <p>
                        <b>Email ID : </b>
                        {travellerData.mail}
                      </p>
                      <p>
                        <b>Contact Number : </b>
                        {travellerData.phone}
                      </p>
                      <p>
                        <b>Address : </b>
                        {travellerData.address}
                      </p>   
                      <p>
                        <b>Journey Date : </b>
                        {travellerData.date}
                      </p>                    
                      <p>
                        <b>Travellers : </b>
                        {travellerData.travellers.map((x, idx) => (
                          <p
                            key={idx}
                            style={{
                              marginLeft: "20%",
                              marginTop: "-5.5%",
                            }}>
                            <span style={{ lineHeight: "2" }}>
                              {x.name}, {x.age} years, {x.gender}
                            </span>
                          </p>
                        ))}
                      </p>
                      {travellerData.sharing && (
                        <p>
                          <b>Sharing : </b>
                          {travellerData.sharing}
                        </p>
                      )}
                      <p>
                        <b>Amount Paid : Rs.</b>
                        {travellerData.amount}
                      </p>
                      <p>
                        <b>Amount Due : Rs.</b>
                        {travellerData.due_amount}
                      </p>                      
                      <p>
                        <b>Transaction ID : </b>
                        {travellerData.transactionId}
                      </p>
                      {travellerData.gst_no && (
                        <p>
                          <b>GST No. : </b>
                          {travellerData.gst_no}
                        </p>
                       )}
                      <p>
                        <b>Booked On : </b>
                        {travellerData.created_at}
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShow(false)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyBookings;
