type Props = { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" };

export default function Button({ children, onClick, type = "button" }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
    >
      {children}
    </button>
  );
}
