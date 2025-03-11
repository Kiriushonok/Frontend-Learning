import { Table } from "antd";
import { useCrypto } from "../context/crypto-context"

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function PortfolioTable() {
    const { portfolio } = useCrypto();

    const data = portfolio.map((elem) => ({
        key: elem.key,
        name: elem.name,
        price: elem.price,
        amount: elem.amount
    }))
  return (
    <Table columns={columns} dataSource={data} pagination={false}></Table>
  );
}
