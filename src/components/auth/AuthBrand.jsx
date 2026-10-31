
import { Code2, Sparkles } from "lucide-react";

export default function AuthBrand() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#245BFF] shadow-lg shadow-blue-600/20">
        <Code2 size={29} className="text-white" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-white">
        code<span className="text-[#245BFF]">pilot</span>
      </h1>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <Sparkles size={14} className="text-[#B6FF39]" />
        Your intelligent coding companion
      </div>
    </div>
  );
}
