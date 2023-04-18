export const titleCase = (s) => s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase());
export const properCase = (s) => s.replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase());
