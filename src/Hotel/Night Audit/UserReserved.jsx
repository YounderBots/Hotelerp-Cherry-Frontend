import React, { useState } from "react";
import Tabs, { Tab } from "../../stories/Tabs";
import TableTemplate from "../../stories/TableTemplate";
import { Eye } from "lucide-react";
import "./NightAudit.css";

const UserReserved = () => {
  const [fromDate, setFromDate] = useState("2026-01-04");
  const [toDate, setToDate] = useState("2026-01-05");

  /* =====================================================
     TAB 1 : USER ACTIVITY LOG DATA
  ===================================================== */
  const userActivityData = [
    {
      id: 1,
      reservationId: "RES-1001",
      name: "Anand M",
      phone: "9876543210",
      arrivalDate: "04-Jan-2026",
      departureDate: "05-Jan-2026",
      status: "Checked In",
    },
    {
      id: 2,
      reservationId: "RES-1002",
      name: "Madhu M",
      phone: "9123456780",
      arrivalDate: "04-Jan-2026",
      departureDate: "06-Jan-2026",
      status: "Confirmed",
    },
    {
      id: 3,
      reservationId: "RES-1003",
      name: "Sanjay S",
      phone: "9001122334",
      arrivalDate: "05-Jan-2026",
      departureDate: "07-Jan-2026",
      status: "Checked Out",
    },
  ];

  const userActivityColumns = [
    {
      key: "reservationId",
      title: "Room Reservation Id",
    },
    {
      key: "name",
      title: "Name",
    },
    {
      key: "phone",
      title: "Phone Number",
    },
    {
      key: "arrivalDate",
      title: "Arrival Date",
    },
    {
      key: "departureDate",
      title: "Departure Date",
    },
    {
      key: "status",
      title: "Reservation Status",
    },
    {
      key: "action",
      title: "Action",
      align: "center",
      type: "custom",
      render: (row) => (
        <button
          className="table-action-btn view"
          title={`View ${row.reservationId}`}
          onClick={() => console.log("View reservation", row)}
        >
          <Eye size={16} />
        </button>
      ),
    },
  ];

  /* =====================================================
     TAB 2 : HOUSE KEEPER DETAILS DATA
  ===================================================== */
  const houseKeeperData = [
    {
      id: 1,
      houseKeeperName: "Ravi Kumar",
      roomNo: "202",
      task: "Room Cleaning",
      assignedDate: "04-Jan-2026",
      status: "Completed",
    },
    {
      id: 2,
      houseKeeperName: "Suresh",
      roomNo: "203",
      task: "Bed Linen Change",
      assignedDate: "04-Jan-2026",
      status: "In Progress",
    },
    {
      id: 3,
      houseKeeperName: "Priya",
      roomNo: "301",
      task: "Bathroom Cleaning",
      assignedDate: "05-Jan-2026",
      status: "Pending",
    },
  ];

  const houseKeeperColumns = [
    {
      key: "houseKeeperName",
      title: "House Keeper Name",
    },
    {
      key: "roomNo",
      title: "Room No",
      align: "center",
    },
    {
      key: "task",
      title: "Assigned Task",
    },
    {
      key: "assignedDate",
      title: "Assigned Date",
    },
    {
      key: "status",
      title: "Task Status",
    },
    {
      key: "action",
      title: "Action",
      align: "center",
      type: "custom",
      render: (row) => (
        <button
          className="table-action-btn view"
          title={`View task for room ${row.roomNo}`}
          onClick={() => console.log("View house keeper task", row)}
        >
          <Eye size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="userreserved-wrapper">
      <Tabs variant="default">
        {/* ================= TAB 1 ================= */}
        <Tab label="User Activity Logs">
          {/* FILTER SECTION */}
          {/* <div className="userreserved-filter">
            <div className="filter-group">
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <button className="btn-filter">Filter</button>
          </div> */}

          {/* TABLE */}
          <TableTemplate
            title="User Activity Log"
            searchable
            pagination
            exportable
            columns={userActivityColumns}
            data={userActivityData}
            emptyText="No data available in table"
          />
        </Tab>

        {/* ================= TAB 2 ================= */}
        <Tab label="House Keeper Details">
          <TableTemplate
            title="House Keeper Details"
            searchable
            pagination
            exportable
            columns={houseKeeperColumns}
            data={houseKeeperData}
            emptyText="No house keeper activity found"
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserReserved;
