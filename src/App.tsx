import { invoke } from "@tauri-apps/api/tauri";
import React, { Children, useState } from "react";
import {
  BankOutlined,
  CarOutlined,
  DashboardOutlined,
  AlertOutlined,
  AimOutlined,
  ExperimentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { register } from "@tauri-apps/api/globalShortcut";
import { writeText } from "@tauri-apps/api/clipboard";
import { enable } from "tauri-plugin-autostart-api";



register("Alt+L", async () => {
  await invoke("show_window");
});

const items: MenuProps["items"] = [
  {
    label: "Traffic Stops",
    key: "SubMenu",
    icon: <DashboardOutlined />,
    children: [
      {
        label: "Speeding Ticket",
        key: "speedingTicket",
      },
      {
        label: "Failure to obey traffic control devices",
        key: "controlDevices",
      },
      {
        label: "Suspended License",
        key: "suspendedLicense",
      },
      {
        label: "Negligent Driving",
        key: "negligentDriving",
      },
    ],
  },
  {
    label: "Robbery of a financial institue",
    key: "robbery",
    icon: <BankOutlined />,
  },
  {
    label: "Grand Theft Auto",
    key: "boost",
    icon: <CarOutlined />,
  },
  {
    label: "Meth/Heroin Run",
    key: "methRun",
    icon: <AlertOutlined />,
  },
  {
    label: "Sale of Drugs",
    key: "saleOfDrugs",
    icon: <ExperimentOutlined />,
  },
  {
    label: "Gang Related Shooting",
    key: "GRS",
    icon: <AimOutlined />,
  },
  {
    label: "House robbery",
    key: "houseRobbery",
    icon: <HomeOutlined />,
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  async () =>{
    await enable();
  }

  const onClick: MenuProps["onClick"] = async (e) => {
    await invoke("hide_window");
    let text: string = await invoke("template", { key: e.key });
    await writeText(text);
  };

  return (
    <Menu
      id="menu"
      onClick={onClick}
      selectedKeys={[current]}
      mode="vertical"
      theme="dark"
      items={items}
    />
  );
};

export default App;
