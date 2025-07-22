"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Ticket } from "@/lib/types"

interface TicketFormProps {
  ticket?: Ticket | null
  onSubmit: (ticket: Omit<Ticket, "id">) => void
  onCancel: () => void
}

export function TicketForm({ ticket, onSubmit, onCancel }: TicketFormProps) {
  const [formData, setFormData] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    airline: "",
    status: "pending" as const,
    passengerName: "",
    seatNumber: "",
  })

  useEffect(() => {
    if (ticket) {
      setFormData({
        flightNumber: ticket.flightNumber,
        origin: ticket.origin,
        destination: ticket.destination,
        departureTime: ticket.departureTime.slice(0, 16),
        arrivalTime: ticket.arrivalTime.slice(0, 16),
        price: ticket.price.toString(),
        airline: ticket.airline,
        status: ticket.status,
        passengerName: ticket.passengerName,
        seatNumber: ticket.seatNumber,
      })
    }
  }, [ticket])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      flightNumber: formData.flightNumber,
      origin: formData.origin,
      destination: formData.destination,
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      price: Number.parseFloat(formData.price),
      airline: formData.airline,
      status: formData.status,
      passengerName: formData.passengerName,
      seatNumber: formData.seatNumber,
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Flight Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide border-b border-slate-600/50 pb-2">
          Informações do Voo
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="flightNumber" className="text-slate-200 font-medium">
              Número do Voo
            </Label>
            <Input
              id="flightNumber"
              value={formData.flightNumber}
              onChange={(e) => handleChange("flightNumber", e.target.value)}
              placeholder="Ex: AZ-2024"
              required
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="airline" className="text-slate-200 font-medium">
              Companhia Aérea
            </Label>
            <Input
              id="airline"
              value={formData.airline}
              onChange={(e) => handleChange("airline", e.target.value)}
              placeholder="Ex: AeroZen"
              required
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Route Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide border-b border-slate-600/50 pb-2">
          Rota
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin" className="text-slate-200 font-medium">
              Origem
            </Label>
            <Input
              id="origin"
              value={formData.origin}
              onChange={(e) => handleChange("origin", e.target.value)}
              placeholder="Ex: São Paulo"
              required
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-slate-200 font-medium">
              Destino
            </Label>
            <Input
              id="destination"
              value={formData.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
              placeholder="Ex: Rio de Janeiro"
              required
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Time Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide border-b border-slate-600/50 pb-2">
          Horários
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departureTime" className="text-slate-200 font-medium">
              Partida
            </Label>
            <Input
              id="departureTime"
              type="datetime-local"
              value={formData.departureTime}
              onChange={(e) => handleChange("departureTime", e.target.value)}
              required
              className="bg-slate-700/50 border-slate-600/50 text-white focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="arrivalTime" className="text-slate-200 font-medium">
              Chegada
            </Label>
            <Input
              id="arrivalTime"
              type="datetime-local"
              value={formData.arrivalTime}
              onChange={(e) => handleChange("arrivalTime", e.target.value)}
              required
              className="bg-slate-700/50 border-slate-600/50 text-white focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Passenger Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide border-b border-slate-600/50 pb-2">
          Informações do Passageiro
        </h4>
        <div className="space-y-2">
          <Label htmlFor="passengerName" className="text-slate-200 font-medium">
            Nome do Passageiro
          </Label>
          <Input
            id="passengerName"
            value={formData.passengerName}
            onChange={(e) => handleChange("passengerName", e.target.value)}
            placeholder="Ex: Maria Silva"
            required
            className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide border-b border-slate-600/50 pb-2">
          Detalhes Adicionais
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seatNumber" className="text-slate-200 font-medium">
              Assento
            </Label>
            <Input
              id="seatNumber"
              value={formData.seatNumber}
              onChange={(e) => handleChange("seatNumber", e.target.value)}
              placeholder="Ex: 12A"
              required
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-slate-200 font-medium">
              Preço (R$)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="299.99"
              required
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status" className="text-slate-200 font-medium">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="pending" className="text-white hover:bg-slate-700 focus:bg-slate-700">
                  Pendente
                </SelectItem>
                <SelectItem value="confirmed" className="text-white hover:bg-slate-700 focus:bg-slate-700">
                  Confirmado
                </SelectItem>
                <SelectItem value="cancelled" className="text-white hover:bg-slate-700 focus:bg-slate-700">
                  Cancelado
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-slate-600/50">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {ticket ? "Atualizar Ticket" : "Criar Ticket"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent hover:border-slate-500 transition-all duration-300"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
