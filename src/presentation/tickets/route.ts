import { Router } from "express";
import { TicketsController } from './controller';



export class TicketRoute {

    static get routes() {
        const router = Router();
        const ticketsController = new TicketsController();

        router.get('/', ticketsController.getTickets);
        router.get('/last', ticketsController.getLastTicketNumber);
        router.get('/pending', ticketsController.pendingTickets);

        router.post('/', ticketsController.createTicket);

        router.post('/draw/:desk', ticketsController.drawTicket);
        router.put('/done/:ticketId', ticketsController.ticketfinished);

        router.get('/working-on', ticketsController.workingOn);

        return router;
    }

}