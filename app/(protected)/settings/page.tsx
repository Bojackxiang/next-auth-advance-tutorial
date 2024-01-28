
import React from "react";
import { auth, signOut } from "@/auth";
import { ExtendedUser } from "@/next-auth";

const SettingPage = async () => {
  const session = await auth();  


  return (
    <div>
      {JSON.stringify(session)}
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
