import { Layout, Select, Button, Space, Modal, Drawer } from "antd";
import { useState, useEffect } from "react";
import { useCrypto } from "../../context/crypto-context.jsx";
import ModalContent from "../ModalContent.jsx";
import AddBoughtCoinForm from "../AddBoughtCoinForm.jsx";

const headerStyle = {
  textAlign: "center",
  height: 60,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
};

export default function AppHeader() {
  const { cryptoData } = useCrypto();
  const [opened, setOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleSelect(value) {
    setSelectedCoin(cryptoData.find((coin) => coin.id === value));
    setIsModalOpen(true);
  }

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setOpened((prev) => !prev);
      }
    };

    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "250px",
        }}
        open={opened}
        onSelect={handleSelect}
        onClick={() => setOpened((prev) => !prev)}
        value="press / to open"
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
      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Добавить купленную монету
      </Button>

      <Drawer
        width={600}
        title="Basic Drawer"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        destroyOnClose
      >
        <AddBoughtCoinForm onClose={() => setIsDrawerOpen(false)}/>
      </Drawer>

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <ModalContent coin={selectedCoin}></ModalContent>
      </Modal>
    </Layout.Header>
  );
}
