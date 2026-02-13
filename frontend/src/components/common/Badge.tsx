type BadgeProps = {
  text: string;
  dataTestId?: string;
  icon?: React.ReactNode;
};

const Badge = ({ text, dataTestId = "badge", icon }: BadgeProps) => {
  return (
    <span
      data-testid={dataTestId}
      className="inline-block bg-accent text-white text-xs text-center font-semibold px-3 py-3 rounded-full"
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  );
};

export default Badge;
