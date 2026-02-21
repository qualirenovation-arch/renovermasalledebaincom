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
      album_photos: {
        Row: {
          album_id: string
          alt_text: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string
          title: string
        }
        Insert: {
          album_id: string
          alt_text?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url: string
          title?: string
        }
        Update: {
          album_id?: string
          alt_text?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_photos_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      album_seo: {
        Row: {
          album_id: string
          id: string
          meta_description: string | null
          meta_title: string | null
          updated_at: string
        }
        Insert: {
          album_id: string
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          updated_at?: string
        }
        Update: {
          album_id?: string
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_seo_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: true
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      album_tags: {
        Row: {
          album_id: string
          created_at: string
          id: string
          tag: string
        }
        Insert: {
          album_id: string
          created_at?: string
          id?: string
          tag: string
        }
        Update: {
          album_id?: string
          created_at?: string
          id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_tags_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          category: string | null
          cover_image: string
          created_at: string
          description: string
          display_order: number
          id: string
          is_featured: boolean
          is_in_progress: boolean
          location: string
          slug: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          cover_image?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          is_in_progress?: boolean
          location: string
          slug: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          cover_image?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          is_in_progress?: boolean
          location?: string
          slug?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      map_pin_positions: {
        Row: {
          area: string
          id: string
          name: string
          pin_id: string
          updated_at: string
          updated_by: string | null
          x: number
          y: number
        }
        Insert: {
          area: string
          id?: string
          name: string
          pin_id: string
          updated_at?: string
          updated_by?: string | null
          x: number
          y: number
        }
        Update: {
          area?: string
          id?: string
          name?: string
          pin_id?: string
          updated_at?: string
          updated_by?: string | null
          x?: number
          y?: number
        }
        Relationships: []
      }
      partner_contacts: {
        Row: {
          activity_type:
            | Database["public"]["Enums"]["partner_activity_type"]
            | null
          assigned_to: string | null
          availability:
            | Database["public"]["Enums"]["partner_availability"]
            | null
          collaboration_goal:
            | Database["public"]["Enums"]["partner_collaboration_goal"]
            | null
          collaboration_type:
            | Database["public"]["Enums"]["partner_collaboration_type"]
            | null
          company_name: string
          contact_first_name: string
          contact_last_name: string
          context: Database["public"]["Enums"]["partner_context"] | null
          created_at: string
          email: string
          id: string
          internal_notes: string | null
          intervention_level:
            | Database["public"]["Enums"]["partner_intervention_level"]
            | null
          last_contacted_at: string | null
          message: string
          next_followup_at: string | null
          offer_categories: string[] | null
          partner_family: Database["public"]["Enums"]["partner_family"]
          phone: string
          priority: Database["public"]["Enums"]["partner_priority"]
          requested_services: string[] | null
          source: string
          status: Database["public"]["Enums"]["partner_status"]
          timeline: Database["public"]["Enums"]["partner_timeline"] | null
          trade: Database["public"]["Enums"]["partner_trade"] | null
          updated_at: string
          website_url: string | null
          zone: Database["public"]["Enums"]["partner_zone"]
        }
        Insert: {
          activity_type?:
            | Database["public"]["Enums"]["partner_activity_type"]
            | null
          assigned_to?: string | null
          availability?:
            | Database["public"]["Enums"]["partner_availability"]
            | null
          collaboration_goal?:
            | Database["public"]["Enums"]["partner_collaboration_goal"]
            | null
          collaboration_type?:
            | Database["public"]["Enums"]["partner_collaboration_type"]
            | null
          company_name: string
          contact_first_name: string
          contact_last_name: string
          context?: Database["public"]["Enums"]["partner_context"] | null
          created_at?: string
          email: string
          id?: string
          internal_notes?: string | null
          intervention_level?:
            | Database["public"]["Enums"]["partner_intervention_level"]
            | null
          last_contacted_at?: string | null
          message: string
          next_followup_at?: string | null
          offer_categories?: string[] | null
          partner_family: Database["public"]["Enums"]["partner_family"]
          phone: string
          priority?: Database["public"]["Enums"]["partner_priority"]
          requested_services?: string[] | null
          source?: string
          status?: Database["public"]["Enums"]["partner_status"]
          timeline?: Database["public"]["Enums"]["partner_timeline"] | null
          trade?: Database["public"]["Enums"]["partner_trade"] | null
          updated_at?: string
          website_url?: string | null
          zone: Database["public"]["Enums"]["partner_zone"]
        }
        Update: {
          activity_type?:
            | Database["public"]["Enums"]["partner_activity_type"]
            | null
          assigned_to?: string | null
          availability?:
            | Database["public"]["Enums"]["partner_availability"]
            | null
          collaboration_goal?:
            | Database["public"]["Enums"]["partner_collaboration_goal"]
            | null
          collaboration_type?:
            | Database["public"]["Enums"]["partner_collaboration_type"]
            | null
          company_name?: string
          contact_first_name?: string
          contact_last_name?: string
          context?: Database["public"]["Enums"]["partner_context"] | null
          created_at?: string
          email?: string
          id?: string
          internal_notes?: string | null
          intervention_level?:
            | Database["public"]["Enums"]["partner_intervention_level"]
            | null
          last_contacted_at?: string | null
          message?: string
          next_followup_at?: string | null
          offer_categories?: string[] | null
          partner_family?: Database["public"]["Enums"]["partner_family"]
          phone?: string
          priority?: Database["public"]["Enums"]["partner_priority"]
          requested_services?: string[] | null
          source?: string
          status?: Database["public"]["Enums"]["partner_status"]
          timeline?: Database["public"]["Enums"]["partner_timeline"] | null
          trade?: Database["public"]["Enums"]["partner_trade"] | null
          updated_at?: string
          website_url?: string | null
          zone?: Database["public"]["Enums"]["partner_zone"]
        }
        Relationships: []
      }
      partner_documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          id: string
          partner_contact_id: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          id?: string
          partner_contact_id: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          id?: string
          partner_contact_id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_documents_partner_contact_id_fkey"
            columns: ["partner_contact_id"]
            isOneToOne: false
            referencedRelation: "partner_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          access_token: string | null
          assigned_to: string | null
          callback_requested: boolean | null
          callback_requested_at: string | null
          client_email: string
          client_first_name: string
          client_last_name: string
          client_phone: string | null
          created_at: string
          id: string
          internal_notes: string | null
          last_contacted_at: string | null
          lead_status: string
          message: string | null
          next_followup_at: string | null
          photo_urls: string[] | null
          priority: string
          project_room_type: string | null
          project_type: string | null
          property_address: string | null
          property_city: string | null
          property_elevator: string | null
          property_floor: string | null
          property_occupied: boolean | null
          property_postal_code: string | null
          property_surface: string | null
          property_type: string | null
          renovation_emplacement_machine: string[] | null
          renovation_finitions_robinetterie: string[] | null
          renovation_machine_laver: string | null
          renovation_meuble_vasque: string[] | null
          renovation_porte_douche: string[] | null
          renovation_robinetterie_baignoire: string | null
          renovation_robinetterie_mlaver: string | null
          renovation_style_carrelage: string[] | null
          renovation_type_baignoire: string[] | null
          renovation_type_douche: string | null
          renovation_type_installation: string | null
          renovation_type_machine: string[] | null
          renovation_type_pommeau: string | null
          renovation_type_receveur: string[] | null
          renovation_wc_type: string[] | null
          source: string
          status: string
          step2_completed_at: string | null
          type_devis: string
          updated_at: string
          water_damage_claim_number: string | null
          water_damage_documents: string[] | null
          water_damage_insurance_declared: string | null
          water_damage_nature: string | null
          water_damage_origin: string | null
          water_damage_rooms: string[] | null
          water_damage_rooms_other: string | null
          water_damage_scope: string | null
          water_damage_works: string[] | null
          water_damage_works_other: string | null
        }
        Insert: {
          access_token?: string | null
          assigned_to?: string | null
          callback_requested?: boolean | null
          callback_requested_at?: string | null
          client_email: string
          client_first_name: string
          client_last_name: string
          client_phone?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          last_contacted_at?: string | null
          lead_status?: string
          message?: string | null
          next_followup_at?: string | null
          photo_urls?: string[] | null
          priority?: string
          project_room_type?: string | null
          project_type?: string | null
          property_address?: string | null
          property_city?: string | null
          property_elevator?: string | null
          property_floor?: string | null
          property_occupied?: boolean | null
          property_postal_code?: string | null
          property_surface?: string | null
          property_type?: string | null
          renovation_emplacement_machine?: string[] | null
          renovation_finitions_robinetterie?: string[] | null
          renovation_machine_laver?: string | null
          renovation_meuble_vasque?: string[] | null
          renovation_porte_douche?: string[] | null
          renovation_robinetterie_baignoire?: string | null
          renovation_robinetterie_mlaver?: string | null
          renovation_style_carrelage?: string[] | null
          renovation_type_baignoire?: string[] | null
          renovation_type_douche?: string | null
          renovation_type_installation?: string | null
          renovation_type_machine?: string[] | null
          renovation_type_pommeau?: string | null
          renovation_type_receveur?: string[] | null
          renovation_wc_type?: string[] | null
          source?: string
          status?: string
          step2_completed_at?: string | null
          type_devis?: string
          updated_at?: string
          water_damage_claim_number?: string | null
          water_damage_documents?: string[] | null
          water_damage_insurance_declared?: string | null
          water_damage_nature?: string | null
          water_damage_origin?: string | null
          water_damage_rooms?: string[] | null
          water_damage_rooms_other?: string | null
          water_damage_scope?: string | null
          water_damage_works?: string[] | null
          water_damage_works_other?: string | null
        }
        Update: {
          access_token?: string | null
          assigned_to?: string | null
          callback_requested?: boolean | null
          callback_requested_at?: string | null
          client_email?: string
          client_first_name?: string
          client_last_name?: string
          client_phone?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          last_contacted_at?: string | null
          lead_status?: string
          message?: string | null
          next_followup_at?: string | null
          photo_urls?: string[] | null
          priority?: string
          project_room_type?: string | null
          project_type?: string | null
          property_address?: string | null
          property_city?: string | null
          property_elevator?: string | null
          property_floor?: string | null
          property_occupied?: boolean | null
          property_postal_code?: string | null
          property_surface?: string | null
          property_type?: string | null
          renovation_emplacement_machine?: string[] | null
          renovation_finitions_robinetterie?: string[] | null
          renovation_machine_laver?: string | null
          renovation_meuble_vasque?: string[] | null
          renovation_porte_douche?: string[] | null
          renovation_robinetterie_baignoire?: string | null
          renovation_robinetterie_mlaver?: string | null
          renovation_style_carrelage?: string[] | null
          renovation_type_baignoire?: string[] | null
          renovation_type_douche?: string | null
          renovation_type_installation?: string | null
          renovation_type_machine?: string[] | null
          renovation_type_pommeau?: string | null
          renovation_type_receveur?: string[] | null
          renovation_wc_type?: string[] | null
          source?: string
          status?: string
          step2_completed_at?: string | null
          type_devis?: string
          updated_at?: string
          water_damage_claim_number?: string | null
          water_damage_documents?: string[] | null
          water_damage_insurance_declared?: string | null
          water_damage_nature?: string | null
          water_damage_origin?: string | null
          water_damage_rooms?: string[] | null
          water_damage_rooms_other?: string | null
          water_damage_scope?: string | null
          water_damage_works?: string[] | null
          water_damage_works_other?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          ip_address: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          ip_address: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          ip_address?: string
        }
        Relationships: []
      }
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
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
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
      partner_activity_type:
        | "marque"
        | "fabricant"
        | "distributeur"
        | "showroom"
        | "site_ecommerce"
        | "site_decoration_media"
      partner_availability: "immediat" | "moins_1_mois" | "a_definir"
      partner_collaboration_goal:
        | "etre_recommande"
        | "projets_concrets"
        | "partenariat_recurrent"
        | "operation_presse_contenu"
      partner_collaboration_type: "ponctuelle" | "recurrente"
      partner_context:
        | "client_signe"
        | "chiffrage"
        | "recherche_reguliere"
        | "mission_ponctuelle"
      partner_family: "sub_traitant" | "installateur" | "marque_site"
      partner_intervention_level:
        | "pose_seule"
        | "pose_plus_mise_en_service"
        | "avec_maitre_oeuvre"
        | "cle_en_main"
      partner_priority: "basse" | "normale" | "haute"
      partner_status:
        | "nouveau"
        | "a_qualifier"
        | "en_cours"
        | "partenaire_ok"
        | "refuse"
        | "archive"
      partner_timeline: "immediat" | "moins_1_mois" | "a_definir"
      partner_trade:
        | "carrelage"
        | "plomberie"
        | "electricite"
        | "menuiserie"
        | "peinture"
        | "autre"
      partner_zone: "paris" | "petite_couronne" | "idf" | "autre"
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
      partner_activity_type: [
        "marque",
        "fabricant",
        "distributeur",
        "showroom",
        "site_ecommerce",
        "site_decoration_media",
      ],
      partner_availability: ["immediat", "moins_1_mois", "a_definir"],
      partner_collaboration_goal: [
        "etre_recommande",
        "projets_concrets",
        "partenariat_recurrent",
        "operation_presse_contenu",
      ],
      partner_collaboration_type: ["ponctuelle", "recurrente"],
      partner_context: [
        "client_signe",
        "chiffrage",
        "recherche_reguliere",
        "mission_ponctuelle",
      ],
      partner_family: ["sub_traitant", "installateur", "marque_site"],
      partner_intervention_level: [
        "pose_seule",
        "pose_plus_mise_en_service",
        "avec_maitre_oeuvre",
        "cle_en_main",
      ],
      partner_priority: ["basse", "normale", "haute"],
      partner_status: [
        "nouveau",
        "a_qualifier",
        "en_cours",
        "partenaire_ok",
        "refuse",
        "archive",
      ],
      partner_timeline: ["immediat", "moins_1_mois", "a_definir"],
      partner_trade: [
        "carrelage",
        "plomberie",
        "electricite",
        "menuiserie",
        "peinture",
        "autre",
      ],
      partner_zone: ["paris", "petite_couronne", "idf", "autre"],
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
