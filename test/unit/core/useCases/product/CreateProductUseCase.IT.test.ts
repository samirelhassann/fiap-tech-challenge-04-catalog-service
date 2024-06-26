import { beforeEach, describe, expect, it, vi } from "vitest";

import { AttributeConflictError } from "@/core/domain/base/errors/useCases/AttributeConflictError";
import { ProductUseCase } from "@/core/useCases/product/ProductUseCase";
import { makeProduct } from "@test/unit/adapters/factories/MakeProduct";
import { InMemoryProductRepository } from "@test/unit/adapters/InMemoryProductRepository";

let inMemoryProductRepository: InMemoryProductRepository;
let sut: ProductUseCase;

describe("Given the Create Product Use Case", () => {
  const name = "hamburger";
  const description = "hamburguer com queijo e salada";
  const category = "SANDWICH";
  const price = 9.5;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new ProductUseCase(inMemoryProductRepository);
  });

  it("should create the product correctly", async () => {
    await sut.createProduct({
      name,
      description,
      price,
      category,
    });

    expect(
      inMemoryProductRepository.items.filter((c) => c.name === name)
    ).toHaveLength(1);
  });

  it("should throw an error when the informed 'name' already exists", async () => {
    const createdProduct = makeProduct({
      name,
    });

    inMemoryProductRepository.items.push(createdProduct);

    await expect(() =>
      sut.createProduct({
        name,
        description,
        price,
        category,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
