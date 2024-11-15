import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";
import Link from "next/link";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  // {
  //   // id: uniqueId(),
  //   // title: "Typography",
  //   // icon: IconTypography,
  //   // href: "/utilities/typography",
  //   id: uniqueId(),
  //   title: "Progress ML Report",
  //   icon: IconAperture,
  //   href: "/utilities/progress-report",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Gen AI Report",
  //   icon: IconCopy,
  //   href: "/utilities/gen-ai-report",
  // },
  {
    id: uniqueId(),
    title: "Chatbot",
    icon: IconCopy,
    href: "https://ytl-lty-rag.vercel.app/",
    // href: "/utilities/QnA",
  },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
