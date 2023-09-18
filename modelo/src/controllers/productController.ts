import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface Product {
    name: string;
    price: number;
    availability: number;
    category: string[];
    stock: number;
    description: string;
}

class ProductController {
    async create(req: Request, res: Response) {
        try {
            const {
                name,
                price,                
                category,
                stock,
                description,
            } = req.body;

            let productInput: Prisma.ProductCreateInput = {
                name,
                price,             
                category,
                stock,
                description,
            };

            const newProduct = await prisma.product.create({
                data: productInput,
            });

            return res.status(201).json(newProduct);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async index(req: Request, res: Response) {
        try {
            const products = await prisma.product.findMany();
            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await prisma.product.findUnique({
                where: {
                    id: Number(id),
                },
            });

            return res.status(200).json(product);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                name,
                price,              
                category,
                stock,
                description,
            } = req.body;

            let productInput: Prisma.ProductUpdateInput = {
                name,
                price,                
                category,
                stock,
                description,
            };

            const updatedProduct = await prisma.product.update({
                where: {
                    id: Number(id),
                },
                data: productInput,
            });

            if (updatedProduct) {
                const product = await prisma.product.findUnique({
                    where: {
                        id: Number(id),
                    },
                });
                return res.status(201).json(product);
            } else {
                return res.status(404).json({ error: "Product not found" });
            }
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deletedProduct = await prisma.product.delete({
                where: {
                    id: Number(id),
                },
            });

            if (deletedProduct) {
                return res.status(200).json(deletedProduct);
            } else {
                return res.status(404).json({ error: "Product not found" });
            }
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new ProductController();