export type DeliveryType = 'parcel' | 'food'
export type RequestStatus = 'open' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled'

export interface Profile {
  id: string
  email: string
  full_name: string
  hostel_block: string
  room_number: string
  total_earnings: number
  total_deliveries: number
  rating: number
  created_at: string
}

export interface DeliveryRequest {
  id: string
  requester_id: string
  carrier_id: string | null
  type: DeliveryType
  pickup_location: string
  drop_location: string
  description: string
  fee: number
  status: RequestStatus
  note: string
  created_at: string
  requester?: Profile
  carrier?: Profile
}
