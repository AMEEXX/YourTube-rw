import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SubscriptionsContent } from "@/components/subscriptions-content"

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 mobile-padding">
          <SubscriptionsContent />
        </main>
      </div>
    </div>
  )
}
