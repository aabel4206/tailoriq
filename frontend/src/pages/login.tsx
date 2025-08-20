export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login Page</h1>
      <form className="flex flex-col gap-4 w-64">
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
        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
