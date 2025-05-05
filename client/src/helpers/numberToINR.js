export default function formatToINR(num) {
  if (isNaN(num)) return "";
  return "₹" + num.toLocaleString("en-IN");
}
