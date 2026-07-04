// Tiny module-level store for passing work type selection from modal back to calculator
export let pendingWorkTypeId: string | null = null;
export function setPendingWorkTypeId(id: string | null) {
  pendingWorkTypeId = id;
}
