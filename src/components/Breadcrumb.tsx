import { useLocation } from "react-router-dom";

export function Breadcrumb() {
  const location = useLocation();

  const segmentos = location.pathname
    .split("/")
    .filter(Boolean)
    .map((seg) =>
      seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ")
    );

  if (segmentos.length === 0) return null;

  return (
    <nav className="text-sm text-gray-500 mt-5 ml-5">
      {segmentos.map((seg, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1">›</span>}
          {seg}
        </span>
      ))}
    </nav>
  );
}
