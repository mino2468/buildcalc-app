// Tiny module-level store for passing work type selection from modal back to calculator.
// Use getPendingWorkTypeId() (not the exported let) to guarantee a fresh read at call time —
// Metro/Hermes does not guarantee live bindings for exported `let` variables.
let _pendingWorkTypeId: string | null = null;

export function getPendingWorkTypeId(): string | null {
  return _pendingWorkTypeId;
}

export function setPendingWorkTypeId(id: string | null) {
  _pendingWorkTypeId = id;
}

// Keep legacy export for any code that still reads it directly (will always be the initial null snapshot)
/** @deprecated Use getPendingWorkTypeId() instead */
export let pendingWorkTypeId: string | null = null;
