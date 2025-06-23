import { useState } from "react"
import { postData } from "../../utils/api"
import "./AddItemM.css"

const AddItemM = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "",
    createdById: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const categories = ["Cloth", "Makeup", "Shoes"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required"
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if (!user?.id) {
      alert("User ID not found. Please login again.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        imageUrl: [formData.imageUrl],
        createdById: user.id,
      }

      const response = await postData("/marketplace/create", payload)

      console.log("Item created:", response)
      setSubmitSuccess(true)

      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        category: "",
        createdById: "",
      })
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error("Error creating item:", error)
      alert("Failed to add item. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      category: "",
    })
    setErrors({})
    setSubmitSuccess(false)
  }

  return (
    <div className="add-item-container">
      <div className="add-item-header">
        <h1 className="add-item-title">Add Items</h1>
        <p className="add-item-subtitle">Fill in the information below to add a new item</p>
      </div>

      {submitSuccess && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          Item added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-grid">
          {/* Name Field */}
          <div className="input-group1">
            <label htmlFor="name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="Enter item name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Category Field */}
          <div className="input-group1">
            <label htmlFor="category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`form-select ${errors.category ? "input-error" : ""}`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          {/* Image URL Field */}
          <div className="input-group-full">
            <label htmlFor="imageUrl" className="form-label">
              Image URL <span className="required">*</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className={`form-input ${errors.imageUrl ? "input-error" : ""}`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
            {formData.imageUrl && isValidUrl(formData.imageUrl) && (
              <div className="image-preview">
                <img
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="preview-image"
                  onError={(e) => {
                    e.target.style.display = "none"
                  }}
                />
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="input-group-full">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-textarea ${errors.description ? "input-error" : ""}`}
              placeholder="Enter detailed description of the item"
              rows="4"
            />
            <div className="char-count">{formData.description.length} characters</div>
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>
        </div>

        <div className="button-group">
          <button type="button" onClick={handleReset} className="reset-button" disabled={isSubmitting}>
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? "submit-button-disabled" : ""}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Adding...
              </>
            ) : (
              "Add Item"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddItemM
