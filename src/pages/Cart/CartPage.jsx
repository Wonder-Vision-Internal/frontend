import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import { useParams } from "react-router-dom";
import OpenApi from "../../components/OpenApi";
import { event } from "jquery";
import { useForm } from "react-hook-form";

const CartPage = () => {
  const { slug } = useParams();
  const [priceDetails, setPriceDetails] = useState([]);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState();
  const [sharing, setSharing] = useState();
  const [total, setTotal] = useState();
  const [advance, setAdvance] = useState();
  const [index, setIndex] = useState(2);
  const [content, setContent] = useState();
  const [date, setDate] = useState([]);
  const [travelDate, setTravelDate] = useState();
  const [title, setTitle] = useState();
  const [p_id, setP_id] = useState();
  const [travellerDetails, setTravellerDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);
  const [err, setErr] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchPriceDetails = async () => {
    const res = await OpenApi.get(`get-price-details/${slug}`);
    console.log({ res });
    setPriceDetails(res.data.priceDetails);
    setPrice(res.data.priceDetails[0].price);
    setName(res.data.name);
    setP_id(res.data.post_id);
    setSharing(res.data.priceDetails[0].description);
    priceCalc(1, res.data.priceDetails[0].price);
  };

  const getContent = async () => {
    let datas = await OpenApi.get("get-package-details/" + slug);
    let str = await datas.data.postDetails.other_details[0].starts_from;
    if (str) {
      setDate(str.split("&"));
      setTravelDate(str.split("&")[0]);
    } else {
      setDate([]);
      setTravelDate();
    }

    setContent(
      JSON.parse(datas.data.postDetails.other_details[0].other_details)[1]
        .content
    );
    setTitle(datas.data.postDetails.title);
  };

  const handlePayment = async (input, e) => {
    e.preventDefault();
    let len = travellerDetails.length;
    console.log("input", input);
    if (
      travellerDetails[0].name === "" ||
      travellerDetails[0].age == "" ||
      travellerDetails[0].gender === ""
    ) {
      setErr("*Please Enter Details");
    } else if (
      travellerDetails[len - 1].name === "" ||
      travellerDetails[len - 1].age === "" ||
      travellerDetails[len - 1].gender === ""
    ) {
      setErr("*Please Remove Empty Passenger Details");
    } else {
      try {
        let datas = await OpenApi.get(
          `payment?name=${input.f_name}+${
            input.l_name
          }&travellers=${JSON.stringify(
            travellerDetails
          )}&amount=${advance}&due=${total - advance}&number=${
            input.phone
          }&MUID=${"MUID" + Date.now()}&transactionId=${Date.now()}&mail=${
            input.mail
          }&pid=${p_id}&address=${input.address}&person=${
            travellerDetails.length
          }
          &date=${travelDate}&gst_no=${input.gst_no}&sharing=${
            sharing && sharing
          }`
        );
        console.log("phone Pay===", datas.data);
        window.location.href = datas.data.url;
      } catch (error) {
        console.log("catch", error);
      }
      setErr("");
    }
  };

  useEffect(() => {
    fetchPriceDetails();
    getContent();
  }, []);

  useEffect(() => {
    priceCalc(travellerDetails.length, price);
  }, [price, travellerDetails.length]);

  const priceCalc = (person, price) => {
    setTotal(price * person + 0.05 * price * travellerDetails.length);
  };

  function getAdvanceAmount() {
    let advance_amount =
      index == 2
        ? total
        : index == 1
        ? total * 0.5
        : index == 0
        ? total * 0.25
        : null;
    setAdvance(advance_amount);
  }

  useEffect(() => {
    getAdvanceAmount();
  }, [total, index]);

  const handleAddPassenger = () => {
    setErr("");
    let len = travellerDetails.length;

    if (
      travellerDetails[len - 1].name === "" ||
      travellerDetails[len - 1].age === "" ||
      travellerDetails[len - 1].gender === ""
    ) {
      setErr("*Please Enter Details");
    } else {
      let newTraveller = [...travellerDetails];
      newTraveller.push({ name: "", age: "", gender: "" });
      setTravellerDetails([...newTraveller]);
    }
  };

  const handleTravellerChange = (e, index) => {
    setErr("");
    let { name, value } = e.target;
    if ((name === "name" || name === "gender") && /\d/.test(value)) {
      e.target.value = "";
      setErr("*Only alphabets are allowed");
      return;
    } else if (name === "age" && isNaN(value)) {
      e.target.value = "";
      setErr("*Only numbers are allowed");
      return;
    } else {
      let newTraveller = [...travellerDetails];
      if (name === "gender") {
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
      newTraveller[index][name] = value;
      setTravellerDetails(newTraveller);
    }
  };

  const handleDelete = async (index) => {
    if (travellerDetails.length == 1) {
      setErr("*Add at least one traveller");
    } else {
      const newTravellerDetails = await [...travellerDetails];
      newTravellerDetails.splice(index, 1);
      console.log("n", newTravellerDetails);
      setTravellerDetails(newTravellerDetails);
      setErr("");
    }
  };

  useEffect(() => {
    console.log("Updated travellerDetails:", travellerDetails);
  }, [travellerDetails]);

  return (
    <div className="cms-page">
      <HomeHeader />
      <section className="tour-section section-padding mt-5">
        <div className="container">
          <div className="text-center">
            <h4 className="small-head">Find your</h4>
            <span className="stylish-head mt-0">Cart</span>
          </div>

          <div className="row about-box">
            <form
              className="row g-3 black-form form"
              onSubmit={handleSubmit(handlePayment)}
            >
              <div className="col-md-8">
                <h3 className="destination-head mb-3">{title && title}</h3>

                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header mb-0" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Billing And Traveller Details
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <h3>Traveller Details</h3>
                        {travellerDetails &&
                          travellerDetails.map((traveller, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-space-between align-items-center"
                            >
                              <div className="col-5">
                                <label
                                  htmlFor={`travellerName${travellerDetails.length}`}
                                  className="form-label"
                                >
                                  Traveller {index + 1}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Name"
                                  name="name"
                                  value={traveller.name}
                                  onChange={(e) =>
                                    handleTravellerChange(e, index)
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <label
                                  htmlFor={`travellerName${travellerDetails.length}`}
                                  className="form-label"
                                >
                                  Age
                                </label>
                                <input
                                  className="form-control"
                                  // placeholder="Age"
                                  name="age"
                                  value={traveller.age}
                                  onChange={(e) =>
                                    handleTravellerChange(e, index)
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <label
                                  htmlFor={`travellerName${travellerDetails.length}`}
                                  className="form-label"
                                >
                                  Gender
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  // placeholder="Gender"
                                  name="gender"
                                  value={traveller.gender}
                                  onChange={(e) =>
                                    handleTravellerChange(e, index)
                                  }
                                />
                              </div>
                              <button
                                className="del-butt"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(index);
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                              {index == travellerDetails.length - 1 ? (
                                <button
                                  type="button"
                                  className="add-more"
                                  onClick={handleAddPassenger}
                                >
                                  <i class="fas fa-user-plus"></i>
                                </button>
                              ) : null}
                            </div>
                          ))}
                        <p style={{ color: "red" }}>
                          {err !== "" ? err : null}
                        </p>
                        <h3>Billing Details</h3>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">
                              First Name
                            </label>
                            <input
                              className="form-control"
                              {...register("f_name", {
                                required: "*First Name is required",
                                pattern: {
                                  value: /^[A-Za-z\s]+$/i,
                                  message: "*Please enter only alphabets",
                                },
                              })}
                            />
                            {errors.f_name && (
                              <p style={{ color: "red" }}>
                                {errors.f_name.message}
                              </p>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="inputPassword4"
                              className="form-label"
                            >
                              Last Name
                            </label>
                            <input
                              className="form-control"
                              {...register("l_name", {
                                required: "*Last Name is required",
                                pattern: {
                                  value: /^[A-Za-z\s]+$/i,
                                  message: "Please enter only alphabets",
                                },
                              })}
                            />
                            {errors.l_name && (
                              <p style={{ color: "red" }}>
                                {errors.l_name.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputAddress" className="form-label">
                            Address
                          </label>
                          <textarea
                            className="form-control"
                            {...register("address", {
                              required: "*Address is required",
                            })}
                          />
                          {errors.address && (
                            <p style={{ color: "red" }}>
                              {errors.address.message}
                            </p>
                          )}
                        </div>
                        <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            <h6>Sharing Mode</h6>
                          </label>
                        </div>
                        {priceDetails.length > 0 &&
                          priceDetails.map(
                            (x, idx) =>
                              x.description && (
                                <div className="form-check-inline" key={idx}>
                                  <input
                                    type="radio"
                                    name="description"
                                    defaultChecked={idx == 0}
                                    onClick={() => {
                                      setSharing(x.description);
                                      setPrice(x.price);
                                    }}
                                  />
                                  &nbsp;{x.description}&nbsp;
                                </div>
                              )
                          )}
                        <br />
                        <br />
                        <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            <h6>Journey Date</h6>
                          </label>
                        </div>
                        {date.length > 0 &&
                          date.map((x, index) => (
                            <div className="form-check-inline" key={index}>
                              <input
                                type="radio"
                                name="date"
                                defaultChecked={index == 0}
                                onClick={() => setTravelDate(x)}
                              />
                              &nbsp;{x}&nbsp;
                            </div>
                          ))}
                        <div className="mt-3 ">
                          <h6>Pay in Advance</h6>
                          <div className="col-md-12 form-check-inline">
                            <label
                              className="col-md-3"
                              onClick={() => {
                                setIndex(0);
                                setAdvance(total * 0.25);
                              }}
                            >
                              <input type="radio" name="payment" />
                              &nbsp;25%
                            </label>
                            <label
                              className="col-md-3"
                              onClick={() => {
                                setIndex(1);
                                setAdvance(total * 0.5);
                              }}
                            >
                              <input type="radio" name="payment" />
                              &nbsp;50%
                            </label>
                            <label
                              className="col-md-3"
                              onClick={() => {
                                setIndex(2);
                                setAdvance(total);
                              }}
                            >
                              <input
                                type="radio"
                                name="payment"
                                defaultChecked={true}
                              />
                              &nbsp;Full Payment
                            </label>
                          </div>
                        </div>
                        <div className="col-12 mt-3">
                          <label htmlFor="inputAddress2" className="form-label">
                            Email Id
                          </label>
                          <input
                            className="form-control"
                            {...register("mail", {
                              required: "*Email ID is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "*Please enter a valid email address", // Custom error message for pattern rule
                              },
                            })}
                          />
                          {errors.mail && (
                            <p style={{ color: "red" }}>
                              {errors.mail.message}
                            </p>
                          )}
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputAddress2" className="form-label">
                            Phone Number
                          </label>
                          <input
                            className="form-control"
                            {...register("phone", {
                              required: "*Phone number is required",
                              pattern: {
                                value: /^[0-9]+$/,
                                message:
                                  "*Please enter only numbers for the phone number.",
                              },
                              minLength: {
                                value: 10,
                                message:
                                  "*Phone number must be at least 10 digits long.",
                              },
                            })}
                          />
                          {errors.phone && (
                            <p style={{ color: "red" }}>
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                        <h3 className="mb-2">Please enter GST details</h3>
                        <div className="col-md-6">
                          <label htmlFor="inputEmail4" className="form-label">
                            GST Number
                          </label>
                          <input
                            className="form-control"
                            placeholder="GST Number"
                            {...register("gst_no")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header mb-0" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Package Itinerary & Inclusions
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div
                        className="accordion-body package-details"
                        dangerouslySetInnerHTML={{ __html: content && content }}
                      ></div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Cancellation Policy
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div class="text">
                          <h3>Fixed Departure Packages (Domestic) </h3>
                          <ul>
                            <li>
                              <strong>Booking Policy</strong> - A minimum amount
                              of 25% of the package cost is required to confirm
                              the booking and the balance amount has to be paid
                              45 days prior to arrival date of the respective
                              package.
                            </li>
                            <li>
                              <strong>Cancellation Policy</strong> - An amount
                              of 10% will be charged for cancellation 45 days or
                              any earlier days prior to arrival date, 50% for 30
                              days prior to arrival date, 75% for 15 days prior
                              to arrival date. Any cancellation made after the
                              above stipulated phase will be fixed according to
                              the merits and the demands of the circumstances
                              and is within the discretion of the management.
                            </li>
                          </ul>
                          <h3>Fixed Departure Packages (International)</h3>
                          <p>
                            All booking and cancellation policies are subjected
                            to norms and rules framed by the concerned service
                            providers / vendors of the opted destinations.
                          </p>
                          <h3>Tailor made Packages (Domestic) </h3>
                          <ul>
                            <li>
                              <strong>Booking Policy</strong> - It is subjected
                              to policies framed by third party service
                              providers / vendors, towards whom we are ensuring
                              the service for our guests / clients as per the
                              stipulated contract.
                            </li>
                            <li>
                              <strong>Cancellation and Refund Policy</strong> -
                              Cancellation and Refund Policy is dynamic and
                              subjected to merits and circumstances of each
                              case. It is also related to the policies of
                              different service providers also.
                            </li>
                          </ul>
                          <h3>Tailor made Packages (International)</h3>
                          <p>
                            All booking and cancellation policies are subjected
                            to norms and rules framed by the concerned service
                            providers / vendors of the opted destinations.
                          </p>
                        </div>
                        <h2 className="mt-5">Child Policy</h2>
                        <div class="text">
                          <h3>Fixed Departure Packages (Domestic) </h3>
                          <ul>
                            <li>
                              Child Below 05 Years - 30% of the package cost
                            </li>
                            <li>
                              Child Above 05 Years & Below 10 Years - 60% of the
                              package cost
                            </li>
                            <li>
                              No extra bed will be alloted for the above
                              categories
                            </li>
                            <li>
                              Child Above 10 Years – Full charge (One extra bed
                              / mattress will alloted)
                            </li>
                          </ul>
                          <h3>Fixed Departure Packages (Domestic) </h3>
                          <p>
                            All child policies are subjected to rules framed by
                            service providers / vendors of the opted
                            destinations.
                          </p>
                        </div>

                        <h2 className="mt-5">Non INR Price Policy</h2>

                        <h3> Fixed Departure Packages (International) :</h3>
                        <p>
                          All price is subjected dynamic exchange rate and
                          remittance charge.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="price-hike-box">
                  <h3>Your Order</h3>
                  <div
                    id="order_review"
                    className="woocommerce-checkout-review-order"
                  >
                    <table className="shop_table woocommerce-checkout-review-order-table">
                      <thead>
                        <tr>
                          <th className="product-name">Package</th>
                          <th className="product-total">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="cart_item">
                          <td className="product-name">
                            {name && name}&nbsp;{" "}
                            <strong className="product-quantity">
                              ×&nbsp;{travellerDetails.length}
                            </strong>{" "}
                          </td>
                          <td className="product-total">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  ₹
                                </span>
                                {price && price}
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr className="cart_item">
                          <td className="product-name">
                            <b>Sub Total</b>
                          </td>
                          <td className="product-total">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  ₹
                                </span>
                                {price && price * travellerDetails.length}
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr className="cart_item">
                          <td className="product-name">
                            <b>5% GST</b>
                          </td>
                          <td className="product-total">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  ₹
                                </span>
                                {price &&
                                  price * 0.05 * travellerDetails.length}
                              </bdi>
                            </span>
                          </td>
                        </tr>
                      </tbody>

                      {price && price > 0 && (
                        <tfoot>
                          <tr className="order-total">
                            <th>Total</th>
                            <td>
                              <strong>
                                <span className="woocommerce-Price-amount amount">
                                  <bdi>
                                    <span className="woocommerce-Price-currencySymbol">
                                      ₹
                                    </span>
                                    {total}
                                  </bdi>
                                </span>
                              </strong>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Advance</th>
                            <td>
                              <strong>
                                <span className="woocommerce-Price-amount amount">
                                  <bdi>
                                    <span className="woocommerce-Price-currencySymbol">
                                      ₹
                                    </span>
                                    {advance}
                                  </bdi>
                                </span>
                              </strong>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Amount Due</th>
                            <td>
                              <strong>
                                <span className="woocommerce-Price-amount amount">
                                  <bdi>
                                    <span className="woocommerce-Price-currencySymbol">
                                      ₹
                                    </span>
                                    {total - advance}
                                  </bdi>
                                </span>
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                    <button
                      href="javascript:;"
                      type="submit"
                      // onClick={handlePayment}
                      className="btn btn-primary submit-butt mb-0"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
