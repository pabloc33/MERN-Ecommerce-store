import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loading";
import Sidebar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";

const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, updateError, navigate, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default UpdateUser;
