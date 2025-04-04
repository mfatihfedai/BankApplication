import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

const Contact = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        py: 10,
        px: 4,
        minHeight: "92vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Box mb={4}>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                fontWeight="bold"
              >
                Contact Us
              </Typography>
              <Typography
                variant="h4"
                color="text.primary"
                gutterBottom
                fontWeight="bold"
              >
                GET IN TOUCH WITH US
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eius tempor incididunt ut labore e dolore magna aliqua. Ut enim
                adiqua minim veniam quis nostrud exercitation ullamco.
              </Typography>
            </Box>

            <ContactInfo
              title="Our Location"
              description="99 S.t Jomblo Park Pekanbaru 28292. Indonesia"
            />
            <ContactInfo
              title="Phone Number"
              description="(+62)81 414 257 9980"
            />
            <ContactInfo
              title="Email Address"
              description="info@yourdomain.com"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: "background.paper",
              }}
            >
              <form>
                <ContactInputBox
                  type="text"
                  name="name"
                  placeholder="Your Name"
                />
                <ContactInputBox
                  type="email"
                  name="email"
                  placeholder="Your Email"
                />
                <ContactInputBox
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                />
                <ContactTextArea
                  rows={6}
                  placeholder="Your Message"
                  name="details"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const ContactInfo = ({ title, description }) => (
  <Box mb={4}>
    <Typography variant="h6" color="text.primary" fontWeight="bold">
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

const ContactInputBox = ({ type, placeholder, name }) => (
  <TextField
    type={type}
    placeholder={placeholder}
    name={name}
    fullWidth
    variant="outlined"
    margin="normal"
  />
);

const ContactTextArea = ({ rows, placeholder, name }) => (
  <TextField
    placeholder={placeholder}
    name={name}
    fullWidth
    variant="outlined"
    margin="normal"
    multiline
    rows={rows}
  />
);

export default Contact;
