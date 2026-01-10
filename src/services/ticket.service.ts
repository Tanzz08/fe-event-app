import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket } from "@/types/Ticket";

const TicketServices = {
  getEventByEventId: (id: string) => instance.get(`${endpoint.TICKETS}/${id}/events`),
  addTicket: (payload: ITicket) => instance.post(endpoint.TICKETS, payload),
  deleteEventTicket: (id: string) => instance.delete(`${endpoint.TICKETS}/${id}`),
  updateTicket: (id: string, payload: ITicket) =>
    instance.put(`${endpoint.TICKETS}/${id}`, payload),
};

export default TicketServices;
