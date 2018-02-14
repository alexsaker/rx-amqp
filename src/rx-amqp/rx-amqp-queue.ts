import * as amqp from "amqp";
import { Observable } from "rxjs/Rx";
import { QueueOptions, AMQPClient, AMQPQueue, SubscribeOptions } from "amqp";

export class RxAmqpQueue {
  private _connection: AMQPClient;
  private _queueOptions: QueueOptions;
  private _queue: AMQPQueue;
  constructor(
    connection: AMQPClient,
    name: string,
    options?: QueueOptions,
    queueCallback?: () => void
  ) {
    this._connection = connection;
    this._queueOptions = options;
    this._queue = this._connection.queue(name, options, queueCallback);
  }

  get connection(): AMQPClient {
    return this._connection;
  }
  get queueOptions(): QueueOptions {
    return this._queueOptions;
  }
  get queue(): AMQPQueue {
    return this._queue;
  }
  subscribe(
    options: SubscribeOptions,
    listener: () => void
  ): Observable<AMQPQueue | any> {
    return new Observable(observer => {
      try {
        this._queue.subscribe(options, listener);
        observer.next(this._queue);
      } catch (error) {
        observer.error(error);
      }
    });
  }
  unsubscribe(consumerTag: string): Observable<AMQPQueue | any> {
    return new Observable(observer => {
      try {
        this._queue.unsubscribe(consumerTag);
        observer.next(this._queue);
      } catch (error) {
        observer.error(error);
      }
    });
  }

  shift(reject?: boolean, requeue?: boolean): Observable<AMQPQueue | any> {
    return new Observable(observer => {
      try {
        this._queue.shift(reject, requeue);
        observer.next(this._queue);
      } catch (error) {
        observer.error(error);
      }
    });
  }

  destroy(options?): Observable<boolean> {
    return new Observable(observer => {
      try {
        this._queue.destroy(options);
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
  ): Observable<AMQPQueue | any> {
    return new Observable(observer => {
      try {
        this._queue.bind(srcExchange, routingKey, callback);
        this._queue.on("exchangeBindOk", () => observer.next(this._queue));
      } catch (error) {
        observer.error(error);
      }
    });
  }

  unbind(
    exchange: string,
    routingKey: string,
    callback: () => void
  ): Observable<AMQPQueue | any> {
    return new Observable(observer => {
      try {
        this._queue.unbind(exchange, routingKey);
        this._queue.on("queueUnbindOk", () => observer.next(this._queue));
      } catch (error) {
        observer.error(error);
      }
    });
  }

  bindHeaders(
    exchange: string,
    routingKey: string,
    callback: () => void
  ): Observable<AMQPQueue | any> {
    return new Observable(observer => {
      try {
        this._queue.bind_headers(exchange, routingKey);
        observer.next(this._queue);
      } catch (error) {
        observer.error(error);
      }
    });
  }
  unbindHeaders(
    exchange: string,
    routingKey: string,
    callback: () => void
  ): Observable<AMQPQueue | any> {
    return new Observable(observer => {
      try {
        this._queue.unbind_headers(exchange, routingKey);
        observer.next(this._queue);
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
