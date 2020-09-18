import React from "react";
import { useQuery, useSubscription, useMutation, gql } from "@apollo/client";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { Loading, Stat } from "src/components";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const QUERY = gql`
  query StatusQuery {
    status {
      cpu
      memory
      disk
    }
    jobs {
      running
    }
  }
`;

const STATUS_CHANGED_SUBSCRIPTION = gql`
  subscription StatusChangedSubscription {
    statusChanged {
      cpu
      memory
      disk
    }
  }
`;

const JOBS_CHANGED_SUBSCRIPTION = gql`
  subscription JobsChangedSubscription {
    jobsChanged {
      running
    }
  }
`;

const ADD_JOB_MUTATION = gql`
  mutation AddJobMutation {
    addJob {
      running
    }
  }
`;

const Apollo = () => {
  const classes = useStyles();

  const { loading, data: queryData } = useQuery(QUERY);
  const { status, jobs } = queryData || {};

  const { data: statusSubscriptionData } = useSubscription(
    STATUS_CHANGED_SUBSCRIPTION
  );
  const { statusChanged } = statusSubscriptionData || {};

  const { data: jobsSubscriptionData } = useSubscription(
    JOBS_CHANGED_SUBSCRIPTION
  );
  const { jobsChanged } = jobsSubscriptionData || {};

  const cpuQty = statusChanged?.cpu || status?.cpu;
  const memoryQty = statusChanged?.memory || status?.memory;
  const diskQty = statusChanged?.disk || status?.disk;
  const jobsQty = jobsChanged?.running || jobs?.running;

  const [addJob] = useMutation(ADD_JOB_MUTATION);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Stat title="CPU" value={`${Math.round(cpuQty)}%`} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Stat title="Memory" value={`${Math.round(memoryQty)}%`} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Stat title="Disk" value={`${Math.round(diskQty)}%`} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Stat title="Jobs running" value={jobsQty} />
        </Grid>
      </Grid>

      <Fab
        color="primary"
        variant="extended"
        className={classes.fab}
        onClick={() => addJob()}
      >
        <AddIcon />
        Run job
      </Fab>
    </>
  );
};

export default Apollo;
