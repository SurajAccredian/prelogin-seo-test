import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ClearIcon from "@mui/icons-material/Clear";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";

const REFERRING_PROGRAMS = [
  {
    value: "Certificate in Data Science Foundation",
    label: "Certificate in Data Science Foundation | 3 months",
  },
  {
    value: "Global Certificate in Data Science",
    label: "Global Certificate in Data Science | 6 months",
  },
  {
    value: "Global Certificate in Data Science and AI",
    label: "Global Certificate in Data Science & AI | 10 months",
  },
  {
    value: "PGP in Data Science & AI",
    label: "PGP in Data Science & AI | 12 months",
  },
  { value: "PGP in Data Science", label: "PGP in Data Science | 12 months" },
  {
    value: "PGP in Data Science & AI (With Fellowship)",
    label: "PGP in Data Science & AI (With Fellowship) | 12 + 3 months",
  },
  { label: "--- Product Management Programs---" },
  {
    value: "Certificate in Product Management Foundation",
    label: "Certificate in Product Management Foundation | 3 months",
  },
  {
    value: "Global Certificate in Product Management",
    label: "Global Certificate in Product Management | 6 months",
  },
  {
    value: "PGP in Product Management",
    label: "PGP in Product Management | 10 months",
  },
  {
    value: "PGP in Product Management and Data Science",
    label: "PGP in Product Management and Data Science | 12 months",
  },
  {
    value: "PGP in Product Management",
    label: "PGP in Product Management | 12 months",
  },
];

const ReferModal = ({ open, setOpen }) => {
  const handleCloseref = () => {
    setOpen(false);
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const [loopen, setLoOpen] = useState(false);
  const [referData, setReferData] = useState({
    friendname: "",
    friendemail: "",
    friendnumber: "",
    programname: "",
    relation: "",
    vertical: null,
  });

  const [user, setUser] = useState(null);

  // const handleSubmitRef = async (e) => {
  //   // e.preventDefault();
  //   LoaderOpen();
  //   await axios({
  //     method: "post",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //     },
  //     url: `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/referandEarn/refer`,
  //     data: {
  //       usermobile: localStorage.getItem("mobile"),
  //       enrol_id: localStorage.getItem("enrol_id"),
  //       firstname: localStorage.getItem("username"),
  //       lastname: localStorage.getItem("lastname"),
  //       useremail: localStorage.getItem("email"),
  //       batch_id: localStorage.getItem("batch_id"),
  //       friend_name: referData.friendname,
  //       friend_email: referData.friendemail,
  //       friend_mobile: referData.friendnumber,
  //       userprogram: localStorage.getItem("program_name"),
  //       friend_program: referData.programname,
  //       person: referData.relation,
  //       category: localStorage.getItem("category")
  //     },
  //   }).then((res) => {
  //     // eslint-disable-next-line eqeqeq
  //     if (res.data.status == 200) {
  //       handleCloseref();
  //       LoaderClose();
  //       Swal.fire(
  //         'success',
  //         'Thank you for registering for our referral program. Our counsellors will get in touch with the learner and update you on your reward.',
  //         'success'
  //       )
  //     }
  //   });
  // }

  useEffect(() => {
    const decoded = decodeToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjIyMTI0LCJ1c2VyX3JvbGUiOjIsInRlcm0iOjE0LCJlbnJvbF9pZCI6Mzg4NDEsImNvdW50IjozLCJjYXRlZ29yeSI6MiwiZmlyc3RuYW1lIjoiVmluYXlhayIsImVtYWlsIjoidmluYXlha0BpbnNhaWQuY28iLCJ1c2VybGFzdG5hbWUiOiJHb2RzZSIsInByb2dyYW1faWQiOjI5LCJtb2JpbGUiOiI3MDI4NTg5MzAzIiwiYmF0Y2hfaWQiOjgyLCJkb2IiOiIyMDIzLTA4LTEwIn0sImV4cCI6MTcwNzIwNzUyMCwiaWF0IjoxNzA3MjA3MzQwfQ.mSRa1xZX6X7sGxIrXGV9vkTPcVdWIawnlcwzn28Cz-Y"
    );

    // console.log(data);

    if (decoded && decoded.data) {
      setUser(decoded.data);
    }
  }, []);

  // console.log(user);

  const handleSubmitRef = async (e) => {
    // e.preventDefault();

    const dataValues = [
      user.mobile,
      user.enrol_id,
      user.email,
      user.batch_id,
      user.firstname,
      user.userlastname,
      user.category,
      // localStorage.getItem("mobile"),
      // localStorage.getItem("enrol_id"),
      // localStorage.getItem("username"),
      // localStorage.getItem("lastname"),
      // localStorage.getItem("email"),
      // localStorage.getItem("batch_id"),
      referData.friendname,
      referData.friendemail,
      referData.friendnumber,
      localStorage.getItem("program_name"),
      referData.programname,
      referData.relation,
      // localStorage.getItem("category"),
    ];

    if (dataValues.some((value) => !value)) {
      // If any value is empty, throw an error or handle it as per your requirement
      // console.error("Error: All fields must be filled out.");
      toast.error("All fields must be filled out.");
      return;
    }

    LoaderOpen();

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/referandEarn/refer`,
        {
          usermobile: user.mobile,
          enrol_id: user.enrol_id,
          firstname: user.firstname,
          lastname: user.userlastname,
          useremail: user.email,
          batch_id: user.batch_id,
          friend_name: referData.friendname,
          friend_email: referData.friendemail,
          friend_mobile: referData.friendnumber,
          userprogram: localStorage.getItem("program_name"),
          friend_program: referData.programname,
          person: referData.relation,
          category: user.category,
        }
      );

      if (data.status == 200) {
        handleCloseref();
        LoaderClose();
        Swal.fire(
          "success",
          "Thank you for registering for our referral program. Our counsellors will get in touch with the learner and update you on your reward.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error:", error?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReferData({
      ...referData,
      [name]: value,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseref}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ p: 3 }}
    >
      <DialogTitle
        sx={{
          width: { lg: "430px", sm: "430px", md: "430px" },
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Refer your friends here
        <ClearIcon
          onClick={handleCloseref}
          sx={{ float: "right", mt: 0.5, ml: 2, cursor: "pointer" }}
        />
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2, mt: 2 }}>
          <TextField
            onChange={handleChange}
            value={referData.friendname}
            fullWidth
            label="Your friend's name"
            required={true}
            name="friendname"
            id="name"
            type="text"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            onChange={handleChange}
            value={referData.friendemail}
            fullWidth
            label="Your friend's email"
            required={true}
            name="friendemail"
            id="email"
            type="email"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            onChange={handleChange}
            value={referData.friendnumber}
            fullWidth
            label="Your friend's mobile number"
            required={true}
            name="friendnumber"
            id="number"
            type="number"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="vertical"
            select
            name="vertical"
            onChange={handleChange}
            value={referData.vertical}
            fullWidth
            label={referData.programname === "" ? "Select Program" : ""}
            required={true}
            InputLabelProps={{ shrink: false }}
          >
            {REFERRING_PROGRAMS.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            disabled={!referData.vertical}
            id="program"
            select
            name="programname"
            onChange={handleChange}
            value={referData.programname}
            fullWidth
            label={referData.programname === "" ? "Select Program" : ""}
            required={true}
            InputLabelProps={{ shrink: false }}
          >
            {REFERRING_PROGRAMS.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="relation"
            select
            name="relation"
            onChange={handleChange}
            value={referData.relation}
            fullWidth
            label={
              referData.relation === "" ? "how do you know this person?" : ""
            }
            required={true}
            InputLabelProps={{ shrink: false }}
          >
            {["Friend", "Colleague", "Manager", "Relative"].map(
              (item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              )
            )}
          </TextField>
        </Box>
        <Box display="grid" justifyContent="center">
          <Button
            onClick={handleSubmitRef}
            variant="contained"
            sx={{
              background: "#1A73E8",
              borderRadius: "5px",
              textTransform: "none",
              "&:hover": {
                background: "#1B66C9",
              },
            }}
          >
            Refer Now
          </Button>
        </Box>
      </DialogContent>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loopen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default ReferModal;
