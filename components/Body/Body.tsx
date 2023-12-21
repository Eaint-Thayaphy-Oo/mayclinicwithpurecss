"use client";

import React, { useState, useEffect } from "react";
import styles from "./Body.module.css";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import jsonData from "../../data.json";
import Table from "../Table/Table";
import SearchComponent from "../Search/SearchComponent";
import Image from "next/image";

interface IFormInput {
  name: string;
}

export default function Body() {
  const [openModal, setOpenModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255, 255, 255,1)"
  );

  const [items, setItems] = useState(jsonData);

  const [formData, setFormData] = useState({
    name: "",
    pawrent: "",
    gender: "",
    phone: "",
    city: "",
    status: "",
    breed: "",
    birth: "",
    address: "",
    township: "",
  });

  const [editingItem, setEditingItem] = useState(null);

  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [alertMessage, setAlertMessage] = useState('');

  const handleButtonClick = () => {
    setOpenModal(true);

    setBackgroundColor("rgba(255, 255, 255,0.5)");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddItem = () => {
    if (editingItem) {
      console.log(editingItem);
      axios
        .put(`http://localhost:8000/items/${editingItem.id}`, editingItem)
        .then((response) => {
          setItems(
            items.map((item) =>
              item.id === editingItem.id ? response.data : item
            )
          );
          setEditingItem(null);
        })
        .catch((error) => console.error("Error updating post:", error));
    } else {
      axios
        .post("http://localhost:8000/items", formData)
        .then((response) => setItems([...items, response.data]))
        .catch((error) => console.error("Error adding post:", error));
    }
    setFormData({
      name: "",
      pawrent: "",
      gender: "",
      phone: "",
      city: "",
      status: "",
      breed: "",
      birth: "",
      address: "",
      township: "",
    });
  };

  // const handleCategoryChange = (e) => {
  //   setSelectedCategory(e.target.value);
  // };

  // const handleSearch = () => {
  //   setAlertMessage(`Search for items in category: ${selectedCategory}`);
  // };

  // const handleEdit = (item) => {
  //   setEditingItem(item);
  //   setFormData(item);
  // };

  // const handleDelete = (itemId) => {
  //   axios
  //     .delete(`http://localhost:8000/items/${itemId}`)
  //     .then(() => setItems(items.filter((item) => item.id !== itemId)))
  //     .catch((error) => console.error("Error deleting post:", error));
  // };

  return (
    <>
      <div className={styles.container} style={{ backgroundColor }}>
        <div className={styles.block}>
          <div className={styles.firstblock}>
            <div>
              {/* <Image
                src="/images/allergy.png"
                alt="allergy"
                width={40}
                height={50}
              /> */}
              {/* <SearchComponent
                items={items}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                onSearch={handleSearch}
              /> */}
              <h2 className={styles.header}>Patient List</h2>
              <input
                type="text"
                placeholder="Search table"
                className={styles.input}
              />
              <CiSearch className={styles.icon} />
            </div>
            <div className={styles.select}>
              <select className={styles.selectone}>
                <option value="">Status All</option>
                <option value="allergy">allergy</option>
                <option value="picky">picky eater</option>
              </select>
              <select className={styles.selecttwo}>
                <option value="">Breed All</option>
                <option value="beagle">Beagle</option>
                <option value="spaniel">Spaniel</option>
                <option value="golden">Golden Retriever</option>
              </select>
            </div>
          </div>
          <div className={styles.secondblock}>
            <button
              onClick={handleButtonClick}
              type="submit"
              className={styles.button}
            >
              <FaPlus className={styles.plus} />
              Add new patient
            </button>
            <h4 className={styles.p}>
              Rows per page:
              <select className={styles.selectthree}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </h4>
          </div>
        </div>
        <div>
          <Table data={items} />
        </div>
        {openModal && (
          <div className={styles.modalblock}>
            <div className="">
              <h1 className={styles.text}>Add new patient</h1>
              <h2 className={styles.textone}>
                Enter new patient information below
              </h2>
              <div className={styles.blockone}>
                <div className={styles.blocktwo}>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Pet Name</label>
                    <input
                      type="text"
                      name="name"
                      className={styles.inputone}
                      value={editingItem ? editingItem.name : formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Pawrent</label>
                    <input
                      type="text"
                      name="pawrent"
                      className={styles.inputone}
                      placeholder=""
                      value={
                        editingItem ? editingItem.pawrent : formData.pawrent
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.gender}>
                    <label className={styles.label}>Gender</label>
                    <div className="">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={
                            editingItem
                              ? editingItem.gender
                              : formData.gender === "male"
                          }
                          onChange={handleInputChange}
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className={styles.female}
                          checked={
                            editingItem
                              ? editingItem.gender
                              : formData.gender === "female"
                          }
                          onChange={handleInputChange}
                        />
                        Female
                      </label>
                    </div>
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Contact Phone No.</label>
                    <input
                      type="text"
                      name="phone"
                      className={styles.inputone}
                      placeholder=""
                      value={editingItem ? editingItem.phone : formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>City</label>
                    <select
                      name="city"
                      className={styles.selectfour}
                      value={editingItem ? editingItem.city : formData.city}
                      onChange={handleInputChange}
                    >
                      <option value="option1">please choose city</option>
                      <option value="option2">2</option>
                      <option value="option3">3</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className={styles.blockthree}>
                    <label className={styles.label}>Status</label>
                    <select
                      name="status"
                      className={styles.selectfour}
                      value={editingItem ? editingItem.status : formData.status}
                      onChange={handleInputChange}
                    >
                      <option>please choose status</option>
                      <option value="allergy">Allergy</option>
                      <option value="picky">Picky Eater</option>
                    </select>
                  </div>
                  <div className="">
                    <label className={styles.label}>Breed</label>
                    <select
                      name="breed"
                      className={styles.selectfour}
                      value={editingItem ? editingItem.breed : formData.breed}
                      onChange={handleInputChange}
                    >
                      <option>please choose city</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div>
                    <label className={styles.label}>Date of Birth</label>
                    <input
                      className={styles.selectfour}
                      id=""
                      name="birth"
                      type="date"
                      placeholder=""
                      value={editingItem ? editingItem.birth : formData.birth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="">
                    <label className={styles.label}>Address</label>
                    <input
                      type="text"
                      name="address"
                      className={styles.inputone}
                      placeholder=""
                      value={
                        editingItem ? editingItem.address : formData.address
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="">
                    <label className={styles.label}>Township</label>
                    <select
                      name="township"
                      className={styles.selectfour}
                      value={
                        editingItem ? editingItem.township : formData.township
                      }
                      onChange={handleInputChange}
                    >
                      <option value="city">please choose city</option>
                      <option value="hi">hi</option>
                      <option value="hello">hello</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.buttontype}>
                <button
                  type="submit"
                  className={styles.savebtn}
                  onClick={handleAddItem}
                >
                  {editingItem !== null ? "Update" : "Save"}
                </button>
                <button
                  type="submit"
                  className={styles.cancelbtn}
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   let res = await fetch("http://localhost:8000");
//   let data = res.json();
//   console.log(data);

//   return {
//     props: {
//       posts: data,
//     },
//   };
// }
