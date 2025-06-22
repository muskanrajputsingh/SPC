"use client"
import { useState } from "react"

const AddItemM = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Toys",
    "Food & Beverages",
    "Health & Beauty",
    "Automotive",
    "Other",
  ]

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

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        category: "",
      })

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    }, 1500)
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
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Add Details</h1>
        <p style={styles.subtitle}>Fill in the information below to add a new item</p>
      </div>

      {submitSuccess && (
        <div style={styles.successMessage}>
          <span style={styles.successIcon}>✅</span>
          Item added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          {/* Name Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>
              Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
              placeholder="Enter item name"
            />
            {errors.name && <span style={styles.errorText}>{errors.name}</span>}
          </div>

          {/* Category Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="category" style={styles.label}>
              Category <span style={styles.required}>*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{
                ...styles.select,
                ...(errors.category ? styles.inputError : {}),
              }}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span style={styles.errorText}>{errors.category}</span>}
          </div>

          {/* Image URL Field */}
          <div style={styles.inputGroupFull}>
            <label htmlFor="imageUrl" style={styles.label}>
              Image URL <span style={styles.required}>*</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.imageUrl ? styles.inputError : {}),
              }}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <span style={styles.errorText}>{errors.imageUrl}</span>}
            {formData.imageUrl && isValidUrl(formData.imageUrl) && (
              <div style={styles.imagePreview}>
                <img
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  style={styles.previewImage}
                  onError={(e) => {
                    e.target.style.display = "none"
                  }}
                />
              </div>
            )}
          </div>

          {/* Description Field */}
          <div style={styles.inputGroupFull}>
            <label htmlFor="description" style={styles.label}>
              Description <span style={styles.required}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{
                ...styles.textarea,
                ...(errors.description ? styles.inputError : {}),
              }}
              placeholder="Enter detailed description of the item"
              rows="4"
            />
            <div style={styles.charCount}>{formData.description.length} characters</div>
            {errors.description && <span style={styles.errorText}>{errors.description}</span>}
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button type="button" onClick={handleReset} style={styles.resetButton} disabled={isSubmitting}>
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              ...(isSubmitting ? styles.submitButtonDisabled : {}),
            }}
          >
            {isSubmitting ? (
              <>
                <span style={styles.spinner}></span>
                Adding...
              </>
            ) : (
              "Add Item"
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "30px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "15px",
    color: "white",
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
  },
  title: {
    fontSize: "1.9rem",
    margin: "0 0 10px 0",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "1.0rem",
    margin: 0,
    opacity: 0.9,
  },
  successMessage: {
    background: "linear-gradient(135deg, #00b894, #00a085)",
    color: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 4px 15px rgba(0, 184, 148, 0.3)",
    animation: "slideIn 0.5s ease-out",
  },
  successIcon: {
    fontSize: "1.2rem",
  },
  form: {
    background: "white",
    borderRadius: "15px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
    marginBottom: "30px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroupFull: {
    gridColumn: "1 / -1",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
    fontSize: "1rem",
  },
  required: {
    color: "#e74c3c",
  },
  input: {
    padding: "12px 16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
  },
  select: {
    padding: "12px 16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "white",
  },
  textarea: {
    padding: "12px 16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    resize: "vertical",
    minHeight: "100px",
  },
  inputError: {
    borderColor: "#e74c3c",
    boxShadow: "0 0 0 3px rgba(231, 76, 60, 0.1)",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "0.85rem",
    marginTop: "5px",
    fontWeight: "500",
  },
  charCount: {
    fontSize: "0.85rem",
    color: "#666",
    marginTop: "5px",
    textAlign: "right",
  },
  imagePreview: {
    marginTop: "15px",
    padding: "10px",
    border: "2px dashed #ddd",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  previewImage: {
    maxWidth: "200px",
    maxHeight: "150px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    paddingTop: "20px",
    borderTop: "2px solid #f0f0f0",
  },
  resetButton: {
    padding: "12px 30px",
    border: "2px solid #ddd",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "white",
    color: "#666",
  },
  submitButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "12px 30px",
    border: "none",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  submitButtonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #ffffff40",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
}

// Media queries for responsive design
if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(max-width: 768px)")
  if (mediaQuery.matches) {
    styles.formGrid.gridTemplateColumns = "1fr"
    styles.container.padding = "15px"
    styles.form.padding = "25px"
    styles.title.fontSize = "2rem"
    styles.buttonGroup.flexDirection = "column"
  }
}

export default AddItemM
