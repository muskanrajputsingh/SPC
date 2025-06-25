import { useState, useEffect } from "react";
import { fetchDataFromApi, editData, deleteData } from "../../utils/api";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const ViewitemP = () => {
  const [users, setUsers] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  const category = ["All", "Cloth", "Makeup", "Shoes"];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetchDataFromApi("/property/get-all");
    if (res && Array.isArray(res.properties)) {
    setUsers(res.properties);
   }else {
      console.error("Unexpected API response:", res);
      setUsers([]);
    }
  };
 
  useEffect(() => {
     const filtered = selectedCategory === "All"
    ? users
    : users.filter((user) => user.category?.toLowerCase() === selectedCategory.toLowerCase());

    setFilteredItem(filtered);
  }, [selectedCategory, users]);

  const handleRoleFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleEdit = (user) => {
    setEditingItem(user.id);
    const { id, _id, ...dataWithoutId } = user;
    setEditForm({
      ...dataWithoutId,
      role: user.role || "USER",
    });
  };

  const handleSaveEdit = async () => {
    try {
      const {
        name,
        description,
        imageUrl,
        category,
        createdById,
      } = editForm;

      const payload = {
        name,
        description,
        imageUrl,
        createdById,
        category:category.toUpperCase(),
      };

      await editData(`/property/update/${editingItem}`, payload);
      console.log("Updating:", `/property/update/${editingItem}`, payload);

      await fetchUsers();
      setEditingItem(null);
      setEditForm({});
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditForm({});
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this Item?")) {
      try {
        await deleteData(`/property/delete/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <h1>View Items</h1>
        <div className="user-stats">
          <span className="total-users">Total Users: {filteredItem.length}</span>
        </div>
      </div>

      <div className="filter-section">
        <label htmlFor="roleFilter">Filter by Category:</label>
        <select
          id="roleFilter"
          value={selectedCategory}
          onChange={handleRoleFilter}
          className="role-filter"
        >
          {category.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItem?.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  {editingItem === user.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name || ""}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    user.name
                  )}
                </td>
               <td>
                  {editingItem === user.id ? (
                    <input
                      type="text"
                      name="imageUrl"
                      value={editForm.imageUrl || ""}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    user.imageUrl?.[0] ? (
                      <img
                        src={user.imageUrl[0]}
                        alt={user.name}
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                      />
                    ) : (
                      <span>No image</span>
                    )
                  )}
                </td>
                <td>
                  {editingItem === user.id ? (
                    <input
                      type="text"
                      name="description"
                      value={editForm.description || ""}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    user.description
                  )}
                </td>
                <td>
                  {editingItem === user.id ? (
                    <select
                      name="category"
                      value={editForm.category}
                      onChange={handleInputChange}
                      className="edit-select"
                    >
                      <option value="CLOTH">Cloth</option>
                      <option value="SHOES">Shoes</option>
                      <option value="MAKEUP">Makeup</option>
                    </select>
                  ) : (
                    <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                      {user.category}
                    </span>
                  )}
                </td>
                <td className="actions">
                  {editingItem === user.id ? (
                    <div className="edit-actions">
                      <button onClick={handleSaveEdit} className="save-btn" title="Save">
                        ✓
                      </button>
                      <button onClick={handleCancelEdit} className="cancel-btn" title="Cancel">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(user)}
                        className="edit-btn"
                        title="Edit"
                      >
                        <MdEdit/>
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="delete-btn"
                        title="Delete"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewitemP;
