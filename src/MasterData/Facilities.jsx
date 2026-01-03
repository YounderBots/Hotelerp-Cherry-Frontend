import React, { useState } from "react";
import TableTemplate from "../stories/TableTemplate";
import { UserPlus, X, Pencil, Trash2 } from "lucide-react";

const Facilities = () => {
  const [data, setData] = useState([
    { id: 1, name: "Swimming Pool" },
    { id: 2, name: "Gym" },
    { id: 3, name: "Spa" },
    { id: 4, name: "Conference Hall" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [facilityName, setFacilityName] = useState("");
  const [editId, setEditId] = useState(null);

  /* -------------------- HANDLERS -------------------- */

  const openAddModal = () => {
    setFacilityName("");
    setEditId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setFacilityName("");
    setEditId(null);
    setShowModal(false);
  };

  const handleSave = () => {
    if (!facilityName.trim()) return;

    if (editId) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, name: facilityName } : item
        )
      );
    } else {
      setData((prev) => [
        ...prev,
        { id: Date.now(), name: facilityName },
      ]);
    }

    closeModal();
  };

  const handleEdit = (row) => {
    setFacilityName(row.name);
    setEditId(row.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  /* -------------------- UI -------------------- */

  return (
    <>
      <TableTemplate
        title="Facilities"
        hasActionButton
        searchable
        pagination
        exportable
        actionButton={{
          icon: <UserPlus size={18} />,
          label: "Add Facilities",
          onClick: openAddModal,
          size: "medium",
          variant: "primary",
        }}
        columns={[
          {
            key: "name",
            title: "Facility Name",
            align: "center",
          },
          {
            key: "actions",
            title: "Actions",
            align: "center",
            type: "custom",
            render: (row) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <button
                  className="table-action-btn edit"
                  onClick={() => handleEdit(row)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="table-action-btn delete"
                  onClick={() => handleDelete(row.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ),
          },
        ]}
        data={data}
      />

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{editId ? "Edit Facility" : "Add Facility"}</h3>
              <button onClick={closeModal}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <label>Facility Name</label>
              <input
                type="text"
                placeholder="Enter facility name"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="modal-footer">
              <button className="btn secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        .table-action-btn {
          border: none;
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .table-action-btn.edit {
          background: #e0f2fe;
          color: #0369a1;
        }

        .table-action-btn.delete {
          background: #fee2e2;
          color: #b91c1c;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-card {
          width: 420px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.2s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .modal-header button {
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .modal-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .modal-body label {
          font-size: 13px;
          color: #555;
        }

        .modal-body input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 14px;
        }

        .modal-body input:focus {
          border-color: var(--primary-color, #610025);
        }

        .modal-footer {
          padding: 16px 20px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          border-top: 1px solid #eee;
        }

        .btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }

        .btn.primary {
          background: var(--primary-color, #610025);
          color: #fff;
        }

        .btn.secondary {
          background: #f1f5f9;
          color: #333;
        }

        @keyframes fadeIn {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Facilities;
