"use client";

import { Badge } from "@v1/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@v1/ui/card";
import { ScrollArea } from "@v1/ui/scroll-area";
import { useState } from "react";

interface JSONReaderProps {
  data?: Record<string, unknown>;
  isError?: boolean;
}

export default function JSONReaderCard({
  data,
  isError = false,
}: JSONReaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Card className="w-full max-w-[300px] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-wrap gap-4">
        <CardTitle className="text-sm font-medium">JSON Metadata</CardTitle>
        <Badge variant={isError ? "destructive" : "default"}>
          {isError ? "Error" : "Success"}
        </Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`overflow-auto ${isExpanded ? "h-64" : "h-32"}`}>
          <pre className="text-xs whitespace-pre-wrap break-words">
            {JSON.stringify(data, null, 2)}
          </pre>
        </ScrollArea>
        <button
          onClick={toggleExpand}
          className="mt-2 text-xs text-blue-500 hover:underline focus:outline-none"
          type="button"
        >
          {isExpanded ? "Mostrar menos" : "Mostrar más"}
        </button>
      </CardContent>
    </Card>
  );
}
