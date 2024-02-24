import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import api, { URL_PATH } from "../../Common/API";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "",
    topic: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(URL_PATH.ContactUsForm, formData);

      console.log(response.data.message);
      // Add any additional handling after successful submission

      window.Alert({
        title: "Your message has been sent successfully",
        type: "success",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        companySize: "",
        topic: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      window.Alert({
        title: "Error submitting form",
        type: "error",
      });

      // Handle error
    }
  };

  return (
    <Box>
      <HeaderComponent section="root" theme="light" />

      <Box className="container my-3 py-3">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                height: "100%",
                justifyContent: "center",
                // alignItems: "center",
                alignContent: "center",
                marginRight: "40px",
                // marginBottom: "40px",
                flexDirection: "column",
              }}
              className="image-container"
            >
              <h3 className="bold">Need support?</h3>
              <p style={{ color: "#9095A0FF" }}>
                Fill in the form to get in touch
              </p>
              <img
                src="/assets/contact.png"
                alt="Contact Us"
                style={{
                  height: "auto",
                  width: "100%",
                }}
              />

              <img
                src="/assets/contactBg.png"
                alt="Phone"
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  right: "-40px",
                  zIndex: -1,
                  height: "50%",
                  width: "auto",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <div className="form-container">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField required 
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField required 
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                </Grid>

                <TextField required 
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField required 
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Box
                  sx={
                    {
                      // marginTop: "20px",
                    }
                  }
                >
                  <label htmlFor="companySize" className="mb-2">
                    Company Size
                  </label>

                  <select
                    className="form-control"
                    label="Company Size"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                  </select>
                </Box>

                <TextField required 
                  label="Which topic best fit your needs?"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField required 
                  label="How can we help? "
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ backgroundColor: "#535ce8" }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactUsForm;
