/**
 * Shipping calculation rules based on total order item quantity.
 * Scales dynamically as items are added/removed in the cart.
 */

export interface ShippingTier {
  minQty: number;
  maxQty: number;
  fee: number;
  label: string;
  description: string;
}

export const SHIPPING_TIERS: ShippingTier[] = [
  {
    minQty: 1,
    maxQty: 5,
    fee: 15,
    label: "Express Air Courier (1–5 units)",
    description: "Base international air courier parcel",
  },
  {
    minQty: 6,
    maxQty: 15,
    fee: 25,
    label: "Standard Courier (6–15 units)",
    description: "Multi-pack express parcel",
  },
  {
    minQty: 16,
    maxQty: 30,
    fee: 40,
    label: "Medium Parcel (16–30 units)",
    description: "Insulated protective carton",
  },
  {
    minQty: 31,
    maxQty: 50,
    fee: 60,
    label: "Bulk Priority Parcel (31–50 units)",
    description: "Bulk consolidated export freight",
  },
];

export interface ShippingCalculation {
  shippingFee: number;
  tierLabel: string;
  description: string;
  isBulkTier?: boolean;
}

export function calculateShipping(totalQuantity: number): ShippingCalculation {
  if (!totalQuantity || totalQuantity <= 0) {
    return {
      shippingFee: 0,
      tierLabel: "No items",
      description: "Add items to calculate shipping",
    };
  }

  for (const tier of SHIPPING_TIERS) {
    if (totalQuantity >= tier.minQty && totalQuantity <= tier.maxQty) {
      return {
        shippingFee: tier.fee,
        tierLabel: tier.label,
        description: tier.description,
      };
    }
  }

  // 51+ units: $60 base (up to 50) + $1.00 per extra unit
  const extra = totalQuantity - 50;
  const bulkFee = Number((60 + extra * 1.0).toFixed(2));
  return {
    shippingFee: bulkFee,
    tierLabel: `Commercial Wholesale (${totalQuantity} units)`,
    description: `$60 base + $1.00 per unit above 50 units`,
    isBulkTier: true,
  };
}
