import { Router } from 'express';
import { TicketRoute } from './tickets/route';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );

    router.use('/api/ticket', TicketRoute.routes );



    return router;
  }


}

