import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';
import { ProductSchema } from '../schemas/productSchema';
import { ProductEditSchema } from '../schemas/productEditSchema';

//@desc fetch all products
//@route GET api/products/
//@access public
export const getProducts = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany({
      include: {
        images: {
          select: {
            id: true,
            url: true,
            fileId: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        productVariants: true,
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      products,
    });
  }
);

//@desc fetch a product
//@route GET api/products/:id
//@access public
export const getProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: productId } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        reviews: true,
        productVariants: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      res.status(404);
      throw new Error('This product does not exist.');
    }

    res.json({
      success: true,
      message: 'Successful.',
      product,
    });
  }
);

//@desc Create a product
//@route POST api/products
//@access private(ADMINS ONLY)
export const createProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId, images, ...productData } = req.body as ProductSchema;

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      res.status(400);
      throw new Error('The category does not exist.');
    }

    let totalQuantity: number;
    let price: number;
    let productVariants: any[] | undefined;

    if (productData.hasVariants) {
      totalQuantity = productData.productVariants.reduce(
        (sum, variant) => sum + Number(variant.quantity),
        0
      );
      price = Number(productData.productVariants[0].price);
      productVariants = productData.productVariants;
    } else {
      totalQuantity = Number(productData.quantity);
      price = Number(productData.price);
      productVariants = undefined;
    }

    const newProduct = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        gender: productData.gender,
        colorId: productData.colorId,
        variantTypeName: productData.hasVariants
          ? productData.variantTypeName
          : undefined,
        quantity: totalQuantity,
        price,
        categoryId,
        images: {
          createMany: {
            data: images,
          },
        },
        productVariants: productVariants
          ? {
              createMany: {
                data: productVariants,
              },
            }
          : undefined,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Product created Successfully.',
      data: { product: newProduct },
    });
  }
);

//@desc Update a product
//@route PATCH api/products/:id
//@access private(ADMINS ONLY)
export const updateProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { images, categoryId, productVariants, variantTypeName, ...rest } =
      req.body as ProductEditSchema;
    const { id: productId } = req.params;

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        res.status(400);
        throw new Error('This category does not exist.');
      }
    }

    const hasVariants = !!variantTypeName || (productVariants?.length ?? 0) > 0;

    let totalQuantity: number = 0;
    let price: number = 0;

    if (hasVariants && productVariants && productVariants.length > 0) {
      totalQuantity = productVariants.reduce(
        (sum, variant) => sum + Number(variant.quantity),
        0
      );

      // Use first variant's price as product price
      price = Number(productVariants[0].price);

      // Get existing variants from database
      const existingVariants = await prisma.productVariant.findMany({
        where: { productId },
        select: { id: true },
      });

      const existingVariantIds = existingVariants.map((v) => v.id);
      const submittedVariantIds = productVariants
        .filter((v) => v.id)
        .map((v) => v.id!);

      const variantsToUpdate = productVariants.filter((v) => v.id);
      for (const variant of variantsToUpdate) {
        await prisma.productVariant.update({
          where: { id: variant.id },
          data: {
            value: variant.value,
            price: Number(variant.price),
            quantity: Number(variant.quantity),
          },
        });
      }

      // 2. CREATE new variants
      const variantsToCreate = productVariants.filter((v) => !v.id);
      if (variantsToCreate.length > 0) {
        await prisma.productVariant.createMany({
          data: variantsToCreate.map((v) => ({
            value: v.value,
            price: Number(v.price),
            quantity: Number(v.quantity),
            productId: productId,
          })),
        });
      }

      // 3. DELETE removed variants
      const variantsToDelete = existingVariantIds.filter(
        (id) => !submittedVariantIds.includes(id)
      );
      if (variantsToDelete.length > 0) {
        await prisma.productVariant.deleteMany({
          where: {
            id: { in: variantsToDelete },
          },
        });
      }
    } else {
      totalQuantity = Number(rest.quantity ?? 0);
      price = Number(rest.price ?? 0);

      // Clear all variants if product no longer has variants
      await prisma.productVariant.deleteMany({
        where: { productId },
      });
    }

    // Prepare update data
    const updateData: any = {
      ...rest,
      quantity: totalQuantity,
      price: price,
      variantTypeName: hasVariants ? variantTypeName : null,
    };

    if (categoryId) {
      updateData.categoryId = categoryId;
    }

    if (images && images.length > 0) {
      updateData.images = {
        deleteMany: {},
        createMany: {
          data: images.map((img) => ({
            url: img.url,
            fileId: img.fileId,
          })),
        },
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updateData,
      include: {
        images: true,
        productVariants: true,
        category: true,
        color: true,
      },
    });

    res.json({
      success: true,
      message: 'Product updated successfully.',
      data: { product: updatedProduct },
    });
  }
);

//@desc delete a product
//@route DELETE api/products/:id
//@access private(ADMINS ONLY)
export const deleteProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: productId } = req.params;

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  }
);

//@desc delete many product
//@route DELETE api/products/:id
//@access private(ADMINS ONLY)
export const deleteProducts = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productIds } = req.body as { productIds: string[] };

    const products = await prisma.product.deleteMany({
      where: {
        id: { in: productIds },
      },
    });

    res.json({
      success: true,
      message: `Successfully deleted ${products.count} products.`,
    });
  }
);
