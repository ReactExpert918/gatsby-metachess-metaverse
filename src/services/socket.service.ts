import socketIO from 'socket.io-client';
import { SOCKET } from '../config';

interface ISocketHandler {
  callback: (payload: any) => void;
  eventName: string;
}

class _SocketHandler {
  io: SocketIOClient.Socket;
  handlersToConnect: ISocketHandler[] = [];
  emitters: Array<{ eventName: string, payload: any, ackCallback?: Function; }> = [];

  init = () => {
    this.io = socketIO(SOCKET)
    this.io.on('connect', () => {
      this.handlersToConnect.forEach(h => {
        this._addHandler(h);
      })
      this.emitters.forEach(t => this.io.emit(t.eventName, t.payload, t.ackCallback));
    })
  }

  private _addHandler = (event: ISocketHandler) => {
    this.io.on(event.eventName, (payload: any) => {
      console.log('TRIGGERED EVENT:', event.eventName);
      console.log('PAYLOAD FROM BACKEND:', payload)
      event.callback(payload);
    })
  }

  subscribeTo = (event: ISocketHandler) => {
    this.handlersToConnect.push(event);
    if (this.io?.connected) {
      this._addHandler(event);
    }
  }

  sendData = (eventName: string, payload: any, ackCallback?: Function) => {
    if (!this?.io?.connected) {
      console.log("Event name::", eventName)
      this.emitters.push({
        eventName,
        payload,
        ackCallback
      })
    } else {
      console.log("Sending: connected:", eventName)
      this.io.emit(eventName, payload, ackCallback);
    }
  }
}

const SocketService = new _SocketHandler();

export default SocketService;
