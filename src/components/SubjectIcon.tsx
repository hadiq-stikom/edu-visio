import React from "react";
import * as LucideIcons from "lucide-react";

interface SubjectIconProps {
  name: string;
  className?: string;
}

export const SubjectIcon: React.FC<SubjectIconProps> = ({ name, className }) => {
  // Ambil komponen icon dinamis dari Lucide
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    return <LucideIcons.BookOpen className={className} />;
  }

  return <IconComponent className={className} />;
};
