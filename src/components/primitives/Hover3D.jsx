export default function Hover3D({ children, className = "" }) {
  return (
    <div className={`hover-3d ${className}`}>
      {children}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
}
