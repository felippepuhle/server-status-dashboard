import React from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Footer = () => (
  <Box p={2}>
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/felippepuhle">
        Felippe Rodrigo Puhle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </Box>
);

export default Footer;
