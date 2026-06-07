import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type AppLayoutProps = {
  children: ReactNode;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
};

const AppLayout = ({ children, searchTerm, onSearchChange }: AppLayoutProps) => {
  return (
    <div className="appShell">
      <Sidebar />

      <div className="appMain">
        <Topbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <main className="appContent">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;