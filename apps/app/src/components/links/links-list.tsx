"use client";

import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@v1/supabase/client";
import { getLinks } from "@v1/supabase/queries";
import CardLink from "./card-link";
import LinksListLoading from "./links-list-loading";

const LinksList = () => {
  const client = createClient();
  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => (await getLinks(client)).data,
  });

  return (
    <ul className="flex flex-col gap-4 w-full group/card-list min-w-0">
      {isLoading ? (
        <LinksListLoading />
      ) : (
        data?.map((link) => (
          <CardLink
            key={link.id}
            title={link.title}
            link={link.key}
            user={{
              name: link.user?.name ?? "",
              email: link.user?.email ?? "",
              avatar_url: link.user?.avatar_url ?? "",
            }}
            views={link.views ?? 0}
            created_at={link.created_at}
          />
        ))
      )}
    </ul>
  );
};

export default LinksList;
