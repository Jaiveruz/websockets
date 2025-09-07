import { Request, Response } from "express";



export class TicketsController {
    constructor() {}

    public getTickets = async (req: Request, res: Response) => {
        res.json('getTickets');
    }

    public getLastTicketNumber = async (req: Request, res: Response) => {
        res.json('getLastTicketNumber');
    }

    public pendingTickets = async (req: Request, res: Response) => {
        res.json('pendingTickets');
    }

    public createTicket = async (req: Request, res: Response) => {
        res.json('createTicket');
    }

    public drawTicket = async (req: Request, res: Response) => {
        res.json('drawTicket');
    }

    public ticketfinished = async (req: Request, res: Response) => {
        res.json('ticketfinished');
    }

    public workingOn = async (req: Request, res: Response) => {
        res.json('workingOn');
    }

}