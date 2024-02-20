import { PrismaClient } from '@prisma/client';
import data from './data';

const prismaClient = new PrismaClient();
const startTime = Date.now();
console.log(startTime / 1000);

async function seed() {
  const products = data.products;
  for (const product of products) {
    await prismaClient.product.upsert({
      where: { id: Number(product.id) },
      update: {},
      create: {
        id: Number(product.id),
        name: product.goodsnm.trim(),
        imgSrc: product.img_i,
        deliveryType: '로켓 배송',
        onlineStock: 9999,
        originalPrice: product.standard_price,
        price: product.price,
        brand: {
          connectOrCreate: {
            where: { id: product.brand.id },
            create: {
              id: product.brand.id,
              nameEn: product.brand.name.trim(),
              nameKr: product.brand.kr_name.trim(),
            },
          },
        },
      },
    });
  }
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  console.log(duration);
}

seed();
