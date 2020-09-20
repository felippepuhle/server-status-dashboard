import { Environment, Network, RecordSource, Store } from "relay-runtime";

import fetchQuery from "./fetchQuery";
import subscribe from "./subscribe";

const environment = new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
});

export default environment;
