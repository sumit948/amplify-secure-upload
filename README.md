AWS Amplify Secure File Upload Application (RBAC-enabled)
📌 Overview

This repository contains the frontend and AWS Amplify backend configuration for a secure, cloud-native file upload application. The solution demonstrates enterprise-grade authentication, role-based access control (RBAC), and secure file storage using AWS managed services.

The application allows authenticated users to upload and view files based on their assigned roles, with all authorization enforced through Amazon Cognito groups and IAM policies. Files are stored securely in a private Amazon S3 bucket.

************************

🏗️ Architecture Overview
User (Browser)
   ↓
React Application
   ↓
AWS Amplify SDK
   ↓
Amazon Cognito (Authentication & Groups)
   ↓
IAM Roles & Policies (Authorization)
   ↓
Amazon S3 (Private File Storage)


Note: Application deployment and hosting are managed through AWS Amplify Console, which is connected to this GitHub repository.

************************

🔐 Security Model
Layer	Implementation
Authentication	Amazon Cognito User Pool
Authorization	Cognito Groups + IAM Roles
Access Control	Role-Based Access Control (RBAC)
Storage	Private Amazon S3 bucket
Validation	Client-side file type & size checks
UI Control	Group-based feature visibility

************************

🚀 Key Features

1.Secure user authentication using Amazon Cognito
2.Role-based access control (RBAC) using Cognito groups
3.Private file storage in Amazon S3
4.Secure file upload using AWS Amplify Storage APIs
5.File type and size validation before upload
6.Listing of uploaded files based on user permissions
7.Responsive UI built with React and Bootstrap


************************


🛠️ Tech Stack
- Frontend
React.js
AWS Amplify
Bootstrap
AWS Services
Amazon Cognito (User Pool & Identity Pool)
AWS IAM
Amazon S3
AWS Amplify (Backend & Hosting)

- Tools
GitHub
Amplify CLI

************************

🔑 Role-Based Access Control (RBAC)

RBAC is implemented using Amazon Cognito Groups:

- Users are assigned to specific Cognito groups
- Each group is mapped to an IAM role
- IAM policies define permitted S3 actions (upload, list)
- Unauthorized users are blocked at the backend via IAM
- Frontend additionally restricts UI access for better user experience
- This ensures least-privilege access and strong security enforcement.


************************

📂 File Upload Validation

The application enforces basic client-side validation before upload:

- Maximum file size limit
- Allowed file types (e.g., PDF, images, CSV, Excel)

This helps prevent misuse and protects backend storage.


************************

🌐 Deployment & Hosting

Deployment and hosting are handled by AWS Amplify Console:

- This GitHub repository is connected to AWS Amplify
- Amplify builds and hosts the React application
- Backend resources (Cognito, IAM, S3) are managed via Amplify
- The application is served through an Amplify-hosted URL

No deployment scripts are included in this repository.

📁 Repository Structure (High-Level)
/amplify        # Amplify backend configuration (auth, storage)
/src            # React frontend source code
/public         # Static assets

************************

📈 Use Cases

- Secure internal document uploads
- Enterprise file management portals
- Role-restricted data submission systems
- Cloud-native frontend applications with RBAC


************************

🧠 Key Learnings

Implementing secure authentication with Amazon Cognito

Designing RBAC using Cognito groups and IAM roles

Using AWS Amplify to manage frontend and backend together

Securing Amazon S3 using private access and IAM

Hosting React applications using AWS Amplify Console
