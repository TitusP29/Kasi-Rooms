import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "@/components/ui/icons";

const ReportButton = ({ onReport }) => {
  return (
    <Button
      variant="destructive"
      onClick={onReport}
      className="flex items-center gap-2"
    >
      <AlertTriangle size={16} />
      Report
    </Button>
  );
};

export default ReportButton;
