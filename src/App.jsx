
import { useState } from "react";
import "./App.css";

const demoResults = [
  { label: "Normal", value: 12, color: "#16A085" },
  { label: "Pneumonia", value: 68, color: "#3975C6" },
  { label: "Tuberculosis", value: 8, color: "#D99A28" },
  { label: "COVID-19", value: 12, color: "#8B6BC1" },
];

function App() {
  const [imagePreview, setImagePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [activePage, setActivePage] = useState("Overview");

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(URL.createObjectURL(file));
    setFileName(file.name);
setShowResults(false);
alert("X-ray image uploaded successfully!");
  }

  function handleClearImage() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setFileName("");
    setShowResults(false);
  }

  function handleDemoAnalysis() {
    if (!imagePreview) {
      alert("Please upload a chest X-ray image first.");
      return;
    }

    setShowResults(true);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">P+</div>
          <div>
            <h2>PneumoNet</h2>
            <p>AI Research Dashboard</p>
          </div>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <button
          className={`nav-item ${
            activePage === "Overview" ? "active" : ""
          }`}
          onClick={() => setActivePage("Overview")}
        >
          ▦ &nbsp; Overview
        </button>

        <button
          className={`nav-item ${
            activePage === "X-ray Analysis" ? "active" : ""
          }`}
          onClick={() => setActivePage("X-ray Analysis")}
        >
          ◎ &nbsp; X-ray Analysis
        </button>

        <button
          className={`nav-item ${
            activePage === "Analysis History" ? "active" : ""
          }`}
          onClick={() => setActivePage("Analysis History")}
        >
          ▤ &nbsp; Analysis History
        </button>

        <div className="sidebar-note">
          <span className="status-dot" />
          <strong>Research Prototype</strong>
          <p>Four-class chest X-ray classification</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">PNEUMONET / WORKSPACE</p>
            <h1>Chest X-ray Analysis</h1>
          </div>

          <div className="prototype-tag">● Demo Mode</div>
        </header>

        {/* OVERVIEW PAGE */}
        {activePage === "Overview" && (
          <>
            <section className="welcome">
              <div>
                <p className="eyebrow light">
                  INTELLIGENT IMAGING RESEARCH
                </p>
                <h2>Welcome to PneumoNet</h2>
                <p>
                  Explore a four-class chest X-ray classification
                  workflow. Upload an image to preview the interface.
                </p>
              </div>

              <div className="welcome-symbol">✚</div>
            </section>

            <section className="notice">
              <strong>Demo only:</strong> Predictions shown here are
              simulated examples, not outputs from a trained model.
              This prototype is not intended for clinical diagnosis.
            </section>

            <section className="summary-grid">
              <div className="summary-card">
                <div className="summary-top">
                  <span className="summary-icon normal-icon">N</span>
                  <span className="summary-category">CLASS 01</span>
                </div>
                <h3>Normal</h3>
                <p>No abnormality class</p>
              </div>

              <div className="summary-card">
                <div className="summary-top">
                  <span className="summary-icon pneumonia-icon">P</span>
                  <span className="summary-category">CLASS 02</span>
                </div>
                <h3>Pneumonia</h3>
                <p>Infection-related class</p>
              </div>

              <div className="summary-card">
                <div className="summary-top">
                  <span className="summary-icon tb-icon">T</span>
                  <span className="summary-category">CLASS 03</span>
                </div>
                <h3>Tuberculosis</h3>
                <p>TB-related class</p>
              </div>

              <div className="summary-card">
                <div className="summary-top">
                  <span className="summary-icon covid-icon">C</span>
                  <span className="summary-category">CLASS 04</span>
                </div>
                <h3>COVID-19</h3>
                <p>COVID-related class</p>
              </div>
            </section>

            <div className="section-heading">
              <div>
                <h2>New analysis</h2>
                <p>Upload a chest X-ray image to get started.</p>
              </div>
              <span className="step-label">STEP 01 · UPLOAD</span>
            </div>

            <section className="workspace-grid">
              <div className="panel upload-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Chest X-ray image</h3>
                    <p>Choose an image from your computer</p>
                  </div>
                  <span className="panel-icon">↥</span>
                </div>

                <label className="upload-zone">
                  {imagePreview ? (
                    <img
                      className="xray-preview"
                      src={imagePreview}
                      alt="Uploaded image preview"
                    />
                  ) : (
                    <>
                      <div className="upload-icon">↑</div>
                      <h3>Upload X-ray image</h3>
                      <p>Click here to browse your files</p>
                      <span className="file-types">
                        PNG, JPG, JPEG
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageUpload}
                  />
                </label>

                {fileName && (
                  <p className="file-name">
                    Selected file: {fileName}
                  </p>
                )}
              {imagePreview && (
  <button
    className="secondary-button"
    onClick={handleClearImage}
  >
    Clear image
  </button>
)}
                <button
                  className="primary-button"
                  onClick={handleDemoAnalysis}
                >
                  Preview demo results <span>→</span>
                </button>

                <p className="privacy-note">
                  Image preview only. No image is sent to a server
                  in this demo.
                </p>
              </div>

              <div className="panel results-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Classification overview</h3>
                    <p>Four target classes</p>
                  </div>
                  <span className="panel-icon">◎</span>
                </div>

                {showResults ? (
                  <>
                    <div className="demo-result-banner">
                      <span>SIMULATED OUTPUT</span>
                      <h3>Example prediction distribution</h3>
                      <p>
                        These fixed demo values are unrelated to
                        your uploaded image.
                      </p>
                    </div>

                    <div className="result-list">
                      {demoResults.map((result) => (
                        <div
                          className="result-row"
                          key={result.label}
                        >
                          <div className="result-label">
                            <span
                              className="legend-dot"
                              style={{
                                backgroundColor: result.color,
                              }}
                            />
                            <span>{result.label}</span>
                            <strong>{result.value}%</strong>
                          </div>

                          <div className="progress-track">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${result.value}%`,
                                backgroundColor: result.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="empty-results">
                    <div className="empty-icon">▤</div>
                    <h3>Results will appear here</h3>
                    <p>
                      Upload an image, then select “Preview demo
                      results” to explore the interface.
                    </p>

                    <div className="class-chips">
                      <span>Normal</span>
                      <span>Pneumonia</span>
                      <span>Tuberculosis</span>
                      <span>COVID-19</span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* X-RAY ANALYSIS PAGE */}
        {activePage === "X-ray Analysis" && (
          <section className="page-panel">
            <p className="eyebrow">PNEUMONET / ANALYSIS</p>
            <h2>X-ray Analysis</h2>
            <p className="page-description">
              Upload a chest X-ray to preview the image and explore
              the four-class classification workflow.
            </p>

            <div className="analysis-info">
              <div className="analysis-info-icon">✚</div>
              <div>
                <h3>Four-class classification</h3>
                <p>
                  Normal · Pneumonia · Tuberculosis · COVID-19
                </p>
              </div>
            </div>

            <div className="page-upload">
              <label className="upload-zone">
                {imagePreview ? (
                  <img
                    className="xray-preview"
                    src={imagePreview}
                    alt="Uploaded chest X-ray preview"
                  />
                ) : (
                  <>
                    <div className="upload-icon">↑</div>
                    <h3>Upload chest X-ray</h3>
                    <p>
                      Select a PNG or JPEG image from your computer
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageUpload}
                />
              </label>

              {fileName && (
                <p className="file-name">
                  Selected file: {fileName}
                </p>
              )}

              <div className="analysis-actions">
                <button
                  className="secondary-button"
                  onClick={handleClearImage}
                >
                  Clear image
                </button>

                <button
                  className="primary-button"
                  onClick={handleDemoAnalysis}
                >
                  Preview demo results →
                </button>
              </div>

              {showResults && (
                <div className="demo-result-banner analysis-demo-result">
                  <span>SIMULATED OUTPUT</span>
                  <h3>Example classification distribution</h3>
                  <p>
                    These are fixed demonstration values, not
                    predictions from the uploaded image or a trained
                    model.
                  </p>

                  {demoResults.map((result) => (
                    <div
                      className="result-row"
                      key={result.label}
                    >
                      <div className="result-label">
                        <span
                          className="legend-dot"
                          style={{
                            backgroundColor: result.color,
                          }}
                        />
                        <span>{result.label}</span>
                        <strong>{result.value}%</strong>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${result.value}%`,
                            backgroundColor: result.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="medical-note">
              Research prototype only. This interface is not
              intended for clinical diagnosis.
            </p>
          </section>
        )}

        {/* ANALYSIS HISTORY PAGE */}
        {activePage === "Analysis History" && (
          <section className="page-panel">
            <p className="eyebrow">PNEUMONET / RECORDS</p>
            <h2>Analysis History</h2>
            <p className="page-description">
              Review previous analyses saved by this application.
            </p>

            <div className="history-empty">
              <div className="empty-icon">▤</div>
              <h3>No saved analyses yet</h3>
              <p>
                Your analysis history has not been connected to
                persistent storage yet. After backend integration,
                completed analyses can be saved and displayed here.
              </p>

              <button
                className="primary-button history-button"
                onClick={() => setActivePage("X-ray Analysis")}
              >
                Start a new analysis →
              </button>
            </div>
          </section>
        )}

        <footer>
          <span>PneumoNet · Major Project Prototype</span>
          <span>Research use only · Not a medical device</span>
        </footer>
      </main>
    </div>
  );
}

export default App;