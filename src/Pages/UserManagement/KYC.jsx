import { useState } from "react"

const KYC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    email: "",
    aadharNumber: "",
    panNumber: "",
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    passport: null,
    bankStatement: null,
    salarySlip: null,
    selfie: null,
  })

  const [uploadProgress, setUploadProgress] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))

      // Simulate upload progress
      setUploadProgress((prev) => ({ ...prev, [name]: 0 }))
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const currentProgress = prev[name] || 0
          if (currentProgress >= 100) {
            clearInterval(interval)
            return prev
          }
          return { ...prev, [name]: currentProgress + 10 }
        })
      }, 100)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      alert("KYC documents submitted successfully!")
      setIsSubmitting(false)
      // Reset form
      setFormData({
        fullName: "",
        dateOfBirth: "",
        address: "",
        phoneNumber: "",
        email: "",
        aadharNumber: "",
        panNumber: "",
        aadharFront: null,
        aadharBack: null,
        panCard: null,
        passport: null,
        bankStatement: null,
        salarySlip: null,
        selfie: null,
      })
      setUploadProgress({})
    }, 2000)
  }

  const FileUploadField = ({ name, label, accept, required = false }) => (
    <div className="file-upload-field">
      <label htmlFor={name} className="file-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="file-input-container">
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="file-input"
          required={required}
        />
        <label htmlFor={name} className="file-input-label">
          <span className="file-icon">📁</span>
          {formData[name] ? formData[name].name : "Choose file..."}
        </label>
      </div>
      {uploadProgress[name] !== undefined && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${uploadProgress[name]}%` }}></div>
          <span className="progress-text">{uploadProgress[name]}%</span>
        </div>
      )}
    </div>
  )

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>KYC Document Upload</h1>
        <p style={styles.subtitle}>Please upload all required documents for verification</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Personal Information */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Full Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Date of Birth <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Address <span style={styles.required}>*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              style={styles.textarea}
              rows="3"
              required
            />
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Phone Number <span style={styles.required}>*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Email <span style={styles.required}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Aadhar Number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="XXXX-XXXX-XXXX"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                PAN Number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="ABCDE1234F"
                required
              />
            </div>
          </div>
        </div>

        {/* Document Uploads */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Document Uploads</h2>

          <div style={styles.documentsGrid}>
            <FileUploadField name="aadharFront" label="Aadhar Card (Front)" accept="image/*,.pdf" required={true} />
            <FileUploadField name="aadharBack" label="Aadhar Card (Back)" accept="image/*,.pdf" required={true} />
            <FileUploadField name="panCard" label="PAN Card" accept="image/*,.pdf" required={true} />
            <FileUploadField name="passport" label="Passport" accept="image/*,.pdf" />
            <FileUploadField name="bankStatement" label="Bank Statement" accept="image/*,.pdf" />
            <FileUploadField name="salarySlip" label="Salary Slip" accept="image/*,.pdf" />
            <FileUploadField name="selfie" label="Selfie with ID" accept="image/*" required={true} />
          </div>
        </div>

        <div style={styles.submitSection}>
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
                Submitting...
              </>
            ) : (
              "Submit KYC Documents"
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .file-upload-field {
          margin-bottom: 20px;
        }

        .file-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .required {
          color: #e74c3c;
        }

        .file-input-container {
          position: relative;
        }

        .file-input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .file-input-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border: 2px dashed #ddd;
          border-radius: 8px;
          background: #f9f9f9;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #666;
        }

        .file-input-label:hover {
          border-color: #667eea;
          background: #f0f4ff;
          color: #667eea;
        }

        .file-icon {
          font-size: 1.2rem;
        }

        .progress-bar {
          position: relative;
          width: 100%;
          height: 6px;
          background: #e0e0e0;
          border-radius: 3px;
          margin-top: 8px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          top: -25px;
          right: 0;
          font-size: 0.8rem;
          color: #666;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
    fontSize: "1.7rem",
    margin: "0 0 10px 0",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "1.0rem",
    margin: 0,
    opacity: 0.9,
  },
  form: {
    background: "white",
    borderRadius: "15px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    color: "#333",
    marginBottom: "25px",
    paddingBottom: "10px",
    borderBottom: "3px solid #667eea",
    fontWeight: "600",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  inputGroup: {
    flex: 1,
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
  },
  required: {
    color: "#e74c3c",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    resize: "vertical",
    boxSizing: "border-box",
  },
  documentsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },
  submitSection: {
    textAlign: "center",
    marginTop: "40px",
    paddingTop: "30px",
    borderTop: "2px solid #f0f0f0",
  },
  submitButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "15px 40px",
    border: "none",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "0 auto",
  },
  submitButtonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid #ffffff40",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
}

export default KYC
