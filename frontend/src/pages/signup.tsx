export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Signup Page</h1>
      <form className="flex flex-col gap-4 w-64">
        <input
          type="text"
          placeholder="Full Name"
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
        />
        <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Signup
        </button>
      </form>
    </div>
  );
}
