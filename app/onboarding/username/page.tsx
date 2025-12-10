"use client";

import { useState } from "react";

export default function page() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-20">
      <h2 className="font-bold text-3xl">Let's set a username</h2>
      <p>Set a username so people can identify you in the app!</p>

      <form action="" className="flex flex-col gap-5 w-100 mt-2">
        <div>
          <label htmlFor="username" className="w-full">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="bg-white border border-utell-laccent rounded-lg w-full py-3 px-5 text-md mt-1"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="terms"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2 w-5 h-5 rounded-xs"
          />
          <label htmlFor="terms">
            I have read and I accept the terms and conditions
          </label>
        </div>

        <button
          className={`bg-utell-yellow rounded-lg py-3 px-5 w-full font-bold cursor-pointer hover:bg-utell-yellow/80 transition-colors disabled:bg-utell-laccent disabled:cursor-not-allowed 
          }`}
          disabled={!isChecked}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
