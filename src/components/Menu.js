import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OpenApi from "./OpenApi";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Menu = () => {
  const [pageName, setPagename] = useState("home");
  const [input, setInput] = useState({});
  const [name, setName] = useState({ userName: "" });

  const [msg, setMsg] = useState({});
  const [error, setError] = useState({});
  const [loginshow, setLoginShow] = useState(false);
  const [regShow, setRegShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/");
    setName({ userName: "" });
    // toast.success("Logged out")
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setError({});
    setMsg({});
    console.log("input", input);
    const formData = new FormData();
    formData.append("mail", input.mail == undefined ? "" : input.mail);
    formData.append(
      "password",
      input.password == undefined ? "" : input.password
    );
    OpenApi.post("/login", formData)
      .then((res) => {
        console.log("res", res);
        if (res.data.status == 3) {
          setMsg({ type: "info", message: res.data.message });
          setInput({ mail: "", password: "" });
          localStorage.setItem("userName", res.data.name);
          localStorage.setItem("mail", res.data.mail);
          localStorage.setItem("userToken", res.data.token);
          setTimeout(() => {
            localStorage.clear();
            setName('')
          }, 1000 * 1 * 60 * 30);
          setName({ userName: res.data.name });
          // console.log('name', name);
          e.target.reset();

          setLoginShow(false);
          // toast.success("Logged in Successfully");
        } else {
          setMsg({ type: "danger", message: "*Invalid email and password" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        if (err.response.status == 422) {
          let arr = err.response.data.errors;
          console.log("arr", arr);
          arr.map((x) => {
            setError((error) => ({ ...error, [x.path]: x.msg }));
          });
        } else if (
          err.response.data.status == -1 ||
          err.response.data.status == 0
        ) {
          setMsg({ type: "danger", message: "*Invalid email and password" });
          setInput({ mail: "", password: "" });
          e.target.reset();
        }
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError({});
    const formData = new FormData();
    formData.append("mail", input.mail == undefined ? "" : input.mail);
    formData.append("name", input.name == undefined ? "" : input.name);
    formData.append(
      "password",
      input.password == undefined ? "" : input.password
    );
    formData.append(
      "confirm_password",
      input.confirm_password == undefined ? "" : input.confirm_password
    );

    OpenApi.post("/sign-up", formData)
      .then((res) => {
        console.log("res", res);
        if (res.status == 200) {
          setMsg({ type: "info", message: res.data.message });
          setInput({ mail: "", name: "", password: "", confirm_password: "" });
          e.target.reset();
          toast.success(res.data.message);
          setRegShow(false);
          setLoginShow(true)
        }
      })
      .catch((err) => {
        if (err.response.status == 422) {
          let arr = err.response.data.errors;
          let errorData = {};
          // console.log('arr', arr);
          arr.map((x) => {
            if (x.path === "password" || x.path === "confirm_password") {
              setInput((prev) => ({
                ...prev,
                password: "",
                confirm_password: "",
              }));
              let password = document.getElementById("password");
              password.value = "";
              let confirm_password =
                document.getElementById("confirm_password");
              confirm_password.value = "";
            }
            if (errorData[x.path] == undefined) {
              errorData[x.path] = x.msg;
              setError((error) => ({ ...error, [x.path]: x.msg }));
            }
          });
          // console.log('error',error);
        }
        if (err.response.status == 400) {
          setMsg({ type: "danger", message: err.response.data.message });
          setInput({ mail: "", password: "", name: "", confirm_password: "" });
          e.target.reset();
        } else if (err.response.status == 500) {
          setMsg({ type: "danger", message: err.response.data.message });
          setInput({ mail: "", password: "", name: "", confirm_password: "" });
          e.target.reset();
        }
      });
  };

  useEffect(() => {
    setName({ userName: localStorage.getItem("userName") });
  }, []);

  return (
    <>
      {name.userName ? (
        <ul class="navbar-nav ml-auto log-pack">
          {/* <span style={{ color: 'black', fontSize: 18 }}>Welcome {name.userName} 👋</span> */}
          <li className="has-child-menu">
            <a href="javascript:;">Welcome {name.userName} 👋</a>
            <ul className="submenu">
              <li>
              
                <a href="/my-profile" class="dropdown-item">
                  My Profile
                </a>
              </li>
              <li>
                
                <a href="/my-bookings" class="dropdown-item">
                  My Bookings
                </a>
              </li>
              <li onClick={handleClick}>
                
                <a class="dropdown-item">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      ) : (
        <ul className="log-pack mb-0">
          <li>
            <a
              onClick={() => {
                setMsg({});
                setError({});
                setLoginShow(true);
              }}
            >
              Sign In
            </a>
          </li>
          <li>|</li>
          <li>
            <a
              onClick={() => {
                setMsg({});
                setError({});
                setRegShow(true);
              }}
            >
              Sign Up
            </a>
          </li>
        </ul>
      )}

      <ul className="navbar-nav ms-auto">
        <li
          className={location.pathname === "/" ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/">
            Home{" "}
          </Link>
        </li>
        <li
          className={
            location.pathname.includes("about") ? "nav-item active" : "nav-item"
          }
        >
          <Link className="nav-link" to="/about">
            About{" "}
          </Link>
        </li>
        <li
          className={
            location.pathname.includes("tailormade")
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link className="nav-link" to="/tailormade">
            Tailormade
          </Link>
        </li>
        <li
          className={
            location.pathname.includes("home-stay")
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link className="nav-link" to="/home-stay">
            Homestays
          </Link>
        </li>
        <li
          className={
            location.pathname.includes("package")
              ? "nav-item has-child-menu active"
              : "nav-item has-child-menu"
          }
        >
          <a href="javascript:;" className="nav-link">
            Packages
          </a>
          <ul className="submenu">
            <li>
              <Link className="nav-link" to="/package/incredible_india">
                Incredible India
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/package/wild_africa">
                Wild Africa
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/package/beautiful_asia">
                Beautiful Asia
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/package/adventure_himalayas">
                Himalayan Adventure
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/package/colorful_festival">
                Colorful Festival
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={
            location.pathname.includes("testimonial")
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link className="nav-link" to="/testimonial">
            {" "}
            Testimonials{" "}
          </Link>
        </li>
        <li
          className={
            location.pathname.includes("blog") ? "nav-item active" : "nav-item"
          }
        >
          <Link className="nav-link" to="/blog">
            {" "}
            blogs
          </Link>
        </li>
        <li
          className={
            location.pathname.includes("contact")
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
        <li className="nav-item mobile-show">
          <a
            onClick={() => {
              setMsg({});setError({});
              setLoginShow(true);
            }}
          >
            Sign In
          </a>
        </li>
        <li className="nav-item mobile-show">
          <a
            onClick={() => {
              setMsg({});setError({});
              setRegShow(true);
            }}
          >
            Sign Up
          </a>
        </li>
      </ul>

      <Modal show={loginshow} onHide={() => setLoginShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="black-form form px-0" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email Id"
                name="mail"
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>{error.mail && error.mail}</span>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>
                {error.password && error.password}
              </span>
            </div>
            <button type="submit" className="btn btn-primary submit-butt">
              Submit
            </button>
            {msg && msg.type === "info" ? (
              <div class="alert alert-success" role="alert">
                {msg.message}
              </div>
            ) : msg.type === "danger" ? (
              <div class="alert alert-danger" role="alert">
                {msg.message}
              </div>
            ) : null}
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={regShow} onHide={() => setRegShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="black-form form px-0"
            onSubmit={handleRegisterSubmit}
          >
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email Id"
                name="mail"
                id="mail"
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>{error.mail && error.mail}</span>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>{error.name && error.name}</span>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>
                {error.password && error.password}
              </span>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirm_password"
                id="confirm_password"
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>
                {error.confirm_password && error.confirm_password}
              </span>
            </div>
            <button type="submit" className="btn btn-primary submit-butt">
              Submit
            </button>
            {msg && msg.type === "info" ? (
              <div class="alert alert-success" role="alert">
                {msg.message}
              </div>
            ) : msg.type === "danger" ? (
              <div class="alert alert-danger" role="alert">
                {msg.message}
              </div>
            ) : null}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Menu;
