export type CartLine = {
  productId: string;
  productFormatId: string;
  sku: string;
  title: string;
  formatLabel: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
};

export type CartState = {
  items: CartLine[];
};

export const CART_COOKIE = "slt_cart";

export function parseCart(raw: string | undefined): CartState {
  if (!raw) return { items: [] };
  try {
    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

export function serializeCart(cart: CartState): string {
  return JSON.stringify(cart);
}

export function cartTotal(cart: CartState): number {
  return cart.items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

export function cartItemCount(cart: CartState): number {
  return cart.items.reduce((sum, line) => sum + line.quantity, 0);
}
