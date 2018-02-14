# rx-amqp

IN DEVELOPMENT NOT TO BE USED IN PRODUCTION YET!

This library was built on top of amqp library and uses the power of rxjs to create a flow to RabbitMQ
usage.

## Getting Started
Usage Example
```
import { RxAmqpConnection, RxAmqpQueue, RxAmqpExchange } from "rx-amqp";
import { filter, map, combineAll, switchMap } from "rxjs/operators";
import { pipe } from "rxjs/Rx";
import { Observable } from "rxjs/internal/Observable";

const rmqpConnectionOptions = {
  host: "localhost",
  port: 5672,
  login: "login",
  password: "password",
  vhost: "vhost"
};
const rxAmqp = new RxAmqpConnection(rmqpConnectionOptions);
const rxFlow = rxAmqp.connect().pipe(
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
    exchange.publish("myKey", { message: "new message" });
    return Observable.of(exchange);
  })
);

rxFlow
  .combineAll()
  .subscribe(
    () => console.log("Starting"),
    error => console.error(error),
    () => console.log("Completed")
  );
```


### Prerequisites

You need to have RabbitMQ server up and running!
Please refer to the following page to do so: https://www.rabbitmq.com/download.html


## Testing

TO BE DONE

### Running

To Build
```
npm run build:dev
```

To Serve
```
npm run serve:dev
```

To Build & Serve
```
npm run watch:dev
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Alexandre Saker** - *Initial work* - [GitHub](https://github.com/alexsaker)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


