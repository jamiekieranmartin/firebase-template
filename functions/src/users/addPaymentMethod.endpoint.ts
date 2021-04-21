import { Request, Response } from "express";
import { Endpoint, RequestType } from "firebase-backend";

export default new Endpoint(
  "addPaymentMethod",
  RequestType.POST,
  (request: Request, response: Response) => {
    const { card, holder } = request.body;

    return response.status(201).send({
      token: card + "_" + holder,
    });
  }
);
