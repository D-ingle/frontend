import type { DealInfo } from "@/shared/api/generated/model/dealInfo";

/**
 * Formats a price number into a Korean currency string.
 * Example: 69000 -> 6억 9,000
 * @param price - Price in ten thousands (man-won)
 */
export const formatNumberToKoreanPrice = (price: number) => {
  if (price === 0) return "0";
  const uk = Math.floor(price / 10000);
  const remaining = price % 10000;
  if (uk > 0) {
    if (remaining > 0) {
      // Format remaining part with commas (e.g., 9,000)
      const formattedRemaining = remaining.toLocaleString();
      return `${uk}억 ${formattedRemaining}`;
    }
    return `${uk}억`;
  }
  return price.toLocaleString();
};

/**
 * Formats a DealInfo object into a display string.
 * Example: { dealType: 'LEASE', price: 69000 } -> 전세 6억 9,000
 */
export const formatPrice = (deal?: DealInfo) => {
  if (!deal) return "-";

  const { dealType, deposit, monthlyRent, price } = deal;

  switch (dealType) {
    case "RENT":
      return `월세 ${deposit}/${monthlyRent}`;
    case "LEASE":
      return `전세 ${formatNumberToKoreanPrice(price || 0)}`;
    case "SALE":
      return `매매 ${formatNumberToKoreanPrice(price || 0)}`;
    default:
      return "-";
  }
};
