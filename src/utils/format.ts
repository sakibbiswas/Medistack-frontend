// Format date as DD/MM/YYYY
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

// Format time as HH:mm
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

// Format currency (USD by default, can adjust for BDT if needed)
export const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};
