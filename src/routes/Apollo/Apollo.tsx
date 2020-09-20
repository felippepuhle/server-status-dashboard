import React from "react";
import { useQuery, useSubscription, useMutation, gql } from "@apollo/client";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

import { Loading, StatsGrid } from "src/components";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(6),
    right: theme.spacing(3),
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

  const canAddJob = cpuQty < 70 && memoryQty < 70 && diskQty < 70;
  const [addJob] = useMutation(ADD_JOB_MUTATION);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <StatsGrid
        cpu={cpuQty}
        memory={memoryQty}
        disk={diskQty}
        jobs={jobsQty}
      />

      <Fab
        color="primary"
        variant="extended"
        className={classes.fab}
        disabled={!canAddJob}
        onClick={() => addJob()}
      >
        <AddIcon />
        Run job
      </Fab>
    </>
  );
};

export default Apollo;
