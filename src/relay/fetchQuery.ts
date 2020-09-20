import {
  CacheConfig,
  QueryResponseCache,
  RequestParameters,
  Variables,
} from "relay-runtime";

const oneMinute = 60 * 1000;
const cache = new QueryResponseCache({ size: 250, ttl: oneMinute });

const fetchQuery = (
  operation: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig
) => {
  const queryID = operation.text as string;
  const isMutation = operation.operationKind === "mutation";
  const isQuery = operation.operationKind === "query";
  const forceFetch = cacheConfig && cacheConfig.force;

  // Try to get data from cache on queries
  const fromCache = cache.get(queryID, variables);
  if (isQuery && fromCache !== null && !forceFetch) {
    return fromCache;
  }

  return fetch(
    process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // Update cache on queries
      if (isQuery && json) {
        cache.set(queryID, variables, json);
      }
      // Clear cache on mutations
      if (isMutation) {
        cache.clear();
      }

      return json;
    });
};

export default fetchQuery;
