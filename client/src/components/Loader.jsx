export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-24 h-24 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin" />

        {/* Middle pulsing ring */}
        <div
          className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin animation-delay-150"
          style={{ animationDuration: "1.5s" }}
        />

        {/* Inner glowing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
        </div>

        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "2s" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        </div>
        <div className="absolute inset-0 animate-spin animation-delay-500" style={{ animationDuration: "2s" }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute mt-32">
        <p className="text-cyan-400 font-medium tracking-wider animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
