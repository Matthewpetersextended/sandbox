// frontend/app/(dashboard)/settings/billing/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CreditCard, Download, Clock, CheckCircle2 } from 'lucide-react'

export default function BillingSettings() {
  const [currentPlan] = useState({
    name: 'Pro',
    price: '$12/month',
    status: 'active',
    nextBillingDate: 'December 28, 2025',
  })

  const invoices = [
    { id: '1', date: 'Nov 28, 2025', amount: '$12.00', status: 'Paid' },
    { id: '2', date: 'Oct 28, 2025', amount: '$12.00', status: 'Paid' },
    { id: '3', date: 'Sep 28, 2025', amount: '$12.00', status: 'Paid' },
  ]

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing & Subscription</h2>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-teal-600">{currentPlan.name}</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {currentPlan.status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{currentPlan.price}</p>
            <p className="text-sm text-gray-600">Billed monthly</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Clock className="w-4 h-4" />
          <span>Next billing date: {currentPlan.nextBillingDate}</span>
        </div>

        <div className="flex gap-4">
          <Button variant="outline">Change Plan</Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            Cancel Subscription
          </Button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/2026</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>

        <Button variant="outline" className="w-full">
          Add Payment Method
        </Button>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
        
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-gray-900">{invoice.date}</p>
                  <p className="text-sm text-gray-600">Invoice #{invoice.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">{invoice.amount}</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                  {invoice.status}
                </span>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}