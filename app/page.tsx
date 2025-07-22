"use client"

import { useState } from "react"
import { Plus, Plane, Users, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TicketList } from "@/components/ticket-list"
import { TicketForm } from "@/components/ticket-form"
import type { Ticket } from "@/lib/types"

const initialTickets: Ticket[] = [
  {
    id: "1",
    flightNumber: "AZ-2024",
    origin: "São Paulo",
    destination: "Rio de Janeiro",
    departureTime: "2024-01-15T08:30:00",
    arrivalTime: "2024-01-15T10:15:00",
    price: 299.99,
    airline: "AeroZen",
    status: "confirmed",
    passengerName: "Maria Silva",
    seatNumber: "12A",
  },
  {
    id: "2",
    flightNumber: "NX-4567",
    origin: "Rio de Janeiro",
    destination: "Salvador",
    departureTime: "2024-01-16T14:20:00",
    arrivalTime: "2024-01-16T16:45:00",
    price: 189.5,
    airline: "NeoX Airlines",
    status: "pending",
    passengerName: "João Santos",
    seatNumber: "8C",
  },
  {
    id: "3",
    flightNumber: "FX-8901",
    origin: "Brasília",
    destination: "Fortaleza",
    departureTime: "2024-01-17T11:10:00",
    arrivalTime: "2024-01-17T13:30:00",
    price: 425.0,
    airline: "FluxAir",
    status: "confirmed",
    passengerName: "Ana Costa",
    seatNumber: "15F",
  },
]

export default function TicketPlatform() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [showForm, setShowForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)

  const handleCreateTicket = (ticketData: Omit<Ticket, "id">) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
    }
    setTickets([...tickets, newTicket])
    setShowForm(false)
  }

  const handleUpdateTicket = (ticketData: Omit<Ticket, "id">) => {
    if (editingTicket) {
      setTickets(
        tickets.map((ticket) => (ticket.id === editingTicket.id ? { ...ticketData, id: editingTicket.id } : ticket)),
      )
      setEditingTicket(null)
      setShowForm(false)
    }
  }

  const handleDeleteTicket = (id: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id))
  }

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTicket(null)
  }

  const totalRevenue = tickets.reduce((sum, ticket) => sum + ticket.price, 0)
  const confirmedTickets = tickets.filter((ticket) => ticket.status === "confirmed").length
  const pendingTickets = tickets.filter((ticket) => ticket.status === "pending").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-2xl">
                <Plane className="h-10 w-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent mb-2">
                AeroTicket Pro
              </h1>
              <p className="text-slate-300 text-xl font-medium">Plataforma Avançada de Gestão de Passagens Aéreas</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="relative overflow-hidden bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-semibold text-blue-300 uppercase tracking-wide">
                Total de Tickets
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Plane className="h-5 w-5 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-1">{tickets.length}</div>
              <p className="text-sm text-slate-400">Tickets registrados no sistema</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                Confirmados
              </CardTitle>
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Users className="h-5 w-5 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-1">{confirmedTickets}</div>
              <p className="text-sm text-slate-400">Passagens confirmadas</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-semibold text-amber-300 uppercase tracking-wide">Pendentes</CardTitle>
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Calendar className="h-5 w-5 text-amber-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-1">{pendingTickets}</div>
              <p className="text-sm text-slate-400">Aguardando confirmação</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
                Receita Total
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-500/20">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-1">
                R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-slate-400">Valor total em vendas</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Ticket List */}
          <div className="xl:col-span-2">
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm shadow-2xl">
              <CardHeader className="border-b border-slate-700/50 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">Tickets de Passagens</CardTitle>
                    <CardDescription className="text-slate-300 text-base">
                      Gerencie todos os tickets da plataforma de forma eficiente
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-base font-semibold"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Novo Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <TicketList tickets={tickets} onEdit={handleEditTicket} onDelete={handleDeleteTicket} />
              </CardContent>
            </Card>
          </div>

          {/* Form Panel */}
          <div className="xl:col-span-1">
            {showForm && (
              <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm shadow-2xl sticky top-8">
                <CardHeader className="border-b border-slate-700/50 pb-6">
                  <CardTitle className="text-xl font-bold text-white">
                    {editingTicket ? "Editar Ticket" : "Novo Ticket"}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {editingTicket
                      ? "Atualize as informações do ticket selecionado"
                      : "Preencha os dados para criar um novo ticket"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <TicketForm
                    ticket={editingTicket}
                    onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
                    onCancel={handleCloseForm}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
