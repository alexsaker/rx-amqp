export * from "./rx-amqp";
import { RxAmqpConnection, RxAmqpQueue, RxAmqpExchange } from "./rx-amqp";
import { filter, map, combineAll, switchMap } from "rxjs/operators";
import { pipe } from "rxjs/Rx";
import { Observable } from "rxjs/internal/Observable";

const rmqpConnectionOptions = {
  host: "localhost",
  port: 5672,
  login: "mylogin",
  password: "mypassword",
  vhost: "myvhost"
};

const rxAmqp = new RxAmqpConnection(rmqpConnectionOptions);
const flow = rxAmqp.connect().pipe(
  switchMap(connection => {
    const rxQueueObject = new RxAmqpQueue(
      connection,
      "myNewQueue",
      { durable: true },
      () => {
        console.log("Created queue: myNewQueue!");
      }
    );
    return Observable.of(rxQueueObject.connection);
  }),
  switchMap(connection => {
    const rxExchangeObject = new RxAmqpExchange(
      connection,
      "myNewExchange",
      {
        type: "topic"
      },
      () => {
        console.log("Created exchange: myNewExchange!");
      }
    );
    return Observable.of(rxExchangeObject);
  }),

  switchMap(exchange => {
    exchange.publish("myKey", { bla: "fsqd" });
    return Observable.of(exchange);
  })
);
flow
  .combineAll()
  .subscribe(
    () => console.log("Starting"),
    error => console.error(error),
    () => console.log("Completed")
  );
