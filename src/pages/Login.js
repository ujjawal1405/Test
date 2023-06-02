import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"

const Login = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('loginData')){
      navigate('/')
    }
    else{
      navigate('/login')
    }
  },[navigate])

  const handleSubmit = async (values) => {
   
    if (localStorage.getItem("loginData")) {
      localStorage.removeItem("loginData");
    }

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const users = response.data;
      const user = users.find(
        (user) => user.email === values.email && user.phone === values.password
      );

      if (user) {
        localStorage.setItem("loginData", [values.email, values.password]);
        toast.success("login successfull");
        navigate('/')
      } else {
        toast.error("invalid credeentials");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const validationSchema = yup.object({
    email: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema : validationSchema,

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: 8,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
