function makeBackup() {
  console.log("Making backup...");
  for (const data of ["currentGame", "games"]) {
    const d = localStorage.getItem(data);
    if (!d) continue;
    console.log(`Backup ${data}...`)
    localStorage.setItem(`${data}-backup`, d);
  }
  console.log("Backup done.");
}

function restoreBackup() {
  console.log("Restoring backup...");
  for (const data of ["currentGame", "games"]) {
    const d = localStorage.getItem(`${data}-backup`);
    if (!d) continue;
    console.log(`Restore ${data}...`)
    localStorage.removeItem(data);
    localStorage.setItem(data, d);
  }
  console.log("Restore done.");
}