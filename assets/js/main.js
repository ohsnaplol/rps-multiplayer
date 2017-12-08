function rps(p1, p2) {
  if (p1 == p2) {
    return 'draw';
  }
  if ((p1 == 's' && p2 == 'p') || (p1 == 'p' && p2 == 'r') || (p1 == 'r' && p2 == 's')) {
    return 'p1';
  } else {
    return 'p2';
  }
}
