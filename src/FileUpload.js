import { useEffect, useState } from 'react';
import { uploadData, list } from 'aws-amplify/storage';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [canUpload, setCanUpload] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_TYPES = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  // File naming convention: BUDGET_<YEAR>_<VERSION>.xlsx or .csv
  const FILE_NAME_PATTERN = /^BUDGET_\d{4}_V\d+\.(xlsx|csv)$/;

  useEffect(() => {
    checkUserGroup();
    fetchFiles();
  }, []);

  async function checkUserGroup() {
    try {
      const session = await fetchAuthSession();
      const groups =
        session.tokens?.accessToken?.payload['cognito:groups'] || [];
      setCanUpload(groups.includes('upload-users'));
    } catch (err) {
      console.error('Error checking user group', err);
      setCanUpload(false);
    }
  }

  async function fetchFiles() {
    try {
      const result = await list({ path: 'uploads/' });
      setFiles(result.items || []);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Only CSV or Excel files are allowed.');
      setFile(null);
      return;
    }

    // Validate file naming convention
    if (!FILE_NAME_PATTERN.test(selectedFile.name)) {
      setError('Invalid file naming convention. Expected format: BUDGET_YYYY_VX.xlsx or BUDGET_YYYY_VX.csv (e.g., BUDGET_2026_V1.xlsx)');
      setFile(null);
      return;
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5 MB.');
      setFile(null);
      return;
    }

    setError('');
    setSuccess('');
    setFile(selectedFile);
  }

  async function handleUpload() {
    if (!file) return;

    if (!canUpload) {
      setError('You are not authorized to upload files.');
      return;
    }

    try {
      const filePath = `uploads/${Date.now()}_${file.name}`;
      await uploadData({
        path: filePath,
        data: file,
        options: {
          contentType: file.type
        }
      });

      setSuccess('File uploaded successfully!');
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed.');
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-3 text-center">Secure File Upload</h3>

          {canUpload ? (
            <>
              <div className="mb-3">
                <label className="form-label">Select file</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  accept=".csv,.xlsx"
                />
                <div className="form-text">
                  Only CSV or Excel files. Format: BUDGET_YYYY_VX.xlsx (Max 5MB)
                </div>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={handleUpload}
                disabled={!file}
              >
                Upload
              </button>
            </>
          ) : (
            <div className="alert alert-danger text-center">
              You do not have permission to upload files.
            </div>
          )}

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h5 className="card-title">Uploaded Files</h5>
          {files.length === 0 ? (
            <p className="text-muted">No files uploaded yet.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {files.map(file => (
                <li key={file.path} className="list-group-item">
                  {file.path}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
