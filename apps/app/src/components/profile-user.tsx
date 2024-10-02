"use client";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@v1/supabase/client";
import { getUser } from "@v1/supabase/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@v1/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Lucide } from "@v1/ui/lucide";
import { Skeleton } from "@v1/ui/skeleton";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileUser = () => {
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const router = useRouter();
  const supabase = createClient();

  const { data: user, isLoading } = useQuery(getUser(supabase, userId ?? ""), {
    enabled: !!userId,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const fetchDataUserAuth = async () => {
    const user = await supabase.auth.getUser();
    if (!user?.data?.user) {
      setStatus("unauthenticated");
    }
    setStatus("authenticated");
    setUserId(user?.data?.user?.id);
  };

  useEffect(() => {
    fetchDataUserAuth();
  }, []);

  if (status === "loading" || isLoading) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="rounded-full">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src={user?.avatar_url ?? ""} alt={user?.name ?? ""} />
            <AvatarFallback>
              <span className="uppercase">{user?.name?.slice(0, 1)}</span>
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-3">
        <DropdownMenuGroup className="p-2">
          <p className="truncate text-sm font-medium text-gray-900">
            {user?.name}
          </p>
          <p className="truncate text-sm text-gray-500">{user?.email}</p>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleSignOut}>
          <Lucide.LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileUser;
