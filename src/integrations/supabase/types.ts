export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      event_settings: {
        Row: {
          address: string | null
          city: string | null
          complement: string | null
          cover_image_url: string | null
          created_at: string
          event_date: string | null
          event_time: string | null
          id: string
          name: string
          pix_key: string | null
          pix_owner: string | null
          pix_qr_url: string | null
          state: string | null
          updated_at: string
          welcome_text: string | null
          whatsapp_phone: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          complement?: string | null
          cover_image_url?: string | null
          created_at?: string
          event_date?: string | null
          event_time?: string | null
          id?: string
          name?: string
          pix_key?: string | null
          pix_owner?: string | null
          pix_qr_url?: string | null
          state?: string | null
          updated_at?: string
          welcome_text?: string | null
          whatsapp_phone?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          complement?: string | null
          cover_image_url?: string | null
          created_at?: string
          event_date?: string | null
          event_time?: string | null
          id?: string
          name?: string
          pix_key?: string | null
          pix_owner?: string | null
          pix_qr_url?: string | null
          state?: string | null
          updated_at?: string
          welcome_text?: string | null
          whatsapp_phone?: string | null
        }
        Relationships: []
      }
      gift_reservations: {
        Row: {
          created_at: string
          gift_id: string
          guest_name: string
          id: string
          message: string | null
          phone: string | null
          status: Database["public"]["Enums"]["gift_status"]
        }
        Insert: {
          created_at?: string
          gift_id: string
          guest_name: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["gift_status"]
        }
        Update: {
          created_at?: string
          gift_id?: string
          guest_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["gift_status"]
        }
        Relationships: [
          {
            foreignKeyName: "gift_reservations_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "gifts"
            referencedColumns: ["id"]
          },
        ]
      }
      gifts: {
        Row: {
          category: Database["public"]["Enums"]["gift_category"]
          created_at: string
          description: string | null
          estimated_value: number | null
          external_link: string | null
          id: string
          image_url: string | null
          name: string
          quantity: number
          sort_order: number
          status: Database["public"]["Enums"]["gift_status"]
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["gift_category"]
          created_at?: string
          description?: string | null
          estimated_value?: number | null
          external_link?: string | null
          id?: string
          image_url?: string | null
          name: string
          quantity?: number
          sort_order?: number
          status?: Database["public"]["Enums"]["gift_status"]
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["gift_category"]
          created_at?: string
          description?: string | null
          estimated_value?: number | null
          external_link?: string | null
          id?: string
          image_url?: string | null
          name?: string
          quantity?: number
          sort_order?: number
          status?: Database["public"]["Enums"]["gift_status"]
          updated_at?: string
        }
        Relationships: []
      }
      guest_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      rsvps: {
        Row: {
          created_at: string
          guests_count: number
          id: string
          message: string | null
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          guests_count?: number
          id?: string
          message?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          guests_count?: number
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      reserve_gift: {
        Args: {
          _gift_id: string
          _guest_name: string
          _message: string
          _phone: string
          _status: Database["public"]["Enums"]["gift_status"]
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "user"
      gift_category:
        | "cozinha"
        | "banheiro"
        | "lavanderia"
        | "sala"
        | "quarto"
        | "decoracao"
        | "utilidades"
        | "outros"
      gift_status: "disponivel" | "reservado" | "presenteado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      gift_category: [
        "cozinha",
        "banheiro",
        "lavanderia",
        "sala",
        "quarto",
        "decoracao",
        "utilidades",
        "outros",
      ],
      gift_status: ["disponivel", "reservado", "presenteado"],
    },
  },
} as const
