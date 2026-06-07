import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type AppLayoutProps = {
  children: ReactNode;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onLogout?: () => void;
};

const AppLayout = ({ children, searchTerm, onSearchChange, onLogout }: AppLayoutProps) => {
  return (
    <div className="appShell">
      <Sidebar />

      <div className="appMain">
        <Topbar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onLogout={onLogout}
        />
        <main className="appContent">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;