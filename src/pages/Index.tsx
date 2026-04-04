const ColorPalette = () => {
  const colors = [
    { name: "Красный", hex: "#E63946" },
    { name: "Зелёный", hex: "#2D6A4F" },
    { name: "Синий", hex: "#1D3D8F" },
    { name: "Розовый", hex: "#F472B6" },
    { name: "Белый", hex: "#FFFFFF" },
  ];

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6">
      <div className="w-[440px] rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#1a1a1a" }}>
        {/* Image container with color overlay effect */}
        <div className="relative w-full">
          {/* Generated image with colored dresses */}
          <img
            src="https://cdn.poehali.dev/projects/e2914489-88ab-4a41-8ae3-adfd1e6c1bed/files/ccea5af4-6144-4ec7-9785-ad3e271371f2.jpg"
            alt="Bridesmaids in red, green, blue, pink and white dresses"
            className="w-full object-cover object-[center_35%]"
            style={{ height: "360px" }}
          />

          {/* Toolbar overlay at bottom-left of image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1.5">
            <div className="w-6 h-6 bg-[#E63946] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">Y</span>
            </div>
            <button className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M2.05 12a9.95 9.95 0 1 0 19.9 0A9.95 9.95 0 0 0 2.05 12z" />
              </svg>
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="1" fill="currentColor" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="12" cy="19" r="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        {/* Color swatches row */}
        <div className="flex" style={{ height: "80px" }}>
          {colors.map((color, i) => (
            <div
              key={color.hex}
              className="flex-1 relative group cursor-pointer transition-all duration-200 hover:flex-[1.3]"
              style={{ backgroundColor: color.hex }}
            >
              {/* Hover tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-mono">
                  {color.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Black bottom bar */}
        <div
          className="flex items-center justify-center"
          style={{ height: "50px", background: "#0a0a0a" }}
        >
          <div className="flex gap-3">
            {colors.map((color) => (
              <div
                key={color.hex}
                className="w-5 h-5 rounded-sm shadow-inner"
                style={{
                  backgroundColor: color.hex,
                  border: color.hex === "#FFFFFF" ? "1px solid rgba(255,255,255,0.15)" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return <ColorPalette />;
};

export default Index;