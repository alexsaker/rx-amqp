import * as amqp from "amqp";
import { Observable } from "rxjs/Rx";
import {
  AMQPClient,
  AMQPExchange,
  ExchangeOptions,
  ExchangePublishOptions
} from "amqp";

export class RxAmqpExchange {
  private _connection: AMQPClient;
  private _name: string;
  private _exchangeOptions: ExchangeOptions;
  private _exchange: AMQPExchange;
  private _exchangeCallback: () => void;

  constructor(
    connection: AMQPClient,
    name: string,
    options?: ExchangeOptions,
    exchangeCallback?: () => void
  ) {
    this._connection = connection;
    this._name = name;
    this._exchangeOptions = options;
    this._exchangeCallback = exchangeCallback;
    this._exchange = this._connection.exchange(
      this._name,
      this._exchangeOptions,
      this._exchangeCallback
    );
  }

  get connection(): AMQPClient {
    return this._connection;
  }
  get name(): string {
    return this._name;
  }
  get exchangeOptions(): ExchangeOptions {
    return this._exchangeOptions;
  }
  get exchange(): AMQPExchange {
    return this._exchange;
  }

  publish(
    routingKey: string,
    message: any,
    options?: ExchangePublishOptions,
    callback?: () => void
  ): Observable<AMQPExchange | any> {
    return new Observable(observer => {
      try {
        this._exchange.publish(routingKey, message, options, callback);
        observer.next(this._exchange);
      } catch (error) {
        observer.error(error);
      }
    });
  }

  destroy(ifUnused = true): Observable<boolean> {
    return new Observable(observer => {
      try {
        this._exchange.destroy(ifUnused);
        observer.next(true);
      } catch (error) {
        observer.error(error);
      }
    });
  }

  bind(
    srcExchange: string,
    routingKey: string,
    callback: () => void
  ): Observable<AMQPExchange | any> {
    return new Observable(observer => {
      try {
        this._exchange.bind(srcExchange, routingKey, callback);
        this._exchange.on("exchangeBindOk", () =>
          observer.next(this._exchange)
        );
      } catch (error) {
        observer.error(error);
      }
    });
  }

  unbind(
    srcExchange: string,
    routingKey: string,
    callback: () => void
  ): Observable<AMQPExchange | any> {
    return new Observable(observer => {
      try {
        this._exchange.unbind(srcExchange, routingKey, callback);
        this._exchange.on("exchangeUnbindOk", () =>
          observer.next(this._exchange)
        );
      } catch (error) {
        observer.error(error);
      }
    });
  }

  bindHeaders(
    exchange: string,
    routingKey: string,
    callback: () => void
  ): Observable<AMQPExchange | any> {
    return new Observable(observer => {
      try {
        this._exchange.bind_headers(exchange, routingKey, callback);
        observer.next(this._exchange);
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
