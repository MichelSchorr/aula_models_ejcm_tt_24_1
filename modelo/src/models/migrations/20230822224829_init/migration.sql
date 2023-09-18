/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductsOnCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductsOnPurchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClientFollows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCart" DROP CONSTRAINT "ProductsOnCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCart" DROP CONSTRAINT "ProductsOnCart_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnPurchase" DROP CONSTRAINT "ProductsOnPurchase_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnPurchase" DROP CONSTRAINT "ProductsOnPurchase_purchaseData_purchaseClientId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_clientId_fkey";

-- DropForeignKey
ALTER TABLE "_ClientFollows" DROP CONSTRAINT "_ClientFollows_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientFollows" DROP CONSTRAINT "_ClientFollows_B_fkey";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductsOnCart";

-- DropTable
DROP TABLE "ProductsOnPurchase";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "_ClientFollows";

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "email" VARCHAR(75) NOT NULL,
    "phone" CHAR(14)[],
    "first_name" VARCHAR(25) NOT NULL,
    "last_name" VARCHAR(25) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "client_id" INTEGER NOT NULL,
    "total_value" MONEY NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" MONEY NOT NULL,
    "category" VARCHAR(30)[],
    "stock" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "total_value" MONEY NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("date","client_id")
);

-- CreateTable
CREATE TABLE "products_on_purchase" (
    "product_id" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "purchase_client_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit_value_on_purchase" MONEY NOT NULL,

    CONSTRAINT "products_on_purchase_pkey" PRIMARY KEY ("product_id","purchase_date","purchase_client_id")
);

-- CreateTable
CREATE TABLE "products_on_cart" (
    "cart_client_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "products_on_cart_pkey" PRIMARY KEY ("cart_client_id","product_id")
);

-- CreateTable
CREATE TABLE "_client_follows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "client_cpf_key" ON "client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_phone_key" ON "client"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "client_first_name_last_name_key" ON "client"("first_name", "last_name");

-- CreateIndex
CREATE INDEX "product_ix_category" ON "product"("category");

-- CreateIndex
CREATE UNIQUE INDEX "_client_follows_AB_unique" ON "_client_follows"("A", "B");

-- CreateIndex
CREATE INDEX "_client_follows_B_index" ON "_client_follows"("B");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_purchase" ADD CONSTRAINT "products_on_purchase_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_purchase" ADD CONSTRAINT "products_on_purchase_purchase_date_purchase_client_id_fkey" FOREIGN KEY ("purchase_date", "purchase_client_id") REFERENCES "purchase"("date", "client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_cart" ADD CONSTRAINT "products_on_cart_cart_client_id_fkey" FOREIGN KEY ("cart_client_id") REFERENCES "cart"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_cart" ADD CONSTRAINT "products_on_cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_client_follows" ADD CONSTRAINT "_client_follows_A_fkey" FOREIGN KEY ("A") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_client_follows" ADD CONSTRAINT "_client_follows_B_fkey" FOREIGN KEY ("B") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
