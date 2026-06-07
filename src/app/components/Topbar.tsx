"use client";

type TopbarProps = {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onLogout?: () => void;
};

const Topbar = ({ searchTerm = "", onSearchChange, onLogout }: TopbarProps) => {
  return (
    <header className="topbar">
      <input
        className="topbarSearch"
        type="text"
        placeholder="Buscar incidencias..."
        value={searchTerm}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />

      <div className="topbarRight">
        <div className="topbarBell">3</div>
        <div className="topbarProfile">GV</div>

        <button className="topbarLogout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Topbar;