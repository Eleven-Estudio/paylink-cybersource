export interface Link {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: "USD" | "GTQ";
  key: string;
  views: number;
  active: boolean;
  state: "pending" | "paid" | "failed" | "canceled" | "refunded";
  created_at: string;
  updated_at: string;
}

export interface LinkInsert
  extends Omit<
    Link,
    | "id"
    | "created_at"
    | "updated_at"
    | "state"
    | "active"
    | "views"
    | "description"
  > {
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LinkPublicData extends Partial<Link> {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: "USD" | "GTQ";
}

export interface LinkUpdate
  extends Partial<Omit<Link, "id" | "created_at" | "updated_at">> {}
