import {
  GraphQLResponse,
  Observable,
  ObservableFromValue,
  RequestParameters,
  SubscribeFunction,
  Variables,
} from "relay-runtime";
import { SubscriptionClient } from "subscriptions-transport-ws";

const subscriptionClient = new SubscriptionClient(
  process.env.REACT_APP_SUBSCRIPTIONS_URL || "ws://localhost:4000/graphql",
  {
    reconnect: true,
  }
);

const subscribe: SubscribeFunction = (
  request: RequestParameters,
  variables: Variables
) => {
  const subscribeObservable = subscriptionClient.request({
    query: request.text as string,
    operationName: request.name,
    variables,
  }) as ObservableFromValue<GraphQLResponse>;

  return Observable.from(subscribeObservable);
};

export default subscribe;
