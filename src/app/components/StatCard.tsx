type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: string;
};

const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  return (
    <div className="infoCard">
      <div className="infoCardTop">
        <h3>{title}</h3>
        <span className="infoCardIcon">{icon}</span>
      </div>

      <span>{value}</span>
      <p>{description}</p>
    </div>
  );
};

export default StatCard;