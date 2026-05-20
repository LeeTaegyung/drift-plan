import { CHECKLIST_CATEGORY } from '@/shared/config/checklists';
import { Database } from '@/shared/lib/supabase/database.types';

export type TripCheckListType =
  Database['public']['Tables']['trip_checklist']['Row'];

export interface CheckItemType {
  name: string;
  quantity: number;
  memo: string | null;
}

export interface CheckListType {
  category: CheckListCategoryType;
  items: CheckItemType[];
}

export type CheckListCategoryType = keyof typeof CHECKLIST_CATEGORY;
