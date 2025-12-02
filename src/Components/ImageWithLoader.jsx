import { useState } from "react";

export function ImageWithLoader({ src, alt }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-h-[400px] relative">
        
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 rounded-md">
          <div className="spinner"></div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={`w-full max-h-[400px] object-cover rounded-md transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
