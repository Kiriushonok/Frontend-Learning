import { Flex, Typography } from "antd";

export default function CoinFormHeader({ selectedCoin, withSymbol }) {
  return (
    <Flex align="center">
      <img
        src={selectedCoin.icon}
        alt={selectedCoin.name}
        style={{ width: 40, marginRight: 10 }}
      ></img>
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && (`(${selectedCoin.symbol})`)} {selectedCoin.name}
      </Typography.Title>
    </Flex>
  );
}
