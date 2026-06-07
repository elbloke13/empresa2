"use client";

type TopbarProps = {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
};

const Topbar = ({ searchTerm = "", onSearchChange }: TopbarProps) => {
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
        <div className="topbarProfile">MP</div>
      </div>
    </header>
  );
};

export default Topbar;