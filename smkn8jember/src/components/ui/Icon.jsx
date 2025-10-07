import React from 'react';
import {
  LuBookText,
  LuHousePlus,
  LuEye,
} from "react-icons/lu";
import { 
  FaChalkboardTeacher, 
  FaMotorcycle,
  FaCode,
  FaWifi
} from "react-icons/fa";
import { 
  FaCode as FaCode6
} from "react-icons/fa6";
import { PiStudentBold, PiPlantFill } from "react-icons/pi";
import { IoMdColorPalette } from "react-icons/io";
import { IoCarSport, IoCalendarClearOutline } from "react-icons/io5";
import { RiPlantFill, RiMegaphoneFill } from "react-icons/ri";

const iconMap = {
  LuBookText,
  FaChalkboardTeacher,
  PiStudentBold,
  LuHousePlus,
  FaCode,
  FaWifi,
  IoMdColorPalette,
  IoCarSport,
  RiPlantFill,
  PiPlantFill,
  IoCalendarClearOutline,
  LuEye,
  RiMegaphoneFill,
  FaMotorcycle,
  FaCode6,
};

const Icon = ({ 
  name, 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  const iconStyle = {
    fontSize: typeof size === 'number' ? `${size}px` : size,
    color: color,
  };
  
  return (
    <IconComponent 
      style={iconStyle}
      className={className}
      {...props} 
    />
  );
};

export default Icon;