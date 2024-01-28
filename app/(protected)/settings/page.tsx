
import React from "react";
import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();

  return (
    <div>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">SIGN OUT</button>
      </form>
    </div>
  );
};

export default SettingPage;
