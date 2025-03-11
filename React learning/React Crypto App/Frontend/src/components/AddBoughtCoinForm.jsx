import { useState, useRef } from "react";
import { useCrypto } from "../context/crypto-context.jsx";
import CoinFormHeader from "./CoinInfoHeader.jsx"
import {
  Select,
  Space,
  Form,
  InputNumber,
  Button,
  Divider,
  Result,
} from "antd";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number",
  },
  number: {
    range: "${label} must be between {min} and {max}",
  },
};

export default function AddBoughtCoinForm( { onClose }) {
  const { cryptoData, addPortfolioCoin } = useCrypto();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const portfolioCoinRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New coin succesfully added on portfolio"
        subTitle={`Added ${portfolioCoinRef.current.amount} of ${selectedCoin.name} by price ${portfolioCoinRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2) + "$",
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2) + "$",
    });
  }

  const onFinish = (values) => {
    const portfolioCoin = {
      name: selectedCoin.name,
      amount: values.amount,
      price: values.price,
    }
    portfolioCoinRef.current = portfolioCoin
    setSubmitted(true)
    addPortfolioCoin(portfolioCoin)
  };

  if (!selectedCoin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        onSelect={(coin) =>
          setSelectedCoin(cryptoData.find((c) => c.id === coin))
        }
        placeholder="Select coin"
        options={cryptoData.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: "25px" }}
              src={option.data.icon}
              alt={option.data.name}
            />
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          price: +selectedCoin.price.toFixed(2),
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >

        <CoinFormHeader selectedCoin={selectedCoin}/>

        <Divider></Divider>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter coin amount"
            onChange={handleAmountChange}
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter coin price"
            onChange={handlePriceChange}
          />
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
