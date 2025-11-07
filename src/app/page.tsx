// import Navbar from "@/components/layout/Navbar";
// import AccountReceivable from "@/components/sections/AccountReceivable";

// export default function HomePage() {
//   return (
//     <main className="relative">
//       <Navbar />
//       <AccountReceivable />
     
//     </main>
//   );
// }

"use client";

import Navbar from "@/components/layout/Navbar";
import AccountReceivable, { AccountReceivableRef } from "@/components/sections/AccountReceivable"
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