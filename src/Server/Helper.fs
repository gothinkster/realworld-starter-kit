module Helper

let (|NotNull|_|) value =
  if obj.ReferenceEquals(value, null) then None
  else Some()