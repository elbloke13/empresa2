type StatusBadgeProps = {
  value: string;
  type: "estado" | "severidad";
};

const StatusBadge = ({ value, type }: StatusBadgeProps) => {
  const getClassName = () => {
    if (type === "estado") {
      switch (value) {
        case "Abierta":
          return "badge badgeAbierta";
        case "En progreso":
          return "badge badgeProgreso";
        case "Resuelta":
          return "badge badgeResuelta";
        default:
          return "badge";
      }
    }

    if (type === "severidad") {
      switch (value) {
        case "Crítica":
          return "badge badgeCritica";
        case "Alta":
          return "badge badgeAlta";
        case "Media":
          return "badge badgeMedia";
        case "Baja":
          return "badge badgeBaja";
        default:
          return "badge";
      }
    }

    return "badge";
  };

  return <span className={getClassName()}>{value}</span>;
};

export default StatusBadge;