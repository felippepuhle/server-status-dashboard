import React, { Suspense } from "react";

import { Loading } from "src/components";

import RelayScreen from "./RelayScreen";

const Relay = () => (
  <Suspense fallback={<Loading />}>
    <RelayScreen />
  </Suspense>
);

export default Relay;
