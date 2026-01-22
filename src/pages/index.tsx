import { useState } from "react";
import Cards from "../components/body/cards";

function index() {
  const MarketApiKey = import.meta.env.VITE_MARKET_API_KEY;
  const [stocks, setStocks] = useState<any[]>([]);
  const [etf, setEtf] = useState<any[]>([]);

  const mostraStock = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.twelvedata.com/stocks?apikey=${MarketApiKey}&show_plan=true`,
      );
      const data = await response.json();

      const aura = data.data.filter((stock: any) => {
        return (
          stock.plan === "Basic" ||
          stock.access?.plan === "Basic" ||
          stock.access?.global === "Basic"
        );
      });
      setStocks(aura);
      console.log(aura);
      // data.map((dati: any) => <Cards key={dati.id} dati={data} />);
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
    }
  };

  const mostraETF = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.twelvedata.com/etfs?apikey=${MarketApiKey}&show_plan=true`,
      );
      const data = await response.json();

      const aura = data.data.filter((etfs: any) => {
        return (
          etfs.plan === "Basic" ||
          etfs.access?.plan === "Basic" ||
          etfs.access?.global === "Basic"
        );
      });
      setEtf(aura);
      console.log(aura);
      // data.map((dati: any) => <Cards key={dati.id} dati={data} />);
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
    }
  };

  return (
    <div>
      <h1>Main page</h1>
      <div>
        <hr />
        <h1>Stock</h1>
        <button onClick={mostraStock}>Mostra Tutti Gli Stock</button>
        {stocks?.map((stock: any) => (
          <Cards
            key={stock.symbol + stock.figi_code || stock.id}
            nome={stock.name}
            simbolo={stock.symbol}
          />
        ))}
      </div>
      <div>
        <hr />
        <h1>ETF's</h1>
        <button onClick={mostraETF}>Mostra Tutti Gli ETF</button>
        {etf?.map((etfs: any) => (
          <Cards
            key={etfs.symbol + etfs.figi_code || etfs.id}
            nome={etfs.name}
            simbolo={etfs.symbol}
          />
        ))}
      </div>
    </div>
  );
}

export default index;
