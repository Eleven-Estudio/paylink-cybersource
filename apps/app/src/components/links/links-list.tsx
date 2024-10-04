"use client";

// import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@v1/supabase/client";
import { getLinks } from "@v1/supabase/queries";
import type { Tables } from "@v1/supabase/types";
import { createContext, useContext, useState } from "react";
import CardLink from "./card-link";
import LinksListLoading from "./links-list-loading";
import ModalViewUpdateLink from "./modal-view-update-link";

type LinkContextType = {
  link: number | null;
  setLink: (link: number | null) => void;
};

const LinkContext = createContext<LinkContextType>({
  link: null,
  setLink: () => {},
});

export const useLinkContext = () => useContext(LinkContext);

const LinksList = () => {
  const client = createClient();
  const [linkSelected, setLinkSelected] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => (await getLinks(client)).data,
  });

  return (
    <LinkContext.Provider
      value={{ link: linkSelected, setLink: setLinkSelected }}
    >
      <ul className="flex flex-col gap-4 w-full group/card-list min-w-0">
        {isLoading ? (
          <LinksListLoading />
        ) : (
          data?.map((link) => {
            const user = link.created_by as unknown as Tables<"users">;

            return (
              <CardLink
                onClick={(id) => setLinkSelected(id)}
                key={link.id}
                id={link.id}
                title={link.title}
                link={link.key}
                active={!!link?.active}
                user={{
                  name: user.name ?? "",
                  email: user.email ?? "",
                  avatar_url: user.avatar_url ?? "",
                }}
                views={link.views ?? 0}
                created_at={link.created_at}
                state={link.state}
              />
            );
          })
        )}
      </ul>
      <ModalViewUpdateLink />
    </LinkContext.Provider>
  );
};

export default LinksList;
