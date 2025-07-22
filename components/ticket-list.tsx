"use client"

import { Edit, Trash2, Plane, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Ticket } from "@/lib/types"

interface TicketListProps {
  tickets: Ticket[]
  onEdit: (ticket: Ticket) => void
  onDelete: (id: string) => void
}

export function TicketList({ tickets, onEdit, onDelete }: TicketListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-semibold",
          text: "Confirmado",
        }
      case "pending":
        return {
          className: "bg-amber-500/20 text-amber-300 border-amber-500/30 font-semibold",
          text: "Pendente",
        }
      case "cancelled":
        return {
          className: "bg-red-500/20 text-red-300 border-red-500/30 font-semibold",
          text: "Cancelado",
        }
      default:
        return {
          className: "bg-slate-500/20 text-slate-300 border-slate-500/30 font-semibold",
          text: status,
        }
    }
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl"></div>
          <div className="relative p-6 rounded-full bg-slate-700/50 border border-slate-600/50 inline-block">
            <Plane className="h-16 w-16 text-slate-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-slate-200 mb-3">Nenhum ticket encontrado</h3>
        <p className="text-slate-400 text-base">Clique em "Novo Ticket" para criar o primeiro ticket da plataforma.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {tickets.map((ticket) => {
        const statusConfig = getStatusConfig(ticket.status)

        return (
          <Card
            key={ticket.id}
            className="bg-slate-700/40 border-slate-600/30 hover:bg-slate-700/60 hover:border-slate-500/50 transition-all duration-300 hover:shadow-xl group"
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-xl blur-sm"></div>
                    <div className="relative p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                      <Plane className="h-6 w-6 text-blue-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl mb-1">{ticket.flightNumber}</h3>
                    <p className="text-slate-300 text-sm font-medium">{ticket.airline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusConfig.className}>{statusConfig.text}</Badge>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(ticket)}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(ticket.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-slate-600/30 border border-slate-500/30">
                <div className="text-center">
                  <div className="text-lg font-bold text-white mb-1">{ticket.origin}</div>
                  <div className="text-sm text-slate-400">{formatTime(ticket.departureTime)}</div>
                </div>
                <div className="flex items-center gap-2 px-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent flex-1"></div>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent flex-1"></div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white mb-1">{ticket.destination}</div>
                  <div className="text-sm text-slate-400">{formatTime(ticket.arrivalTime)}</div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-600/20">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <div>
                    <div className="text-sm text-slate-400">Data de Partida</div>
                    <div className="text-white font-medium">{formatDate(ticket.departureTime)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-600/20">
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <div>
                    <div className="text-sm text-slate-400">Assento</div>
                    <div className="text-white font-medium">{ticket.seatNumber}</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-600/30">
                <div className="text-slate-300">
                  <span className="font-semibold text-white">{ticket.passengerName}</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-400">
                    R$ {ticket.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
