// "use client";

// import Navbar from "@/components/layout/Navbar";
// import AccountReceivable, {
//   AccountReceivableRef,
// } from "@/components/sections/AccountReceivable/index";
// import { useRef } from "react";

// export default function HomePage() {
//   const arRef = useRef<AccountReceivableRef>(null);

//   const handleImport = (file: File) => {
//     arRef.current?.triggerImport(file);
//   };

//   return (
//     <main className="relative">
//       <Navbar onImport={handleImport} />
//       <AccountReceivable ref={arRef} />
//     </main>
//   );
// }

// src\app\page.tsx

"use client";

import Navbar from "@/components/layout/Navbar";
import AccountReceivable, {
  AccountReceivableRef,
} from "@/components/sections/AccountReceivable/index";
import { useRef } from "react";

export default function HomePage() {
  const arRef = useRef<AccountReceivableRef>(null);

  const handleImport = (file: File) => {
    arRef.current?.triggerImport(file);
  };

  return (
    <main className="relative">
      <Navbar onImport={handleImport} />
      <AccountReceivable ref={arRef} />
    </main>
  );
}
