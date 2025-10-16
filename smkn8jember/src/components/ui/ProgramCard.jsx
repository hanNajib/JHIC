import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";
import parse from "html-react-parser";
import { useSubjects } from "../../hooks/api/useSubject";
import { RenderIcon } from "./RenderIcon";
import { useNavigate } from "react-router-dom";
const ProgramCard = ({ program, className = "" }) => {
  const navigate = useNavigate();
  return (
    <Card
      className={`flex-none w-full lg:w-1/3 ${className} cursor-pointer`}
      background="gray"
      padding="none"
      onClick={() => window.location.href = `/major/${program.short_name}`}
    >
      <img
        className="h-52 md:h-56 w-full object-cover"
        src={program.image}
        alt={program.name}
        loading="lazy"
      />

      <div className="flex flex-col px-5 py-6 gap-1 relative">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-[#f78000] text-[#fff] text-2xl rounded-full">
            <RenderIcon iconName={program.icon} size={24} />
          </span>
          <h1 className="text-[#242424] font-poppins font-semibold">
            {program.name}
          </h1>
        </div>

        <div className="flex flex-col justify-between gap-3 mb-3">
          <div className="text-[#495057] leading-snug py-2 max-h-24 h-24 overflow-hidden">
            <div className="child-line-clamp">{program.description ? parse(program.description) : "-"}</div>
          </div>

        </div>

        {program.subjects && program.subjects.length > 0 && (
          <>
            <p className="font-poppins font-medium text-[#ff6000] text-sm">
              Mata pelajaran utama:
            </p>
            <div className="flex flex-wrap w-full gap-2 relative">
              {(program.subjects || []).map((subject, index) => (
                <Badge key={index} variant="primary" size="xs">
                  {subject.name}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ProgramCard;
