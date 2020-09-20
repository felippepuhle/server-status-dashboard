import React, { useMemo } from "react";
import {
  graphql,
  useLazyLoadQuery,
  useSubscription,
  useMutation,
} from "react-relay/hooks";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

import { StatsGrid } from "src/components";

import { RelayScreenQuery } from "./__generated__/RelayScreenQuery.graphql";
import { RelayScreenAddJobbMutation } from "./__generated__/RelayScreenAddJobbMutation.graphql";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(6),
    right: theme.spacing(3),
  },
}));

const QUERY = graphql`
  query RelayScreenQuery {
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

const STATUS_CHANGED_SUBSCRIPTION = graphql`
  subscription RelayScreenStatusChangedSubscription {
    statusChanged {
      cpu
      memory
      disk
    }
  }
`;

const JOBS_CHANGED_SUBSCRIPTION = graphql`
  subscription RelayScreenJobsChangedSubscription {
    jobsChanged {
      running
    }
  }
`;

const ADD_JOB_MUTATION = graphql`
  mutation RelayScreenAddJobbMutation {
    addJob {
      running
    }
  }
`;

const RelayScreen = () => {
  const classes = useStyles();

  const data = useLazyLoadQuery<RelayScreenQuery>(QUERY, {});

  const statusChangedSubscriptionConfig = useMemo(
    () => ({
      subscription: STATUS_CHANGED_SUBSCRIPTION,
      variables: {},
    }),
    []
  );
  useSubscription(statusChangedSubscriptionConfig);

  const jobsChangedSubscriptionConfig = useMemo(
    () => ({
      subscription: JOBS_CHANGED_SUBSCRIPTION,
      variables: {},
    }),
    []
  );
  useSubscription(jobsChangedSubscriptionConfig);

  const cpuQty = data?.status?.cpu;
  const memoryQty = data?.status?.memory;
  const diskQty = data?.status.disk;
  const jobsQty = data?.jobs.running;

  const canAddJob = cpuQty < 70 && memoryQty < 70 && diskQty < 70;
  const [addJob] = useMutation<RelayScreenAddJobbMutation>(ADD_JOB_MUTATION);

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
        onClick={() => addJob({ variables: {} })}
      >
        <AddIcon />
        Run job
      </Fab>
    </>
  );
};

export default RelayScreen;
