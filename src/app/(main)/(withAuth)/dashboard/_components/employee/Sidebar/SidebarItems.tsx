import {
  UserOutlined,
  CreditCardOutlined,
  UnorderedListOutlined,
  CarOutlined,
  IdcardOutlined,
  MenuOutlined,
  HomeOutlined,
  FolderOutlined,
  DatabaseOutlined,
  ToolOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const SidebarLinks = [
  {
    displayName: 'Home',
    route: '/dashboard',
    icon: <HomeOutlined className="home" />
  },
  {
    displayName: 'Logs',
    route: '/dashboard/logs',
    icon: <MenuOutlined />
  },
  {
    displayName: 'Report',
    route: '/dashboard/report',
    icon: <UnorderedListOutlined />
  },
  {
    displayName: "Roles",
    route: "/dashboard/roles",
    icon: <ToolOutlined />,
  },
  {
    displayName: "Roles",
    route: "/dashboard/roles",
    icon: <ToolOutlined />,
  },
  {
    displayName: 'Operators',
    icon: <TeamOutlined />,
    children: [
      {
        displayName: 'Operator details',
        route: '/dashboard/operator',
        icon: <UserOutlined />
      },
      {
        displayName: 'Operator Logs',
        route: '/dashboard/operator-logs',
        icon: <IdcardOutlined />
      }
    ]
  },
  {
    displayName: 'Toll Details',
    icon: <FolderOutlined />,
    children: [
      {
        displayName: 'Vehicle types',
        route: '/dashboard/vehicle-types',
        icon: <CarOutlined />
        //TODO: make a truck svg icon
      },
      {
        displayName: 'Pricing',
        route: '/dashboard/pricing',
        icon: <CreditCardOutlined />
      }
    ]
  },
  {
    displayName: 'Toll Data',
    icon: <DatabaseOutlined />,
    children: [
      {
        displayName: 'Local Vehicle',
        route: '/dashboard/local-vehicle',
        icon: <CarOutlined />
      },
      {
        displayName: 'Monthly pass',
        route: '/dashboard/monthly-pass',
        icon: <UnorderedListOutlined />
      }
    ]
  }
];
