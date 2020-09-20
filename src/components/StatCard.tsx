import React from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
}));

type Props = {
  title: string;
  value: string | number;
  valueColor?: "error" | "warning";
};

const StatCard: React.FC<Props> = ({ title, value, valueColor }) => {
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          {title}
        </Typography>

        <span
          className={clsx({
            [classes.error]: valueColor === "error",
            [classes.warning]: valueColor === "warning",
          })}
        >
          <Typography component="p" variant="h4" color="inherit">
            {value}
          </Typography>
        </span>
      </Box>
    </Paper>
  );
};

export default StatCard;
