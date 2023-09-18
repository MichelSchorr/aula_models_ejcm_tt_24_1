import { Prisma , PrismaClient} from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class PurchaseController {

    async create(req: Request, res: Response){
        try {
            const { id } = req.params;
            const { productId, totalValue, status, amount , unitValueOnPurchase } = req.body;
            const calculatedTotalValue = amount * unitValueOnPurchase

            const purchaseInput: Prisma.PurchaseCreateInput ={
                client: {
                    connect: {
                        id: Number(id)
                    }
                },                
                totalValue: calculatedTotalValue,
                status,
                product:{
                    create:{
                        productId: Number(productId),
                        amount,
                        unitValueOnPurchase
                    }

                }
                
                              
            }
            const purchase = await prisma.purchase.create({
                data: purchaseInput,
                include: {
                    product: true,
                    
                },
                
            })

            return res.status(201).json(purchase)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message})
            
        }
    }    

    async index(req: Request, res: Response) {
        try {
            const purchases = await prisma.purchase.findMany({
                include: {
                    client: true,
                    product: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            return res.status(200).json(purchases);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    async destroy(req: Request, res: Response) {
        try {
            const { date , clientId } = req.params;          

            
            const deletedPurchase = await prisma.purchase.delete({
                where: {
                    date_clientId: {
                        clientId: Number(clientId),
                        date: date
                    }
                },
                include:{
                    product: true,
                    client: true
                }
            })
            if (deletedPurchase) {
                return res.status(200).json(deletedPurchase);
            } else {
                return res.status(404).json({ error: "Purchase not found" });
            }
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
   
}

export default new PurchaseController()