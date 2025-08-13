import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SubscriptionsContent } from "@/components/subscriptions-content"

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-4 sm:p-6 mobile-padding">
          <SubscriptionsContent />
        </main>
      </div>
    </div>
  )
}
