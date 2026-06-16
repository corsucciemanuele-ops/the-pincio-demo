/**
 * Evening events ("le serate del Pincio", e.g. "The Pincio Mango").
 *
 * Content-managed by design: this list is intentionally EMPTY until real dates
 * exist. No invented evenings. In a later phase this is fed by an admin/CMS
 * (Supabase) so events can be added without redeploying — the UI already reads
 * from here, so only the data source needs wiring.
 */
export type Serata = {
  title: string;
  date: string; // human-readable, e.g. "12 Luglio 2027"
  note?: string;
};

export const SERATE: Serata[] = [];
