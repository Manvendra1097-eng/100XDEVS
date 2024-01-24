function RevenueCard({ title, amount, orderCount }) {
  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="text-gray-700">{title}</div>
      <div className="flex justify-between">
        <div>₹ {amount}</div>
        {orderCount ? <div>{orderCount} orders</div> : null}
      </div>
    </div>
  );
}

export default RevenueCard;
