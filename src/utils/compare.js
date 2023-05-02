
export function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.value.toUpperCase();
    const bandB = b.value.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
}

