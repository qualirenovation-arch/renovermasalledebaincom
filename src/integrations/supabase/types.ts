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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      subcontractor_documents: {
        Row: {
          created_at: string
          document_type: string
          expiry_date: string | null
          file_name: string
          file_path: string
          id: string
          status: Database["public"]["Enums"]["document_status"]
          subcontractor_id: string
          updated_at: string
          upload_date: string
        }
        Insert: {
          created_at?: string
          document_type: string
          expiry_date?: string | null
          file_name: string
          file_path: string
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          subcontractor_id: string
          updated_at?: string
          upload_date?: string
        }
        Update: {
          created_at?: string
          document_type?: string
          expiry_date?: string | null
          file_name?: string
          file_path?: string
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          subcontractor_id?: string
          updated_at?: string
          upload_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcontractor_documents_subcontractor_id_fkey"
            columns: ["subcontractor_id"]
            isOneToOne: false
            referencedRelation: "subcontractors"
            referencedColumns: ["id"]
          },
        ]
      }
      subcontractor_portfolio: {
        Row: {
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          id: string
          subcontractor_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          id?: string
          subcontractor_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          id?: string
          subcontractor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcontractor_portfolio_subcontractor_id_fkey"
            columns: ["subcontractor_id"]
            isOneToOne: false
            referencedRelation: "subcontractors"
            referencedColumns: ["id"]
          },
        ]
      }
      subcontractors: {
        Row: {
          accept_contact: boolean
          annual_revenue: string | null
          autonomous_intervention: boolean
          certify_accuracy: boolean
          collaboration_type: string | null
          company_name: string
          contact_function: string
          contact_name: string
          created_at: string
          email: string
          employee_count: number
          experience: string
          facebook_url: string | null
          houzz_url: string | null
          id: string
          instagram_url: string | null
          insurance_company: string | null
          insurance_contract_number: string | null
          internal_notes: string | null
          internal_rating: number | null
          linkedin_url: string | null
          managed_people_count: number | null
          manager_first_name: string | null
          manager_last_name: string | null
          manager_phone: string | null
          occupied_sites_experience: boolean
          phone: string
          presentation: string | null
          siret: string | null
          status: Database["public"]["Enums"]["subcontractor_status"]
          trade_other: string | null
          trades: string[]
          updated_at: string
          vat_number: string | null
          website_url: string | null
          works_as_subcontractor: boolean
          zone_other: string | null
          zones: string[]
        }
        Insert: {
          accept_contact?: boolean
          annual_revenue?: string | null
          autonomous_intervention?: boolean
          certify_accuracy?: boolean
          collaboration_type?: string | null
          company_name: string
          contact_function: string
          contact_name: string
          created_at?: string
          email: string
          employee_count: number
          experience: string
          facebook_url?: string | null
          houzz_url?: string | null
          id?: string
          instagram_url?: string | null
          insurance_company?: string | null
          insurance_contract_number?: string | null
          internal_notes?: string | null
          internal_rating?: number | null
          linkedin_url?: string | null
          managed_people_count?: number | null
          manager_first_name?: string | null
          manager_last_name?: string | null
          manager_phone?: string | null
          occupied_sites_experience?: boolean
          phone: string
          presentation?: string | null
          siret?: string | null
          status?: Database["public"]["Enums"]["subcontractor_status"]
          trade_other?: string | null
          trades?: string[]
          updated_at?: string
          vat_number?: string | null
          website_url?: string | null
          works_as_subcontractor?: boolean
          zone_other?: string | null
          zones?: string[]
        }
        Update: {
          accept_contact?: boolean
          annual_revenue?: string | null
          autonomous_intervention?: boolean
          certify_accuracy?: boolean
          collaboration_type?: string | null
          company_name?: string
          contact_function?: string
          contact_name?: string
          created_at?: string
          email?: string
          employee_count?: number
          experience?: string
          facebook_url?: string | null
          houzz_url?: string | null
          id?: string
          instagram_url?: string | null
          insurance_company?: string | null
          insurance_contract_number?: string | null
          internal_notes?: string | null
          internal_rating?: number | null
          linkedin_url?: string | null
          managed_people_count?: number | null
          manager_first_name?: string | null
          manager_last_name?: string | null
          manager_phone?: string | null
          occupied_sites_experience?: boolean
          phone?: string
          presentation?: string | null
          siret?: string | null
          status?: Database["public"]["Enums"]["subcontractor_status"]
          trade_other?: string | null
          trades?: string[]
          updated_at?: string
          vat_number?: string | null
          website_url?: string | null
          works_as_subcontractor?: boolean
          zone_other?: string | null
          zones?: string[]
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
    }
    Enums: {
      app_role: "admin" | "user"
      document_status: "valid" | "expiring_soon" | "expired" | "non_compliant"
      subcontractor_status:
        | "pending"
        | "reviewing"
        | "validated"
        | "refused"
        | "archived"
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
      document_status: ["valid", "expiring_soon", "expired", "non_compliant"],
      subcontractor_status: [
        "pending",
        "reviewing",
        "validated",
        "refused",
        "archived",
      ],
    },
  },
} as const
