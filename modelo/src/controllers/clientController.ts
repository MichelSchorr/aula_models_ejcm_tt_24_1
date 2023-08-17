import { Prisma , PrismaClient} from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface Client {
    cpf: string,
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    followedBy: number,
    following: number
}

class ClientController {

    async create(req: Request, res: Response){
        try{
            const { cpf, email , phone, firstName, lastName}:Client = req.body;
            let clientInput: Prisma.ClientCreateInput = {
                cpf,
                email,
                firstName,
                lastName,
                phone               
            }
            const client = await prisma.client.create({
                data: clientInput,               
            })
            return res.status(201).json(client);

        }catch(error: any){
            return res.status(500).json({ error: error.message})

        }
    }
    async show(req: Request, res: Response){
        try {
            const client = await prisma.client.findMany({
                include: {
                    followedBy: true,
                    following: true
                }
            })
            return res.status(201).json(client)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async index(req: Request, res: Response){
        try {
            const { id } = req.params;
            const client = await prisma.client.findUnique({
                where:{
                    id: Number(id)
                },
                include:{
                    followedBy: true,
                    following: true
                }
            })
            return res.status(201).json(client)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async update(req: Request, res: Response){
        try {
            const { id } = req.params;
            const { cpf, email , phone, firstName, lastName }:Client = req.body;
            let clientInput: Prisma.ClientUpdateInput = {
                cpf,
                email,
                firstName,
                lastName,
                phone               
            }
            const client = await prisma.client.update({
                data: clientInput,
                where: {
                    id: Number(id)
                }
            })
            return res.status(201).json(client)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async destroy(req: Request, res: Response){
        try {
            const { id } = req.params;
            const client = await prisma.client.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.status(201).json(client)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async follow(req: Request, res: Response){
        try {
            const { followedId, followingId} = req.body;
            const follower = await prisma.client.findUnique({
                where: {
                    id: Number(followedId)
                },
                include:{
                    following: true
                }
            })

            if(!follower){
                return res.status(404).json({ error: 'Follower not found'})
            }
            if (follower.following.some(client => client.id === followingId)) {
                return res.status(400).json({ error: 'Already following this client' });
              }
            

            const updateFollow = await prisma.client.update({
                where:{
                    id: Number(followedId),
                },
                data:{
                    following: {connect: {
                        id: Number(followingId)
                    }}
                }
            })
            return res.status(200).json(updateFollow);
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async unfollow(req: Request, res: Response){
        try {
            const { followedId, followingId} = req.body;
            const follower = await prisma.client.findUnique({
                where: {
                    id: Number(followedId)
                },
                include: {
                    following: true
                }
            })

            if(!follower){
                return res.status(404).json({ error: 'Follower not found'})
            }

            if(!follower.following.some( client => client.id === followingId)){
                return res.status(400).json({ error: 'Not following  this client'})
            }

            const updateFollower = await prisma.client.update({
                where:{
                    id: Number(followedId)
                },
                data: {
                    following: { disconnect: { id: Number(followingId) }}
                }
            })
            return res.status(200).json(updateFollower)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
}

export default new ClientController()