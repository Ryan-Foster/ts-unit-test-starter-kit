import { describe, it, expect, beforeEach } from "vitest";
import {
  addProduct,
  addToCart,
  removeFromCart,
  calculateTotal,
  clearCart,
} from "../src/ecommerce";
let cart = {};
describe("E-commerce System", () => {
  beforeEach(() => {
    addProduct("product1", 100, 10);
    addProduct("product2", 200, 5);
    clearCart();
  });
  it("should add products to cart", () => {
    cart = addToCart("product1", 2);
    expect(cart["product1"]).toBe(2);
  });
  it("should not allow adding more item that are not available in stock", () => {
    expect(() => addToCart("product1", 20)).toThrowError("Insufficient stock");
  });
  it("should not allow removing more items than available in cart", () => {
    cart = addToCart("product1", 5);
    expect(() => removeFromCart("product1", 7)).toThrowError(
      "Cannot remove item from cart"
    );
  });
  it("should remove products from cart", () => {
    addToCart("product1", 2);
    addToCart("product2", 2);
    cart = removeFromCart("product1", 2);
    expect(cart["product1"]).toBeUndefined();
    expect(cart["product2"]).toBe(2);
  });
  it("should calculate price of all products", () => {
    addToCart("product1", 2);
    addToCart("product2", 2);
    const sum = calculateTotal();
    expect(sum).toEqual(600);
  });
});
