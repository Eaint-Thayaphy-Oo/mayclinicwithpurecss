import React, { useState } from "react";
import styles from "./Table.module.css";
import jsonData from "../../data.json";
import axios from "axios";
import { AiOutlineMore } from "react-icons/ai";
import { LuPencil } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";

interface TableProps {
  data: Array<{
    id: number;
    name: string;
    status: number;
    pawrent: string;
    breed: string;
    gender: string;
    birth: number;
    phone: number;
    address: string;
    township: string;
  }>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [items, setItems] = useState(jsonData);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
  });

  const [editingItem, setEditingItem] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setEditModal(true);
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:8000/items/${itemId}`)
      .then(() => setItems(items.filter((item) => item.id !== itemId)))
      .catch((error) => console.error("Error deleting post:", error));
  };
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className="">
            <input id="" type="checkbox" className="" />
          </th>
          <th className="">ID</th>
          <th className="">Name</th>
          <th className="">Status</th>
          <th className="">Pawrent</th>
          <th className="">Breed</th>
          <th className="">Gender</th>
          <th className="">Date of Birth</th>
          <th className="">Contact Phone No.</th>
          <th className="">Address</th>
          <th className="">Township</th>
          <th className=""></th>
        </tr>
      </thead>
      <tbody className={styles.table}>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="">
              <div className="">
                <input id="" type="checkbox" className="" />
              </div>
            </td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.pawrent}</td>
            <td>{item.breed}</td>
            <td>{item.gender}</td>
            <td>{item.birth}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            <td>{item.township}</td>
            <td className="px-6 py-4" onClick={handleOpenModal}>
              <AiOutlineMore />
              {openModal && (
                <div className={styles.modal}>
                  <button
                    onClick={() => handleEdit(item)}
                    className={styles.button}
                  >
                    <LuPencil className={styles.pencil} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className={styles.button}
                  >
                    <FiTrash className={styles.delete} />
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      {editModal && "hello this is edit page"}
    </table>
  );
};

export default Table;
