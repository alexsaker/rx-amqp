import * as amqp from "amqp";
import { Observable } from "rxjs/Rx";
import { ConnectionOptions, AMQPClient } from "amqp";

export class RxAmqpConnection {
  private _connectionOptions: ConnectionOptions;
  private _connection: AMQPClient;
  constructor(options: ConnectionOptions) {
    this._connectionOptions = options;
  }

  get connection(): AMQPClient {
    return this._connection;
  }

  connect(): Observable<AMQPClient | any> {
    return new Observable(observer => {
      const connection = amqp.createConnection(this._connectionOptions);
      connection.on("ready", () => {
        this._connection = connection;
        observer.next(connection);
      });
      connection.on("error", err => observer.error(err));
    });
  }

  publish(routingKey, body, options?: any): Observable<AMQPClient | any> {
    return new Observable(observer => {
      try {
        this._connection.publish(routingKey, body, options, res => {});
        observer.next(this._connection);
      } catch (error) {
        observer.error(error);
      }
    });
  }

  disconnect(): Observable<boolean> {
    return new Observable(observer => {
      try {
        this._connection.disconnect();
        observer.next(true);
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
