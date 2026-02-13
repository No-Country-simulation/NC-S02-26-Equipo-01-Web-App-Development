type CardProps = {
  children: React.ReactNode;
  dataTestId?: string;
};

const Card = ({ children, dataTestId = "card" }: CardProps) => {
  return (
    <div data-testid={dataTestId} className="bg-white rounded-lg shadow-md p-4">
      {children}
    </div>
  );
};

export default Card;
