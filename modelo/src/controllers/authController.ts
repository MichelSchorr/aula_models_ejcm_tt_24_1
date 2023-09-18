import { Request, Response } from "express";
import Auth from "../config/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const client = await prisma.client.findUnique({
        where: { email: req.body.email },
      });
      if (!client)
        return res.status(404).json({ message: "Usuário não encontrado." });
      const { password } = req.body;
      if (Auth.checkPassword(password, client.hash, client.salt)) {
        const token = Auth.generateJWT(client);
        return res.status(200).json({ token: token });
      } else {
        return res.status(401).json({ message: "Senha inválida." });
      }
    } catch (e) {
      return res.status(500).json({ err: e });
    }
  }

  async getDetails(req: Request, res: Response) {
    try {
      const token = Auth.getToken(req);
      const payload = Auth.decodeJWT(token);
      const client = await prisma.client.findUnique({ where: { id: payload.sub } });
      if (!client)
        return res.status(404).json({ message: "Usuário não encontrado." });
      return res.status(200).json({ client: client });
    } catch (e) {
      return res.status(500).json({ err: e });
    }
  }
}

export default new AuthController();