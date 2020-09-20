import React from "react";
import Grid from "@material-ui/core/Grid";

import StatCard from "./StatCard";

const getColor = (value: number) => {
  if (value > 70) {
    return "error";
  }

  if (value > 40) {
    return "warning";
  }

  return undefined;
};

type Props = {
  cpu: number;
  memory: number;
  disk: number;
  jobs: number;
};

const StatsGrid: React.FC<Props> = ({ cpu, memory, disk, jobs }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          title="CPU"
          value={`${Math.round(cpu)}%`}
          valueColor={getColor(cpu)}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          title="Memory"
          value={`${Math.round(memory)}%`}
          valueColor={getColor(memory)}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          title="Disk"
          value={`${Math.round(disk)}%`}
          valueColor={getColor(disk)}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatCard title="Jobs running" value={jobs} />
      </Grid>
    </Grid>
  );
};

export default StatsGrid;
