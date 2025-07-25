// "use client"

// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { EnhancedSidebar } from "@/components/enhanced-sidebar"
// import { OfflineManager } from "@/components/offline-manager"

// export default function OfflinePage() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />

//       <div className="flex-1 flex flex-col lg:flex-row">
//         <EnhancedSidebar />

//         <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-rice-50 to-sky-50">
//           <OfflineManager />
//         </main>
//       </div>

//       <Footer />
//     </div>
//   )
// }

// app/offline/page.js
export default function OfflinePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Offline Access</h1>
      <p>This page is currently unavailable in the static version of the site.</p>
    </div>
  );
}
