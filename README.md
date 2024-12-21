# RentConnect Admin Side

## Introduction

RentConnect is a platform designed to connect landlords and occupants in Puerto Princesa City. The admin side is a web-based application that provides management tools for administrators to oversee the platform's operations, ensuring compliance, safety, and efficient data visualization.

![alt text](https://res.cloudinary.com/dyyglc78v/image/upload/v1734768010/Screenshot_2024-12-21_155936_i6wmg3.png)

## Features

- **Dashboard**: Overview of platform metrics and activity.
- **Listing Management**: Manage property listings submitted by landlords.
- **User Management**: Handle landlord and occupant accounts.
- **Compliance & Safety**: Verify property compliance with local regulations. (This Feature is under develop.)
- **Inbox**: Facilitate communication between administrators and users.
- **Log Activity**: Track admin actions and changes for transparency.

## Technologies Used

- **Frontend**: ReactJS with Vite, Shadcn UI components
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token) with cookies

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd rentconnect-admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and configure the following:

   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:5173`.

## Folder Structure

```
.
├── public
├── src
│   ├── components      # Reusable UI components
│   ├── pages           # Page-level components
│   ├── services        # API service calls
│   ├── utils           # Utility functions
│   ├── styles          # Global and component styles
│   └── App.jsx         # Main app component
├── .env                # Environment variables
├── package.json        # Project dependencies
└── README.md           # Documentation
```

## Admin Navigation

The admin side includes the following main navigation links:

- **Dashboard**
- **Listing Management**
- **User Management**
- **Compliance & Safety**
- **Inbox**
- **Log Activity**

## Setup Notes

- Ensure the backend is running at `http://localhost:5000`.
- Make sure MongoDB is installed and configured.

## Our Team

Meet the team behind RentConnect:

| Name                  | Role                                    | Photo                                                                                                                                                                                                                          |
| --------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Larry John Andonga    | Web App Lead Developer                  | <img src="https://res.cloudinary.com/dyyglc78v/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734767032/LarryJohn_sqooon.png" alt="Team Member 4" width="100" height="100">                    |
| Joseph Baria          | Mobile App Lead Developer               | <img src="https://res.cloudinary.com/dyyglc78v/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734767291/Screenshot_2024-12-21_154721_lnrqhi.png" alt="Team Member 4" width="100" height="100"> |
| Yuan Nico Lazarte     | Database Administrator                  | <img src="https://res.cloudinary.com/dyyglc78v/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734767078/Screenshot_2024-12-01_220444_w44to7.png" alt="Team Member 4" width="100" height="100"> |
| Nick Brienne Martinez | Graphic, UI/UX Designer                 | <img src="https://res.cloudinary.com/dyyglc78v/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734767270/Screenshot_2024-12-21_154645_gsdcd5.png" alt="Team Member 4" width="100" height="100"> |
| John Aivanne Molato   | UI/UX Designer, Documenation Specialist | <img src="https://res.cloudinary.com/dyyglc78v/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734767290/Screenshot_2024-12-21_154703_rcjpla.png" alt="Team Member 4" width="100" height="100"> |

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## Contact

For any questions or support, contact the development team at [rentconnect.it@gmail.com].
