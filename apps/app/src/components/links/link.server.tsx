import { getLinks } from "@v1/supabase/queries";
import React from "react";
import { ColumnsLinks } from "./columns-links";
import { DataTableLinks } from "./data-table-links";

const LinksServer = async () => {
  const data = await getLinks();
  return <DataTableLinks columns={ColumnsLinks} data={data?.data ?? []} />;
};

export default LinksServer;
