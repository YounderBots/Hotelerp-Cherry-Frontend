import React from "react";
import TableTemplate from "../../stories/TableTemplate";
import { UserPlus, Eye, Pencil, Trash2, Users } from "lucide-react";

const FloorTable = () => {
  return (
    <TableTemplate
      title="Floor Layout"
      hasActionButton
      searchable
      pagination
      exportable
      actionButton={{
        icon: <UserPlus size={18} />,
        label: "Add Floor",
        onClick: () => {},
        size: "medium",
        variant: "primary",
      }}
      columns={[
        {
          key: "floorId",
          title: "Floor ID",
          width: "120px",
          align: "center",
        },
        {
          key: "floorName",
          title: "Floor Name",
          width: "180px",
          align: "center",
        },
        {
          key: "totalTables",
          title: "Tables",
          align: "center",
          width: "130px",
        },
        {
          key: "seatingCapacity",
          title: "Seats",
          align: "center",
          width: "160px",
        },
        {
          key: "assignedServers",
          title: "Servers",
          align: "center",
          width: "160px",
        },
        {
          key: "currentOrders",
          title: "Orders",
          align: "center",
          width: "150px",
        },
        {
          key: "status",
          title: "Status",
          align: "center",
          type: "badge",
          width: "120px",
        },
        {
          key: "actions",
          title: "Actions",
          align: "center",
          type: "custom",
          width: "160px",
          render: () => (
            <div className="floor-action-wrap">
              <button className="floor-btn view">
                <Eye size={15} />
              </button>
              <button className="floor-btn edit">
                <Pencil size={15} />
              </button>
              <button className="floor-btn users">
                <Users size={15} />
              </button>
              <button className="floor-btn delete">
                <Trash2 size={15} />
              </button>
            </div>
          ),
        },
      ]}
      data={[
        { 
          floorId: "F01",
          floorName: "Indoor Floor",
          totalTables: 24,
          seatingCapacity: 75,
          assignedServers: 10,
          currentOrders: 21,
          status: "active",
        },
        { 
          floorId: "F02",
          floorName: "Outdoor Floor",
          totalTables: 30,
          seatingCapacity: 50,
          assignedServers: 20,
          currentOrders: 20,
          status: "active",
        },
        { 
          floorId: "F03",
          floorName: "Bar",
          totalTables: 15,
          seatingCapacity: 60,
          assignedServers: 0,
          currentOrders: 0,
          status: "inactive",
        },
      ]}
    />
  );
};

export default FloorTable;
