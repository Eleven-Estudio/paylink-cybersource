"use client";

import React from "react";
import Logo from "../commons/logo";

const Powered = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 transition-all duration-300 mt-4">
      <span>Powered by </span>
      <Logo className="h-3 w-auto fill-neutral-400" />
    </div>
  );
};

export default Powered;
