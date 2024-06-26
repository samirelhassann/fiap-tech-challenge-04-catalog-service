import { beforeEach, describe, expect, it, vi } from "vitest";

import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { ProductUseCase } from "@/core/useCases/product/ProductUseCase";
import { makeProduct } from "@test/unit/adapters/factories/MakeProduct";
import { InMemoryProductRepository } from "@test/unit/adapters/InMemoryProductRepository";

let inMemoryProductRepository: InMemoryProductRepository;
let sut: ProductUseCase;

describe("Given the Get Products Use Case", () => {
  const page = 1;
  const size = 10;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new ProductUseCase(inMemoryProductRepository);
  });

  it("should return the products correctly", async () => {
    const params = new PaginationParams(page, size);

    const productToCreate = makeProduct();

    inMemoryProductRepository.items.push(productToCreate);

    const { paginationResponse } = await sut.getProducts({
      params,
      includeInactive: false,
    });

    const products = paginationResponse.data;

    expect(products).toHaveLength(1);
  });

  it("should return the products from the second pagination correctly", async () => {
    const params = new PaginationParams(2, size);

    Array.from({ length: 12 }).forEach(() => {
      inMemoryProductRepository.items.push(makeProduct());
    });

    const { paginationResponse } = await sut.getProducts({
      params,
      includeInactive: false,
    });

    const products = paginationResponse.data;

    expect(products).toHaveLength(2);
  });
});
