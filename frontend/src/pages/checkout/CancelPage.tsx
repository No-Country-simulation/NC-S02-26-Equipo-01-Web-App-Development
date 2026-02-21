import { useNavigate } from "react-router";
import SectionContainer from "@/components/layout/SectionContainer";
import Button from "@/components/common/Button";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <h1>El pago fue cancelado</h1>
      <p>No se completó la transacción.</p>

      <Button onClick={() => navigate("/")}>
        Intentar nuevamente
      </Button>
    </SectionContainer>
  );
};

export default CancelPage;