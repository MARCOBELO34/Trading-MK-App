import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface CardsProp {
  nome: String;
  simbolo: String;
}

function cards({ nome, simbolo }: CardsProp) {
  return (
    <div>
      <h1>Cards</h1>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title>Nome: {nome}</Card.Title>
          <Card.Text>Simbolo: {simbolo}</Card.Text>
          <Button variant="primary">Guarda ETF</Button>
        </Card.Body>
        {/* <Card.Footer>
          <Card.Text>+10%</Card.Text>
          <Card.Text>+300$</Card.Text>
        </Card.Footer> */}
      </Card>
    </div>
  );
}

export default cards;
