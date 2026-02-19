export default function DashboardPage() {
  const stats = [
    { title: "Total Bookings", value: "128" },
    { title: "Pending Approvals", value: "18" },
    { title: "Total Menu Items", value: "54" },
    { title: "Feedback Received", value: "32" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <h3 className="text-3xl font-bold mt-3 text-orange-600">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white mt-10 p-6 rounded-2xl shadow-sm border">
        <h3 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="pb-3">Customer</th>
              <th className="pb-3">Event</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">Rohit Sharma</td>
              <td>Wedding</td>
              <td>12 March 2026</td>
              <td className="text-yellow-500 font-medium">Pending</td>
            </tr>
            <tr>
              <td className="py-4">Anjali Singh</td>
              <td>Birthday Party</td>
              <td>18 March 2026</td>
              <td className="text-green-600 font-medium">Approved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
