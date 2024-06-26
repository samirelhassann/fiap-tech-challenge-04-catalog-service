import { beforeEach, describe, expect, it, vi } from "vitest";

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { ProductUseCase } from "@/core/useCases/product/ProductUseCase";
import { makeProduct } from "@test/unit/adapters/factories/MakeProduct";
import { InMemoryProductRepository } from "@test/unit/adapters/InMemoryProductRepository";

let inMemoryProductRepository: InMemoryProductRepository;
let sut: ProductUseCase;

describe("Given the Get Product By Id Use Case", () => {
  const id = "123";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new ProductUseCase(inMemoryProductRepository);
  });

  it("should return the product correctly", async () => {
    const product = makeProduct({}, new UniqueEntityId(id));

    inMemoryProductRepository.items.push(product);

    const { product: foundedProduct } = await sut.getProductById({ id });

    expect(foundedProduct).toEqual(
      expect.objectContaining({
        id: new UniqueEntityId(id),
      })
    );
  });

  it("should throw an error when the informed id does not exist", async () => {
    const product = makeProduct({}, new UniqueEntityId(id));

    inMemoryProductRepository.items.push(product);

    await expect(() =>
      sut.getProductById({ id: "456" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
