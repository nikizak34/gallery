export function createPages(
  pages: number[],
  pagesCount: number,
  currentPage: number,
) {
  if (pagesCount > 3) {
    if (currentPage >= 3) {
      for (
        let i = currentPage === pagesCount ? currentPage - 2 : currentPage - 1;
        i <= currentPage + 1;
        i++
      ) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}
