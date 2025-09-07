import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

interface Options {
    server: Server;
    path?: string; // ws
}

export class WssService {

    private static _instance: WssService;
    private wss: WebSocketServer;

    private constructor( options: Options ) {
        const { server, path = '/ws' } = options; // Localhost:3000/ws
        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    static get instance(): WssService {
        if ( !WssService._instance ) throw 'WssService no ha sido inicializado';
        return WssService._instance;
    }

    static initWss( options: Options ) {
        WssService._instance = new WssService( options );
        return WssService._instance;
    }

    public start() {
        this.wss.on('connection', ( ws: WebSocket ) => {
            console.log('Cliente conectado');

            ws.on('close', () => console.log('Cliente desconectado') );
        }); 
    } 

} 
