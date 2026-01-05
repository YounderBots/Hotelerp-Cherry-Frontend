import React, { useState } from "react";
import TableTemplate from "../../stories/TableTemplate";
import { UserPlus, Eye, Pencil, X } from "lucide-react";
import "./Reservation.css";

const Booking = () => {
  const [data, setData] = useState([
    {
      id: 1,
      roomNo: "202",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "9876543210",
      roomType: "Deluxe",
      arrivalDate: "2026-01-10",
      departureDate: "2026-01-12",
      noOfRooms: 1,
      noOfAdults: 2,
      noOfChilds: 0,
      noOfNights: 2,
    },
    {
      id: 2,
      roomNo: "203",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah@example.com",
      phone: "9123456780",
      roomType: "Suite",
      arrivalDate: "2026-01-15",
      departureDate: "2026-01-18",
      noOfRooms: 1,
      noOfAdults: 2,
      noOfChilds: 1,
      noOfNights: 3,
    },
  ]);

  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roomType: "",
    arrivalDate: "",
    departureDate: "",
    noOfRooms: 1,
    noOfAdults: 1,
    noOfChilds: 0,
    noOfNights: 1,
  };

  const [formData, setFormData] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit | view
  const [selectedId, setSelectedId] = useState(null);

  /* ---------------- HANDLERS ---------------- */

  const openAddModal = () => {
    setFormData(initialForm);
    setMode("add");
    setSelectedId(null);
    setShowModal(true);
  };

  const openEditModal = (row) => {
    setFormData(row);
    setSelectedId(row.id);
    setMode("edit");
    setShowModal(true);
  };

  const openViewModal = (row) => {
    setFormData(row);
    setMode("view");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName) return;

    if (mode === "edit") {
      setData((prev) =>
        prev.map((i) => (i.id === selectedId ? { ...formData } : i))
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
          roomNo: "Auto",
        },
      ]);
    }
    closeModal();
  };

  const isView = mode === "view";

  /* ---------------- UI ---------------- */

  return (
    <>
      <TableTemplate
        title="Booking List"
        hasActionButton
        searchable
        pagination
        exportable
        actionButton={{
          icon: <UserPlus size={18} />,
          label: "Add Booking",
          onClick: openAddModal,
          variant: "primary",
        }}
        columns={[
          { key: "roomNo", title: "Room No", align: "center" },
          { key: "firstName", title: "First Name" },
          { key: "lastName", title: "Last Name" },
          {
            key: "actions",
            title: "Actions",
            align: "center",
            type: "custom",
            render: (row) => (
              <div className="table-actions">
                <button
                  className="table-action-btn view"
                  title="View"
                  onClick={() => openViewModal(row)}
                >
                  <Eye size={16} />
                </button>
                <button
                  className="table-action-btn edit"
                  title="Edit"
                  onClick={() => openEditModal(row)}
                >
                  <Pencil size={16} />
                </button>
              </div>
            ),
          },
        ]}
        data={data}
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>
                {mode === "add"
                  ? "Add Booking"
                  : mode === "edit"
                  ? "Edit Booking"
                  : "View Booking"}
              </h3>
              <button onClick={closeModal}>
                <X size={18} />
              </button>
            </div>

            <div className={`modal-body grid ${isView ? "view" : "edit"}`}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isView}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isView}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isView}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isView}
                />
              </div>

              {!isView && (
                <>
                  <div className="form-group">
                    <label>Room Type</label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Arrival Date</label>
                    <input
                      type="date"
                      name="arrivalDate"
                      value={formData.arrivalDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Departure Date</label>
                    <input
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>No of Rooms</label>
                    <input
                      type="number"
                      name="noOfRooms"
                      value={formData.noOfRooms}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>No of Adults</label>
                    <input
                      type="number"
                      name="noOfAdults"
                      value={formData.noOfAdults}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>No of Children</label>
                    <input
                      type="number"
                      name="noOfChilds"
                      value={formData.noOfChilds}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>No of Nights</label>
                    <input
                      type="number"
                      name="noOfNights"
                      value={formData.noOfNights}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn secondary" onClick={closeModal}>
                {isView ? "Close" : "Cancel"}
              </button>
              {!isView && (
                <button className="btn primary" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
