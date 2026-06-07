"use client";

import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Crear incidencia", path: "/nueva-incidencia" },
    { label: "Configuración", path: "/" },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebarLogo">
          <h2>Segura+</h2>
          <p>Gestión de incidencias</p>
        </div>

        <nav className="sidebarNav">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <button
                key={item.path}
                type="button"
                className={isActive ? "sidebarItem active" : "sidebarItem"}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebarUser">
        <div className="sidebarAvatar">GV</div>

        <div>
          <p>Gonzalo Vázquez</p>
          <span>Administrador</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;