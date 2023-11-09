import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
class CartController {
  async create(req: Request, res: Response) {
    try {
      const { clientId } = req.body;

      let cartInput: Prisma.CartCreateInput = {
        client: {connect: {id: clientId}},
        totalValue: 0,
      };

      const newCart = await prisma.cart.create({
        data: cartInput,
      });

      return res.status(201).json(newCart);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  async addToCart(req: Request, res: Response) {
    try {
      const { clientId, productId, amount } = req.body;
      let cartProductInput: Prisma.ProductsOnCartCreateInput = {
        cart: { connect: { clientId: clientId } },
        product: { connect: { id: productId } },
        amount
      };
      const newCartProduct = await prisma.productsOnCart.upsert({
        where: {
          cartClientId_productId: { cartClientId: clientId, productId: productId },
        },
        update: { amount: { increment: amount } },
        create: cartProductInput,
      });
      const productPrice = await prisma.product.findUnique({
        where: { id: parseInt(productId) }
      });
      async function updateCartTotalValue(clientId: number, amount: number) {
        return prisma.cart.update({
          where: { clientId: clientId },
          data: { totalValue: { increment: amount * Number(productPrice?.price)} },
        });
      }
      updateCartTotalValue(clientId, amount);

      return res.status(201).json(newCartProduct);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
  async rmProduct(req: Request, res: Response) {
    try {
      const { cartClientId, productId, amount} = req.body;
      const dataProduct = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      await prisma.productsOnCart.update({
        where: { cartClientId_productId: { cartClientId: Number(cartClientId), productId: Number(productId) } },
        data: { amount: { decrement: Number(amount) } },
      });
      async function updateCartTotalValue(cartClientId: number) {
        return prisma.cart.update({
          where: { clientId: cartClientId },
          data: { totalValue: { decrement: Number(dataProduct?.price) * Number(amount) } },
        });
      }
      updateCartTotalValue(cartClientId);
      const productAmount = await prisma.productsOnCart.findUnique({
        where: { cartClientId_productId: { cartClientId: Number(cartClientId), productId: Number(productId) } },
      });
      if (productAmount?.amount === 0) {
        await prisma.productsOnCart.delete({
          where: { cartClientId_productId: { cartClientId: Number(cartClientId), productId: Number(productId) } },
        });
      }
      return res.status(200).json({ message: "Product removed from cart." });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } 
  
  async getCart(req: Request, res: Response) {
    try {
      const { clientId } = req.params;

      const cart = await prisma.cart.findUnique({
        where: { clientId: parseInt(clientId) },
        include: { product: true },
      });

      return res.status(200).json(cart);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao obter o carrinho de compras." });
    }
  }
}

export default new CartController();