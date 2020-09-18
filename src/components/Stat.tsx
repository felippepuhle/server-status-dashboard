import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

type Props = {
  title: string;
  value: string;
};

const Stat: React.FC<Props> = ({ title, value }) => {
  return (
    <Paper>
      <Box p={2}>
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          {title}
        </Typography>

        <Typography component="p" variant="h4">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Stat;
