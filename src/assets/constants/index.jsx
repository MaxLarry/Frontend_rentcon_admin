import { MdSpaceDashboard, MdHomeWork, MdPeople, MdSecurity, MdMail, MdHistory } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { RiSettings3Fill } from "react-icons/ri";
import { IoHelpCircle } from "react-icons/io5";


export const links = [
    {
        to: "/dashboard",
        icon: MdSpaceDashboard,
        text: "Dashboard"
    },
    {
        to: "/listing-management",
        icon: MdHomeWork,
        text: "Listing Management"
    },
    {
        to: "/user-management",
        icon: MdPeople,
        text: "User Management"
    },
    // {
    //     to: "/compliance-safety",
    //     icon: GrCompliance,
    //     text: "Compliance & Safety"
    // },
    {
        to: "/data-overview",
        icon: FaChartPie,
        text: "Data Overview"
    },
    {
        to: "/inbox",
        icon: MdMail,
        text: "Inbox"
    },
    {
        to: "/activity-logs",
        icon: MdHistory,
        text: "Activity Logs"
    },
];


export const support = [
    {
        to: "/settings",
        icon: RiSettings3Fill,
        text: "Setting"
    },
    {
        to: "#",
        icon: IoHelpCircle,
        text: "Help"
    },
];

export const REVIEW_ISSUES = [
    'Incomplete Information',
    'Non-Compliance with Regulations',
    'Inaccurate Information',
    'Poor Quality Photos',
    'Ownership Verification Issues'
];

export const roles = {
    'Listing Manager': ['/dashboard', '/listing-management', '/inbox', '/activity-logs','/settings'],
    'User Manager': ['/dashboard', '/user-management', '/inbox', '/activity-logs', '/settings'],
    'Super-Admin': [
      '/dashboard',
      '/listing-management',
      '/activity-logs',
      '/user-management',
      '/compliance-safety',
      '/data-overview',
      '/inbox',
      '/settings'
    ],
    Admin: ['/dashboard', '/user-management', '/data-overview'] // Example role
  };
