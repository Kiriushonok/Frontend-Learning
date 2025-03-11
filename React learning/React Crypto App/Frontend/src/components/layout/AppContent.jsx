import { Layout, Typography } from 'antd';
import { useCrypto } from "../../context/crypto-context.jsx"
import PortfolioChart from "../PortfolioChart.jsx"
import PortfolioTable from "../PortfolioTable.jsx"

const contentStyle = {
    textAlign: 'center',
    minHeight: "calc(100vh - 60px)",
    color: '#fff',
    backgroundColor: "#001529",
    padding: "1rem",
  };

  export default function AppContent() {
    const { portfolio} = useCrypto()

    return (
        <Layout.Content style={contentStyle}>
          <Typography.Title level={3} style={{color: "#fff", textAlign: "left"}}>
            Portfolio: {portfolio.reduce((acc, {totalAmount}) => acc + totalAmount, 0).toFixed(2)}$
          </Typography.Title>
          {portfolio.length > 0 && <PortfolioChart />}
          
          {portfolio.length > 0 && <PortfolioTable />}
        </Layout.Content>
    )
  }