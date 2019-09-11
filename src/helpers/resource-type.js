export const resourceType = stats => {
  if (!stats) return "stats is undefined";
  if (typeof stats !== "object") return "stats has to be an object";
  if (!stats.isDirectory) return "stats.isDirectory doesnt exists";
  if (typeof stats.isDirectory !== "function") return "stats.isDirectory is not a function";
  return stats.isDirectory() ? 'directory' : 'file';
};