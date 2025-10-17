import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";

export const RenderIcon = ({ iconName, size = 20, className = "" }) => {
  if (!iconName) return null;

  const allIconLibs = {
    ...IoIcons,
    ...Io5Icons,
    ...MdIcons,
    ...FaIcons,
    ...AiIcons,
    ...BiIcons,
    ...BsIcons,
    ...FiIcons,
    ...HiIcons,
    ...RiIcons,
  };

  const Icon = allIconLibs[iconName];
  return Icon ? <Icon size={size} className={className} /> : null;
};

