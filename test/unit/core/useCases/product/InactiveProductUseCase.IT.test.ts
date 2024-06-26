import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { ProductUseCase } from "@/core/useCases/product/ProductUseCase";
import { makeProduct } from "@test/unit/adapters/factories/MakeProduct";
import { InMemoryProductRepository } from "@test/unit/adapters/InMemoryProductRepository";

let inMemoryProductRepository: InMemoryProductRepository;
let sut: ProductUseCase;

describe("Given the Inactive Product Use Case", () => {
  const name = "updated name";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new ProductUseCase(inMemoryProductRepository);
  });

  it("should inactive the product correctly", async () => {
    const createdProduct = makeProduct();

    inMemoryProductRepository.items.push(createdProduct);

    await sut.inactiveProduct({
      id: createdProduct.id.toString(),
    });

    expect(inMemoryProductRepository.items[0]).toEqual(
      expect.objectContaining({
        active: false,
      })
    );
  });

  it("should throw an error when the informed 'id' does not exist", async () => {
    const createdProduct = makeProduct({
      name,
    });

    inMemoryProductRepository.items.push(createdProduct);

    await expect(() =>
      sut.inactiveProduct({
        id: "test",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
