import { BUSINESS } from "@/business";
import { linkConstructor } from "@/lib/link-constructor";
import type { Tables } from "@v1/supabase/types";
import { Avatar, AvatarFallback, AvatarImage } from "@v1/ui/avatar";
import { CopyButton } from "@v1/ui/copy-button";
import { Lucide } from "@v1/ui/lucide";
import React from "react";
import DateTooltip from "./date-tooltip";
import TagBadge, { type stateProps } from "./status-badge";
import CreatedByTooltip from "./user-tooltip";

interface Props {
  title: string;
  link: string;
  user: {
    name: string;
    email: string;
    avatar_url: string;
  };
  views: number;
  created_at: string;
  state: Tables<"links">["state"];
}

const CardLink = ({ title, link, user, views, created_at, state }: Props) => {
  const url = linkConstructor({
    domain: BUSINESS.domain,
    key: link,
  });

  return (
    <li className="w-full group/card border-gray-200 bg-white border rounded-xl transition-[filter] hover:drop-shadow-card-hover">
      <div className="w-full py-2.5 px-4 flex items-center gap-5 sm:gap-8 md:gap-12 text-sm">
        <div className="min-w-0 grow">
          <div className="flex items-center gap-3 h-[60px]">
            {/* Link Icon */}
            <div className="relative hidden shrink-0 items-center justify-center sm:flex">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                <Lucide.Link className="w-5 h-5 stroke-2" />
              </div>
            </div>

            {/* Link Details */}
            <div className="h-[44px] min-w-0 overflow-hidden">
              {/* Link Title */}
              <div className="flex items-center gap-2">
                <span className="truncate font-semibold leading-6 text-gray-800 transition-colors hover:text-black">
                  {title}
                </span>
                <CopyButton value={url} variant="neutral" />
              </div>

              {/* Link Container URL - User - Date */}
              <div className="min-w-0 items-center whitespace-nowrap text-sm gap-1.5 flex md:gap-3">
                {/* Link URL */}
                <div className="flex min-w-0 items-center gap-1">
                  <Lucide.CornerDownRight className="w-3 h-3 shrink-0 text-gray-400" />
                  <a
                    href={url}
                    className="truncate text-gray-500 transition-colors hover:text-gray-700 hover:underline hover:underline-offset-2"
                  >
                    {/* {url.replace(/^https?:\/\//, "")} */}
                    {link}
                  </a>
                </div>

                {/* Link User */}
                <div className="hidden shrink-0 sm:block">
                  {user?.email && (
                    <CreatedByTooltip
                      name={user?.name}
                      email={user?.email}
                      avatar_url={user?.avatar_url ?? ""}
                    />
                  )}
                </div>

                {/* Link Date */}
                <div className="hidden shrink-0 sm:flex">
                  <DateTooltip date={created_at} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-5">
          <TagBadge state={state as stateProps} />
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800">
            {/* Views */}
            <div className="hidden items-center sm:flex gap-1 whitespace-nowrap px-1.5 py-0.5 transition-colors hover:bg-gray-100">
              {views ? (
                <Lucide.Eye className="w-3 h-3" />
              ) : (
                <Lucide.EyeOff className="w-3 h-3" />
              )}
              <span className="text-sm font-medium">{views} views</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardLink;
