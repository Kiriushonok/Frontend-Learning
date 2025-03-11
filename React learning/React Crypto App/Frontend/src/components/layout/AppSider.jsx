import { Layout, Card } from "antd";
import { List, Typography, Tag } from "antd";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context.jsx"

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
  const { portfolio} = useContext(CryptoContext)

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {portfolio.map((elem) => (
        <Card key={elem.key} style={{ marginBottom: "1rem" }}>
          <span style={{ color: "#808080" }}>{elem.name}</span>
          <h2>{elem.totalAmount.toFixed(2)}$</h2>
          <List
            dataSource={[
              { title: "Total profit", value: elem.totalProfit, withTag: true },
              { title: "Total amount", value: elem.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>
                {item.title}
                </span>
                <span>
                  {item.withTag && <Tag color={elem.grow ? "green" : "red"}>{elem.difference}%</Tag>}
                  
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={elem.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
