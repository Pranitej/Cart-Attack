import Header from "../components/Header";

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Orders</h1>
        <p className="text-gray-700 dark:text-gray-300">Your order history will appear here.</p>
      </main>
    </div>
  );
}