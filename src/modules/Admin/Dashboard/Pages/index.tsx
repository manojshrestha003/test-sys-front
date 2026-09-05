import { AdminLayout } from "@/app/lauouts/AdminLayout"
// import { OverlayLoader } from "@/common/components/OverlayLoader"

export const DashboardPage = () => {
  const loading = true;
  return (
    <>
   <AdminLayout>
     <div>
      {/* <OverlayLoader isLoading={loading} text="Loading" mode="inline" /> */}
     </div>
   </AdminLayout>
    </>
  )
}

